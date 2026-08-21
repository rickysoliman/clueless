import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { palette, addClothingStyles as styles } from "../styles/app-styles";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");

export type ClothingType = "top" | "bottom";

export type ClothingReferencePhoto = {
  uri: string;
  fileName: string | null;
  mimeType: string | null;
  width: number;
  height: number;
};

export type AddClothingDraft = {
  name: string;
  type: ClothingType;
  frontPhoto: ClothingReferencePhoto;
  backPhoto?: ClothingReferencePhoto;
};

type AddClothingPageProps = {
  onBack: () => void;

  /*
   * We can use this later when we add local closet storage.
   *
   * For now, HomePage does not need to pass it.
   */
  onSave?: (item: AddClothingDraft) => void | Promise<void>;
};

type PhotoSlot = "front" | "back";
type PhotoSource = "library" | "camera";

type AddClothingUploadResponse = {
  success: boolean;

  message: string;

  received: {
    name: string;
    type: ClothingType;

    front: {
      fileName: string;
      mimeType: string;
      size: number;
    };

    back: {
      fileName: string;
      mimeType: string;
      size: number;
    } | null;
  };
};

function createReferencePhoto(
  asset: ImagePicker.ImagePickerAsset
): ClothingReferencePhoto {
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? null,
    mimeType: asset.mimeType ?? null,
    width: asset.width,
    height: asset.height,
  };
}

function getFallbackFileName(slot: PhotoSlot, mimeType: string | null) {
  if (mimeType === "image/png") {
    return `${slot}.png`;
  }

  if (mimeType === "image/webp") {
    return `${slot}.webp`;
  }

  if (mimeType === "image/heic" || mimeType === "image/heif") {
    return `${slot}.heic`;
  }

  return `${slot}.jpg`;
}

function appendPhotoToFormData(
  formData: FormData,
  fieldName: PhotoSlot,
  photo: ClothingReferencePhoto
) {
  /*
   * React Native's FormData implementation understands an object
   * containing uri, name, and type as a file upload.
   *
   * TypeScript's browser FormData definitions don't know about the
   * React Native file object, hence the `as any`.
   */
  formData.append(fieldName, {
    uri: photo.uri,

    name: photo.fileName ?? getFallbackFileName(fieldName, photo.mimeType),

    type: photo.mimeType ?? "image/jpeg",
  } as any);
}

export default function AddClothingPage({
  onBack,
  onSave,
}: AddClothingPageProps) {
  const [itemName, setItemName] = useState("");

  const [itemType, setItemType] = useState<ClothingType>("top");

  const [frontPhoto, setFrontPhoto] = useState<ClothingReferencePhoto | null>(
    null
  );

  const [backPhoto, setBackPhoto] = useState<ClothingReferencePhoto | null>(
    null
  );

  const [isSaving, setIsSaving] = useState(false);

  const trimmedName = itemName.trim();

  const photoCount = [frontPhoto, backPhoto].filter(Boolean).length;

  const canSave = trimmedName.length > 0 && Boolean(frontPhoto) && !isSaving;

  const statusText = isSaving
    ? "Uploading..."
    : !trimmedName
    ? "Enter a name"
    : !frontPhoto
    ? "Front photo required"
    : "Ready";

  async function choosePhoto(slot: PhotoSlot, source: PhotoSource) {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Camera Permission Required",
            "Cher AI needs camera access to photograph your clothing."
          );

          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 1,
        });
      }

      if (result.canceled || !result.assets[0]) {
        return;
      }

      const photo = createReferencePhoto(result.assets[0]);

      if (slot === "front") {
        setFrontPhoto(photo);
      } else {
        setBackPhoto(photo);
      }
    } catch (error) {
      Alert.alert(
        "Unable to Add Photo",
        error instanceof Error
          ? error.message
          : "Something went wrong while selecting the photo."
      );
    }
  }

  function removePhoto(slot: PhotoSlot) {
    if (slot === "front") {
      setFrontPhoto(null);
      return;
    }

    setBackPhoto(null);
  }

  async function uploadClothingItem(
    draft: AddClothingDraft
  ): Promise<AddClothingUploadResponse> {
    if (!API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL is not configured.");
    }

    const formData = new FormData();

    formData.append("name", draft.name);
    formData.append("type", draft.type);

    appendPhotoToFormData(formData, "front", draft.frontPhoto);

    if (draft.backPhoto) {
      appendPhotoToFormData(formData, "back", draft.backPhoto);
    }

    const response = await fetch(`${API_URL}/add-clothing`, {
      method: "POST",

      /*
       * Don't manually set Content-Type here.
       *
       * fetch needs to add the multipart boundary itself.
       */
      body: formData,
    });

    let data: any;

    try {
      data = await response.json();
    } catch {
      throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
      throw new Error(
        data?.error ?? `Upload failed with status ${response.status}`
      );
    }

    return data as AddClothingUploadResponse;
  }

  async function handleSave() {
    if (!trimmedName) {
      Alert.alert(
        "Name Required",
        "Give this clothing item a name before saving it."
      );

      return;
    }

    if (!frontPhoto) {
      Alert.alert(
        "Front Photo Required",
        "Add a clear front photo of the garment before saving it."
      );

      return;
    }

    const draft: AddClothingDraft = {
      name: trimmedName,
      type: itemType,
      frontPhoto,
      ...(backPhoto ? { backPhoto } : {}),
    };

    try {
      setIsSaving(true);

      console.log("Uploading clothing item...");

      const result = await uploadClothingItem(draft);

      console.log("Clothing upload successful:", result);

      /*
       * This callback will become useful once we add local
       * closet persistence.
       */
      if (onSave) {
        await onSave(draft);

        onBack();

        return;
      }

      Alert.alert(
        "Upload Successful!",
        [
          `"${result.received.name}" reached the server successfully.`,
          "",
          `Front photo: received`,
          `Back photo: ${result.received.back ? "received" : "not provided"}`,
          "",
          "Nothing has been saved permanently yet. The server deleted its temporary upload after receiving it.",
        ].join("\n")
      );
    } catch (error) {
      console.error("Clothing upload failed:", error);

      Alert.alert(
        "Unable to Upload Item",
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading this clothing item."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function renderPhotoCard(
    slot: PhotoSlot,
    photo: ClothingReferencePhoto | null,
    required: boolean
  ) {
    const isFront = slot === "front";

    const title = isFront ? "Front" : "Back";

    return (
      <View style={styles.photoCard}>
        <View style={styles.photoCardTitleRow}>
          <Text style={styles.photoCardTitle}>
            {title}

            {required && <Text style={styles.requiredMarker}> *</Text>}
          </Text>

          {!required && <Text style={styles.optionalText}>Optional</Text>}
        </View>

        <View style={styles.photoWell}>
          {photo ? (
            <Image
              source={{
                uri: photo.uri,
              }}
              resizeMode="contain"
              style={styles.photoImage}
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderIcon}>▧</Text>

              <Text style={styles.photoPlaceholderText}>
                {isFront ? "Add a front view" : "Add a back view"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.photoButtonStack}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Choose ${title.toLowerCase()} photo from library`}
            onPress={() => choosePhoto(slot, "library")}
            style={({ pressed }) => [
              styles.windowsButton,
              styles.photoButton,
              pressed && styles.windowsButtonPressed,
            ]}
          >
            <Text style={styles.smallButtonText}>
              {photo ? "Choose Another..." : "Choose Photo..."}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Take ${title.toLowerCase()} clothing photo`}
            onPress={() => choosePhoto(slot, "camera")}
            style={({ pressed }) => [
              styles.windowsButton,
              styles.photoButton,
              pressed && styles.windowsButtonPressed,
            ]}
          >
            <Text style={styles.smallButtonText}>Take Photo...</Text>
          </Pressable>

          {photo && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${title.toLowerCase()} photo`}
              onPress={() => removePhoto(slot)}
              style={({ pressed }) => [
                styles.windowsButton,
                styles.photoButton,
                pressed && styles.windowsButtonPressed,
              ]}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={leopardPrintBackground}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.window}>
          <View style={styles.titleBar}>
            <Text numberOfLines={1} style={styles.titleBarText}>
              Cher AI - Add Clothing
            </Text>

            <View style={styles.windowControls}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.windowControlButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.minimizeSymbol}>_</Text>
              </Pressable>

              <View style={styles.windowControlButton}>
                <Text style={styles.maximizeSymbol}>□</Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close add clothing"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.windowControlButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.closeSymbol}>×</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.menuBar}>
            <Text style={styles.menuItem}>File</Text>

            <Text style={styles.menuItem}>Closet</Text>

            <Text style={styles.menuItem}>Add Item</Text>

            <Text style={styles.menuItem}>Help</Text>
          </View>

          <KeyboardAvoidingView behavior="padding" style={styles.keyboardArea}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={[styles.groupBox, styles.detailsGroup]}>
                <View style={styles.groupLabelBackground}>
                  <Text style={styles.groupLabel}>Item Information</Text>
                </View>

                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>
                    Name
                    <Text style={styles.requiredMarker}> *</Text>
                  </Text>

                  <TextInput
                    value={itemName}
                    onChangeText={setItemName}
                    placeholder="e.g. Black Ribbed Tank"
                    placeholderTextColor={palette.win98.mid}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="done"
                    maxLength={60}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Type</Text>

                  <View
                    accessibilityRole="radiogroup"
                    style={styles.typeButtons}
                  >
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{
                        selected: itemType === "top",
                      }}
                      onPress={() => setItemType("top")}
                      style={[
                        styles.typeButton,
                        itemType === "top" && styles.typeButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeButtonText,
                          itemType === "top" && styles.typeButtonTextActive,
                        ]}
                      >
                        Top
                      </Text>
                    </Pressable>

                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{
                        selected: itemType === "bottom",
                      }}
                      onPress={() => setItemType("bottom")}
                      style={[
                        styles.typeButton,
                        itemType === "bottom" && styles.typeButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeButtonText,
                          itemType === "bottom" && styles.typeButtonTextActive,
                        ]}
                      >
                        Bottom
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Text style={styles.helperText}>
                  This determines where the item appears in Build Outfit and
                  Browse Closet.
                </Text>
              </View>

              <View style={styles.groupBox}>
                <View style={styles.groupLabelBackground}>
                  <Text style={styles.groupLabel}>Reference Photos</Text>
                </View>

                <Text style={styles.photoIntro}>
                  Photograph the garment clearly and keep the entire item
                  visible. The front photo is required. Add a back photo when
                  the back has important details.
                </Text>

                <View style={styles.photoGrid}>
                  {renderPhotoCard("front", frontPhoto, true)}

                  {renderPhotoCard("back", backPhoto, false)}
                </View>

                <View style={styles.tipBox}>
                  <View style={styles.tipIcon}>
                    <Text style={styles.tipIconText}>i</Text>
                  </View>

                  <Text style={styles.tipText}>
                    For the best AI results, lay the clothing flat or hang it
                    against a plain background with good, even lighting. Avoid
                    folding or covering any part of the garment.
                  </Text>
                </View>
              </View>

              <View style={styles.formActions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Cancel adding clothing"
                  disabled={isSaving}
                  onPress={onBack}
                  style={({ pressed }) => [
                    styles.windowsButton,
                    styles.formActionButton,
                    isSaving && styles.disabledButton,
                    pressed && !isSaving && styles.windowsButtonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Upload clothing item"
                  accessibilityState={{
                    disabled: !canSave,
                  }}
                  disabled={!canSave}
                  onPress={handleSave}
                  style={({ pressed }) => [
                    styles.windowsButton,
                    styles.formActionButton,
                    !canSave && styles.disabledButton,
                    pressed && canSave && styles.windowsButtonPressed,
                  ]}
                >
                  <Text style={styles.saveButtonText}>
                    {isSaving ? "Uploading..." : "Save Item"}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.statusBar}>
            <View style={styles.statusPanel}>
              <Text style={styles.statusText}>
                {photoCount} of 2 reference photo
                {photoCount === 1 ? "" : "s"} added
              </Text>
            </View>

            <View style={styles.statusPanelSmall}>
              <Text numberOfLines={1} style={styles.statusText}>
                {statusText}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
