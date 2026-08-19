import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { dummyData, type WardrobeItem } from "../assets/dummy-data/dummy-data";
import Carousel from "./carousel";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

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

async function requestGeneratedOutfit(
  top: WardrobeItem,
  bottom: WardrobeItem
): Promise<string> {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not configured yet. Add your backend URL before generating an outfit."
    );
  }

  const response = await fetch(`${apiBaseUrl}/generate-outfit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topId: top.id,
      bottomId: bottom.id,
      topCatalogPhoto: top.catalogPhotos.front,
      bottomCatalogPhoto: bottom.catalogPhotos.front,
    }),
  });

  const data = (await response.json()) as GenerateOutfitResponse;

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
                        Matching your selected top and bottom.
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  window: {
    flex: 1,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 3,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#000000",
    borderBottomColor: "#000000",
    padding: 3,
  },

  titleBar: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000080",
    paddingLeft: 6,
    paddingRight: 3,
  },

  titleBarText: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: WINDOWS_FONT,
    fontSize: 15,
    fontWeight: "700",
  },

  windowControls: {
    flexDirection: "row",
    gap: 2,
  },

  windowControlButton: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
  },

  minimizeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 15,
    marginTop: -2,
  },

  maximizeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },

  closeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 18,
  },

  menuBar: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 8,
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },

  menuItem: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },

  carouselStack: {
    flex: 1,
    minHeight: 0,
  },

  carouselGap: {
    height: 10,
  },

  actionRow: {
    height: 42,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  windowsButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
    paddingHorizontal: 12,
  },

  windowsButtonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },

  actionButton: {
    flex: 1,
  },

  buttonText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
  },

  disabledButton: {
    opacity: 0.45,
  },

  resultGroup: {
    flex: 1,
    minHeight: 0,
    position: "relative",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    padding: 10,
  },

  groupLabelBackground: {
    position: "absolute",
    top: -9,
    left: 12,
    zIndex: 2,
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  resultBody: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    padding: 12,
  },

  resultStatus: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },

  resultHint: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 7,
    textAlign: "center",
  },

  errorMessage: {
    color: "#800000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },

  generatedImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },

  statusBar: {
    minHeight: 28,
    flexDirection: "row",
    gap: 3,
    backgroundColor: "#C0C0C0",
    padding: 3,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
  },

  statusPanel: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 6,
  },

  statusPanelSmall: {
    width: 76,
    justifyContent: "center",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 6,
  },

  statusText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
  },
});
