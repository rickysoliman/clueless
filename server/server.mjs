import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "node:fs";
import OpenAI, { toFile } from "openai";

const app = express();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());

app.post(
  "/dress-me",
  upload.fields([
    { name: "person", maxCount: 1 },
    { name: "top", maxCount: 1 },
    { name: "bottom", maxCount: 1 },
  ]),
  async (req, res) => {
    const files = req.files;

    const person = files?.person?.[0];
    const top = files?.top?.[0];
    const bottom = files?.bottom?.[0];

    if (!person || !top || !bottom) {
      return res.status(400).json({
        error: "person, top, and bottom images are required",
      });
    }

    try {
      const personFile = await toFile(
        fs.readFileSync(person.path),
        person.originalname,
        { type: person.mimetype }
      );

      const topFile = await toFile(
        fs.readFileSync(top.path),
        top.originalname,
        { type: top.mimetype }
      );

      const bottomFile = await toFile(
        fs.readFileSync(bottom.path),
        bottom.originalname,
        { type: bottom.mimetype }
      );

      const result = await openai.images.edit({
        model: "gpt-image-1",

        image: [personFile, topFile, bottomFile],

        prompt: `
Create a photorealistic full-body studio photograph.

Reference image 1 is the person.
Reference image 2 is the exact top they should be wearing.
Reference image 3 is the exact bottoms they should be wearing.

Preserve the person's facial features, hairstyle, body proportions,
skin tone, and overall appearance as faithfully as possible.

Dress the person in the exact clothing shown in reference images
2 and 3. Preserve the clothing colors, materials, patterns,
silhouette, and important construction details.

The person should be standing naturally and looking toward the camera.

Show the entire body from head to toe.

Use a clean solid white professional studio background.
The result should look like a realistic fashion photograph,
not an illustration.
        `.trim(),

        input_fidelity: "high",
        size: "1024x1536",
        quality: "high",
      });

      const imageBase64 = result.data?.[0]?.b64_json;

      if (!imageBase64) {
        throw new Error("OpenAI did not return an image");
      }

      res.json({
        image: `data:image/png;base64,${imageBase64}`,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          error instanceof Error ? error.message : "Image generation failed",
      });
    } finally {
      for (const file of [person, top, bottom]) {
        try {
          fs.unlinkSync(file.path);
        } catch {}
      }
    }
  }
);

app.listen(3001, "0.0.0.0", () => {
  console.log("Dress Me server running on port 3001");
});
