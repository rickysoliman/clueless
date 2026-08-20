import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { dummyData, type WardrobeItem } from "../assets/dummy-data/dummy-data";
import { dummyProfileData } from "../assets/dummy-data/dummy-profile-data";
import { buildOutfitStyles as styles } from "../styles/app-styles";
import Carousel from "./carousel";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

type BuildOutfitPageProps = {
  onBack: () => void;
  onBrowseCloset?: () => void;
  initialTopId?: string;
  initialBottomId?: string;
};

type GenerateOutfitResponse = {
  imageUrl?: string;
  error?: string;
};

type ReactNativeUploadFile = {
  uri: string;
  name: string;
  type: string;
};

function getUploadFile(
  source: ImageSourcePropType,
  fallbackBaseName: string
): ReactNativeUploadFile {
  const resolved = Image.resolveAssetSource(source);

  if (!resolved?.uri) {
    throw new Error(`Unable to resolve ${fallbackBaseName} image.`);
  }

  const cleanUri = resolved.uri.split("?")[0].toLowerCase();

  let extension = "jpg";
  let mimeType = "image/jpeg";

  if (cleanUri.endsWith(".png")) {
    extension = "png";
    mimeType = "image/png";
  } else if (cleanUri.endsWith(".webp")) {
    extension = "webp";
    mimeType = "image/webp";
  } else if (cleanUri.endsWith(".jpeg")) {
    extension = "jpeg";
    mimeType = "image/jpeg";
  }

  return {
    uri: resolved.uri,
    name: `${fallbackBaseName}.${extension}`,
    type: mimeType,
  };
}

async function requestGeneratedOutfit(
  top: WardrobeItem,
  bottom: WardrobeItem
): Promise<string> {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not configured. Add the URL of your Cher AI backend to the Expo app environment."
    );
  }

  const formData = new FormData();

  const personFile = getUploadFile(
    dummyProfileData.profilePicture,
    "person-reference"
  );

  const topFile = getUploadFile(top.catalogPhotos.front, `top-${top.id}`);

  const bottomFile = getUploadFile(
    bottom.catalogPhotos.front,
    `bottom-${bottom.id}`
  );

  formData.append("person", personFile as any);
  formData.append("top", topFile as any);
  formData.append("bottom", bottomFile as any);

  formData.append("firstName", dummyProfileData.firstName);
  formData.append("topName", top.name);
  formData.append("bottomName", bottom.name);

  const response = await fetch(`${apiBaseUrl}/generate-outfit`, {
    method: "POST",
    body: formData,
  });

  let data: GenerateOutfitResponse;

  try {
    data = (await response.json()) as GenerateOutfitResponse;
  } catch {
    throw new Error(
      "The outfit server returned an invalid response. Check the backend terminal for details."
    );
  }

  if (!response.ok) {
    throw new Error(data.error ?? "Unable to generate the outfit.");
  }

  if (!data.imageUrl) {
    throw new Error("The server did not return an outfit image.");
  }

  return data.imageUrl;
}

export default function BuildOutfitPage({
  onBack,
  onBrowseCloset,
  initialTopId,
  initialBottomId,
}: BuildOutfitPageProps) {
  const tops = useMemo(
    () => dummyData.filter((item) => item.type === "top"),
    []
  );

  const bottoms = useMemo(
    () => dummyData.filter((item) => item.type === "bottom"),
    []
  );

  const initialTopIndex = initialTopId
    ? Math.max(
        tops.findIndex((item) => item.id === initialTopId),
        0
      )
    : 0;

  const initialBottomIndex = initialBottomId
    ? Math.max(
        bottoms.findIndex((item) => item.id === initialBottomId),
        0
      )
    : 0;

  const [selectedTopIndex, setSelectedTopIndex] = useState(initialTopIndex);
  const [selectedBottomIndex, setSelectedBottomIndex] =
    useState(initialBottomIndex);

  const [generatedImageUri, setGeneratedImageUri] = useState<string | null>(
    null
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const selectedTop = tops[selectedTopIndex];
  const selectedBottom = bottoms[selectedBottomIndex];

  const canGenerate = Boolean(selectedTop && selectedBottom && !isGenerating);

  const showingResult =
    isGenerating || Boolean(generatedImageUri) || Boolean(generationError);

  function clearGeneratedResult() {
    setGeneratedImageUri(null);
    setGenerationError(null);
  }

  async function handleDressMe() {
    if (!selectedTop || !selectedBottom || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImageUri(null);

    try {
      const imageUrl = await requestGeneratedOutfit(
        selectedTop,
        selectedBottom
      );

      setGeneratedImageUri(imageUrl);
    } catch (error) {
      setGenerationError(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating the outfit."
      );
    } finally {
      setIsGenerating(false);
    }
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
              Cher AI - Build Outfit
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
                accessibilityLabel="Close build outfit"
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
            <Text style={styles.menuItem}>Outfit</Text>
            <Text style={styles.menuItem}>Help</Text>
          </View>

          <View style={styles.content}>
            {showingResult ? (
              <View style={styles.resultGroup}>
                <View style={styles.groupLabelBackground}>
                  <Text style={styles.groupLabel}>
                    {isGenerating
                      ? "Creating Your Look"
                      : generationError
                        ? "Generation Error"
                        : "Your Look"}
                  </Text>
                </View>

                <View style={styles.resultBody}>
                  {isGenerating ? (
                    <>
                      <ActivityIndicator size="large" />
                      <Text style={styles.resultStatus}>
                        Generating your outfit...
                      </Text>
                      <Text style={styles.resultHint}>
                        This can take a little while. Cher is deciding whether
                        the outfit is totally fabulous.
                      </Text>
                    </>
                  ) : generationError ? (
                    <>
                      <Text style={styles.errorMessage}>{generationError}</Text>
                      <Text style={styles.resultHint}>
                        Change the look or try again.
                      </Text>
                    </>
                  ) : generatedImageUri ? (
                    <Image
                      source={{ uri: generatedImageUri }}
                      resizeMode="contain"
                      style={styles.generatedImage}
                    />
                  ) : null}
                </View>
              </View>
            ) : (
              <View style={styles.carouselStack}>
                <Carousel
                  title="Tops"
                  items={tops}
                  selectedIndex={selectedTopIndex}
                  onSelectedIndexChange={(index) => {
                    setSelectedTopIndex(index);
                    clearGeneratedResult();
                  }}
                />

                <View style={styles.carouselGap} />

                <Carousel
                  title="Bottoms"
                  items={bottoms}
                  selectedIndex={selectedBottomIndex}
                  onSelectedIndexChange={(index) => {
                    setSelectedBottomIndex(index);
                    clearGeneratedResult();
                  }}
                />
              </View>
            )}

            <View style={styles.actionRow}>
              {showingResult ? (
                <>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Change outfit selection"
                    onPress={clearGeneratedResult}
                    style={({ pressed }) => [
                      styles.windowsButton,
                      styles.actionButton,
                      pressed && styles.windowsButtonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Change Look</Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Generate outfit again"
                    disabled={isGenerating || !selectedTop || !selectedBottom}
                    onPress={handleDressMe}
                    style={({ pressed }) => [
                      styles.windowsButton,
                      styles.actionButton,
                      (isGenerating || !selectedTop || !selectedBottom) &&
                        styles.disabledButton,
                      pressed &&
                        !isGenerating &&
                        selectedTop &&
                        selectedBottom &&
                        styles.windowsButtonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Try Again</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Browse closet"
                    onPress={onBrowseCloset ?? onBack}
                    style={({ pressed }) => [
                      styles.windowsButton,
                      styles.actionButton,
                      pressed && styles.windowsButtonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Browse...</Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Generate outfit preview"
                    disabled={!canGenerate}
                    onPress={handleDressMe}
                    style={({ pressed }) => [
                      styles.windowsButton,
                      styles.actionButton,
                      !canGenerate && styles.disabledButton,
                      pressed && canGenerate && styles.windowsButtonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Dress Me</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>

          <View style={styles.statusBar}>
            <View style={styles.statusPanel}>
              <Text numberOfLines={1} style={styles.statusText}>
                {selectedTop && selectedBottom
                  ? `${selectedTop.name} + ${selectedBottom.name}`
                  : "Select a top and bottom"}
              </Text>
            </View>

            <View style={styles.statusPanelSmall}>
              <Text style={styles.statusText}>
                {isGenerating ? "Working..." : "Ready"}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
