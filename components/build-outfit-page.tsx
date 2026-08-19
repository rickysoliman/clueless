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

const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

type BuildOutfitPageProps = {
  onBack: () => void;
  onBrowseCloset?: () => void;
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
}: BuildOutfitPageProps) {
  const tops = useMemo(
    () => dummyData.filter((item) => item.type === "top"),
    []
  );

  const bottoms = useMemo(
    () => dummyData.filter((item) => item.type === "bottom"),
    []
  );

  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
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
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#11111E" />

      <ImageBackground
        source={leopardPrintBackground}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            style={({ pressed }) => [
              styles.headerButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.headerButtonText}>{"< BACK"}</Text>
          </Pressable>

          <Text numberOfLines={1} style={styles.brand}>
            BUILD OUTFIT
          </Text>

          <View style={styles.modeLabel}>
            <Text style={styles.modeLabelText}>MIX + MATCH</Text>
          </View>
        </View>

        <View style={styles.content}>
          {showingResult ? (
            <View style={styles.resultPanel}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultHeaderText}>
                  {isGenerating
                    ? "CREATING YOUR LOOK"
                    : generationError
                    ? "GENERATION ERROR"
                    : "YOUR LOOK"}
                </Text>
              </View>

              <View style={styles.resultBody}>
                {isGenerating ? (
                  <>
                    <ActivityIndicator size="large" />
                    <Text style={styles.resultStatus}>
                      GENERATING YOUR OUTFIT...
                    </Text>
                    <Text style={styles.resultHint}>
                      MATCHING YOUR SELECTED TOP + BOTTOM.
                    </Text>
                  </>
                ) : generationError ? (
                  <>
                    <Text style={styles.errorMessage}>{generationError}</Text>
                    <Text style={styles.resultHint}>
                      CHANGE THE LOOK OR TRY AGAIN.
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
                title="TOPS"
                items={tops}
                selectedIndex={selectedTopIndex}
                onSelectedIndexChange={(index) => {
                  setSelectedTopIndex(index);
                  clearGeneratedResult();
                }}
              />

              <Carousel
                title="BOTTOMS"
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
                    styles.primaryAction,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.primaryActionText}>CHANGE LOOK</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Generate outfit again"
                  disabled={isGenerating || !selectedTop || !selectedBottom}
                  onPress={handleDressMe}
                  style={({ pressed }) => [
                    styles.secondaryAction,
                    (isGenerating || !selectedTop || !selectedBottom) &&
                      styles.disabledButton,
                    pressed &&
                      !isGenerating &&
                      selectedTop &&
                      selectedBottom &&
                      styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.secondaryActionText}>TRY AGAIN</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Browse closet"
                  onPress={onBrowseCloset ?? onBack}
                  style={({ pressed }) => [
                    styles.primaryAction,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.primaryActionText}>BROWSE</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Generate outfit preview"
                  disabled={!canGenerate}
                  onPress={handleDressMe}
                  style={({ pressed }) => [
                    styles.secondaryAction,
                    !canGenerate && styles.disabledButton,
                    pressed && canGenerate && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.secondaryActionText}>DRESS ME</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>

        <View style={styles.bottomBar}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.bottomBarText}
          >
            TOPS · BOTTOMS · MIX + MATCH · DRESS ME
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#11111E",
  },

  background: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },

  topBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11111E",
    borderBottomWidth: 2,
    borderBottomColor: "#080810",
    paddingHorizontal: 10,
    zIndex: 2,
  },

  headerButton: {
    minWidth: 68,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A7A7B0",
    borderWidth: 2,
    borderTopColor: "#F1F1F6",
    borderLeftColor: "#F1F1F6",
    borderRightColor: "#4A4A52",
    borderBottomColor: "#4A4A52",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  headerButtonText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.25,
  },

  brand: {
    flex: 1,
    color: "#C8D0FF",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    textShadowColor: "#536BFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  modeLabel: {
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18182A",
    borderWidth: 1,
    borderColor: "#59618A",
    paddingHorizontal: 7,
    paddingVertical: 7,
  },

  modeLabelText: {
    color: "#D5DAFF",
    fontFamily: RETRO_FONT,
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  content: {
    flex: 1,
    width: "90%",
    maxWidth: 500,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 8,
    zIndex: 2,
  },

  carouselStack: {
    flex: 1,
    minHeight: 0,
  },

  carouselGap: {
    height: 0,
  },

  actionRow: {
    height: 48,
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },

  primaryAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263DDC",
    borderWidth: 2,
    borderTopColor: "#BFC9FF",
    borderLeftColor: "#BFC9FF",
    borderRightColor: "#14183F",
    borderBottomColor: "#14183F",
  },

  primaryActionText: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textShadowColor: "#10132D",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  secondaryAction: {
    flex: 1.12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9A9B2",
    borderWidth: 2,
    borderTopColor: "#F1F0F7",
    borderLeftColor: "#F1F0F7",
    borderRightColor: "#44444D",
    borderBottomColor: "#44444D",
  },

  secondaryActionText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textShadowColor: "#EEEEF4",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  disabledButton: {
    opacity: 0.45,
  },

  resultPanel: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: "#B8C7E4",
    borderWidth: 2,
    borderColor: "#202237",
  },

  resultHeader: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17172A",
    borderBottomWidth: 2,
    borderBottomColor: "#59618A",
  },

  resultHeaderText: {
    color: "#D5DAFF",
    fontFamily: RETRO_FONT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  resultBody: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F0",
    padding: 10,
  },

  resultStatus: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.9,
    marginTop: 10,
    textAlign: "center",
  },

  resultHint: {
    color: "#474D63",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
    lineHeight: 12,
    marginTop: 6,
    textAlign: "center",
  },

  errorMessage: {
    color: "#3B171D",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
  },

  generatedImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F3F0",
  },

  bottomBar: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#11111E",
    borderTopWidth: 2,
    borderTopColor: "#080810",
    paddingHorizontal: 10,
    zIndex: 2,
  },

  bottomBarText: {
    width: "100%",
    color: "#C7CEFF",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.9,
    textAlign: "center",
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
