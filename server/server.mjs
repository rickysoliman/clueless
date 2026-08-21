import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "node:fs";

const app = express();

const upload = multer({
  dest: "uploads/",
  limits: {
    // 20 MB per uploaded image.
    fileSize: 20 * 1024 * 1024,
  },
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());

function deleteUploadedFile(file) {
  if (!file?.path) {
    return;
  }

  try {
    fs.unlinkSync(file.path);
  } catch (error) {
    console.warn(`Could not delete temporary upload: ${file.path}`, error);
  }
}

/*
 * ADD CLOTHING
 *
 * For now this route ONLY verifies that the app can successfully send
 * clothing reference photos to the server.
 *
 * Nothing is persisted yet.
 *
 * Expected multipart/form-data:
 *   name  - clothing item name
 *   type  - "top" or "bottom"
 *   front - required image
 *   back  - optional image
 */
app.post(
  "/add-clothing",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  async (req, res) => {
    const files = req.files;

    const front = files?.front?.[0];
    const back = files?.back?.[0];

    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    const type = typeof req.body?.type === "string" ? req.body.type.trim() : "";

    try {
      if (!name) {
        return res.status(400).json({
          error: "A clothing item name is required",
        });
      }

      if (type !== "top" && type !== "bottom") {
        return res.status(400).json({
          error: 'Clothing type must be either "top" or "bottom"',
        });
      }

      if (!front) {
        return res.status(400).json({
          error: "A front clothing image is required",
        });
      }

      console.log("\nReceived new clothing item:");
      console.log({
        name,
        type,
        front: {
          originalName: front.originalname,
          mimeType: front.mimetype,
          size: front.size,
          temporaryPath: front.path,
        },
        back: back
          ? {
              originalName: back.originalname,
              mimeType: back.mimetype,
              size: back.size,
              temporaryPath: back.path,
            }
          : null,
      });

      /*
       * We are intentionally NOT storing these files yet.
       *
       * The next step will be to pass these temporary files into Gemini
       * and generate clean catalog images before deleting them.
       */

      return res.json({
        success: true,

        message: "Clothing images received successfully",

        received: {
          name,
          type,

          front: {
            fileName: front.originalname,
            mimeType: front.mimetype,
            size: front.size,
          },

          back: back
            ? {
                fileName: back.originalname,
                mimeType: back.mimetype,
                size: back.size,
              }
            : null,
        },
      });
    } catch (error) {
      console.error("Add clothing upload failed:", error);

      return res.status(500).json({
        error:
          error instanceof Error ? error.message : "Clothing upload failed",
      });
    } finally {
      /*
       * These are temporary files only.
       *
       * Once the response is ready, remove them from the server.
       */
      deleteUploadedFile(front);
      deleteUploadedFile(back);
    }
  }
);

/*
 * DRESS ME
 */
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

        {
          inlineData: {
            mimeType: person.mimetype,
            data: personBase64,
          },
        },

        {
          inlineData: {
            mimeType: top.mimetype,
            data: topBase64,
          },
        },

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
        deleteUploadedFile(file);
      }
    }
  }
);

app.listen(3001, "0.0.0.0", () => {
  console.log("Dress Me Gemini server running on port 3001");
});
