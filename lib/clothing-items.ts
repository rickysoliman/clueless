import * as Crypto from "expo-crypto";
import { supabase } from "./supabase";

export type ClothingType = "top" | "bottom";

export type ClothingPhoto = {
  uri: string;
  fileName: string | null;
  mimeType: string | null;
};

export type SaveClothingItemInput = {
  name: string;
  type: ClothingType;
  frontPhoto: ClothingPhoto;
  backPhoto?: ClothingPhoto;
};

export type SavedClothingItem = {
  id: string;
  user_id: string;
  name: string;
  type: ClothingType;
  front_image_path: string;
  back_image_path: string | null;
  created_at: string;
};

function getFileExtension(photo: ClothingPhoto) {
  const extension = photo.fileName?.split(".").pop()?.toLowerCase();

  if (extension) {
    return extension;
  }

  switch (photo.mimeType) {
    case "image/png":
      return "png";

    case "image/webp":
      return "webp";

    case "image/heic":
    case "image/heif":
      return "heic";

    default:
      return "jpg";
  }
}

async function uploadPhoto(photo: ClothingPhoto, path: string) {
  const response = await fetch(photo.uri);

  if (!response.ok) {
    throw new Error("Could not read the selected image.");
  }

  const arrayBuffer = await response.arrayBuffer();

  const { error } = await supabase.storage
    .from("clothing-images")
    .upload(path, arrayBuffer, {
      contentType: photo.mimeType ?? "image/jpeg",
      upsert: false,
    });

  if (error) {
    throw error;
  }
}

export async function saveClothingItem(
  input: SaveClothingItemInput
): Promise<SavedClothingItem> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You are not signed into Supabase.");
  }

  const itemId = Crypto.randomUUID();

  const frontExtension = getFileExtension(input.frontPhoto);

  const frontImagePath = `${user.id}/${itemId}/front.${frontExtension}`;

  let backImagePath: string | null = null;

  const uploadedPaths: string[] = [];

  try {
    await uploadPhoto(input.frontPhoto, frontImagePath);

    uploadedPaths.push(frontImagePath);

    if (input.backPhoto) {
      const backExtension = getFileExtension(input.backPhoto);

      backImagePath = `${user.id}/${itemId}/back.${backExtension}`;

      await uploadPhoto(input.backPhoto, backImagePath);

      uploadedPaths.push(backImagePath);
    }

    const { data, error: insertError } = await supabase
      .from("clothing_items")
      .insert({
        id: itemId,
        user_id: user.id,
        name: input.name,
        type: input.type,
        front_image_path: frontImagePath,
        back_image_path: backImagePath,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return data as SavedClothingItem;
  } catch (error) {
    if (uploadedPaths.length > 0) {
      const { error: cleanupError } = await supabase.storage
        .from("clothing-images")
        .remove(uploadedPaths);

      if (cleanupError) {
        console.error("Failed to clean up clothing images:", cleanupError);
      }
    }

    throw error;
  }
}
