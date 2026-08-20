import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "node:fs";

const app = express();
const upload = multer({ dest: "uploads/" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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
      // Convert the uploaded images to base64 for Gemini.
      const personBase64 = fs.readFileSync(person.path).toString("base64");

      const topBase64 = fs.readFileSync(top.path).toString("base64");

      const bottomBase64 = fs.readFileSync(bottom.path).toString("base64");

      const prompt = `
Create a photorealistic full-body studio fashion photograph.

You are being given exactly three reference images:

REFERENCE IMAGE 1:
The person who must appear in the generated photograph.

REFERENCE IMAGE 2:
The exact top the person must be wearing.

REFERENCE IMAGE 3:
The exact bottoms the person must be wearing.

Preserve the identity of the person from reference image 1 as faithfully
as possible, including their facial features, hairstyle, skin tone,
body proportions, and overall physical appearance.

Dress the person in the exact clothing shown in reference images 2 and 3.

Preserve the garments faithfully, including their:
- colors
- materials
- patterns
- fit
- silhouette
- buttons
- seams
- pockets
- construction details

Do not redesign or substitute the garments.

Create a realistic photograph of the person naturally wearing this outfit.

The person should:
- be standing naturally
- face the camera
- look toward the camera
- have their entire body visible from head to toe

Use a clean solid white professional photography studio background.

Use realistic studio lighting.

The final result should look like a high-end professional fashion
photograph, not an illustration, painting, or digital artwork.
      `.trim();

      const contents = [
        {
          text: prompt,
        },

        // Reference 1: person
        {
          inlineData: {
            mimeType: person.mimetype,
            data: personBase64,
          },
        },

        // Reference 2: top
        {
          inlineData: {
            mimeType: top.mimetype,
            data: topBase64,
          },
        },

        // Reference 3: bottoms
        {
          inlineData: {
            mimeType: bottom.mimetype,
            data: bottomBase64,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",

        contents,

        config: {
          responseModalities: ["TEXT", "IMAGE"],

          responseFormat: {
            image: {
              aspectRatio: "9:16",
              imageSize: "1K",
            },
          },
        },
      });

      const parts = response.candidates?.[0]?.content?.parts ?? [];

      const imagePart = parts.find((part) => part.inlineData?.data);

      if (!imagePart?.inlineData?.data) {
        throw new Error("Gemini did not return a generated image");
      }

      const mimeType = imagePart.inlineData.mimeType ?? "image/png";

      const imageBase64 = imagePart.inlineData.data;

      res.json({
        image: `data:${mimeType};base64,${imageBase64}`,
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
  console.log("Dress Me Gemini server running on port 3001");
});
