import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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

const SCANLINES = Array.from({ length: 48 });

type BuildOutfitPageProps = {
  onBack: () => void;
  onBrowseCloset?: () => void;
};

type GenerateOutfitResponse = {
  imageUrl?: string;
  error?: string;
};

function Scanlines() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.scanlineLayer}
    >
      {SCANLINES.map((_, index) => (
        <View key={index} style={styles.scanline} />
      ))}
    </View>
  );
}

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
      <StatusBar barStyle="light-content" backgroundColor="#171521" />

      <View style={styles.monitorFrame}>
        <View style={styles.monitorBezel}>
          <ImageBackground
            source={leopardPrintBackground}
            resizeMode="cover"
            style={styles.display}
            imageStyle={styles.leopardBackgroundImage}
          >
            <View style={styles.topBar}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.topBarButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.topBarButtonText}>{"< BACK"}</Text>
              </Pressable>

              <Text style={styles.brand}>BUILD OUTFIT</Text>

              <View style={styles.modeTab}>
                <Text style={styles.modeTabText}>MIX + MATCH</Text>
              </View>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Carousel
                title="TOPS"
                items={tops}
                selectedIndex={selectedTopIndex}
                onSelectedIndexChange={(index) => {
                  setSelectedTopIndex(index);
                  setGeneratedImageUri(null);
                  setGenerationError(null);
                }}
              />

              <View style={styles.carouselSpacer} />

              <Carousel
                title="BOTTOMS"
                items={bottoms}
                selectedIndex={selectedBottomIndex}
                onSelectedIndexChange={(index) => {
                  setSelectedBottomIndex(index);
                  setGeneratedImageUri(null);
                  setGenerationError(null);
                }}
              />

              <View style={styles.actionRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Browse closet"
                  onPress={onBrowseCloset ?? onBack}
                  style={({ pressed }) => [
                    styles.browseButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.browseButtonText}>BROWSE</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Generate outfit preview"
                  disabled={!canGenerate}
                  onPress={handleDressMe}
                  style={({ pressed }) => [
                    styles.dressMeButton,
                    !canGenerate && styles.disabledButton,
                    pressed && canGenerate && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.dressMeButtonText}>
                    {isGenerating ? "WORKING..." : "DRESS ME"}
                  </Text>
                </Pressable>
              </View>

              {isGenerating && (
                <View style={styles.resultPanel}>
                  <ActivityIndicator size="large" />
                  <Text style={styles.resultStatus}>
                    GENERATING YOUR OUTFIT...
                  </Text>
                  <Text style={styles.resultHint}>
                    THIS CAN TAKE A LITTLE WHILE.
                  </Text>
                </View>
              )}

              {generationError && (
                <View style={styles.errorPanel}>
                  <Text style={styles.errorTitle}>GENERATION ERROR</Text>
                  <Text style={styles.errorMessage}>{generationError}</Text>
                </View>
              )}

              {generatedImageUri && !isGenerating && (
                <View style={styles.resultPanel}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultHeaderText}>YOUR LOOK</Text>
                  </View>

                  <Image
                    source={{ uri: generatedImageUri }}
                    resizeMode="contain"
                    style={styles.generatedImage}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Generate this outfit again"
                    onPress={handleDressMe}
                    style={({ pressed }) => [
                      styles.regenerateButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.regenerateButtonText}>TRY AGAIN</Text>
                  </Pressable>
                </View>
              )}

              {(!selectedTop || !selectedBottom) && (
                <View style={styles.emptyPanel}>
                  <Text style={styles.emptyTitle}>MORE CLOTHES NEEDED</Text>
                  <Text style={styles.emptyText}>
                    ADD AT LEAST ONE TOP AND ONE BOTTOM BEFORE BUILDING AN
                    OUTFIT.
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.bottomBar}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.bottomBarText}
              >
                TOPS · BOTTOMS · MIX + MATCH · DRESS ME
              </Text>
            </View>

            <Scanlines />
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#17131A",
    paddingHorizontal: 7,
    paddingVertical: 6,
  },

  monitorFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    backgroundColor: "#433830",
    borderWidth: 5,
    borderTopColor: "#807369",
    borderLeftColor: "#807369",
    borderRightColor: "#201A17",
    borderBottomColor: "#201A17",
    borderRadius: 21,
    padding: 7,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 15,
    elevation: 16,
  },

  monitorBezel: {
    flex: 1,
    backgroundColor: "#27232A",
    borderWidth: 4,
    borderTopColor: "#5E5662",
    borderLeftColor: "#5E5662",
    borderRightColor: "#0F0D12",
    borderBottomColor: "#0F0D12",
    borderRadius: 14,
    padding: 6,
  },

  display: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#B69C78",
    borderWidth: 3,
    borderColor: "#090911",
    borderRadius: 8,
  },

  leopardBackgroundImage: {
    borderRadius: 5,
  },

  topBar: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141426",
    borderBottomWidth: 4,
    borderBottomColor: "#070711",
    paddingHorizontal: 7,
    zIndex: 2,
  },

  topBarButton: {
    backgroundColor: "#9C9CA8",
    borderWidth: 3,
    borderTopColor: "#EEEEF5",
    borderLeftColor: "#EEEEF5",
    borderRightColor: "#24242C",
    borderBottomColor: "#24242C",
    paddingHorizontal: 7,
    paddingVertical: 6,
  },

  topBarButtonText: {
    color: "#15151E",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  brand: {
    flex: 1,
    color: "#BAC6FF",
    fontFamily: RETRO_FONT,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    textShadowColor: "#536BFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  modeTab: {
    backgroundColor: "#1B1B30",
    borderWidth: 2,
    borderTopColor: "#8B93C5",
    borderLeftColor: "#8B93C5",
    borderRightColor: "#080810",
    borderBottomColor: "#080810",
    paddingHorizontal: 7,
    paddingVertical: 6,
  },

  modeTabText: {
    color: "#D2D7FF",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  scrollView: {
    flex: 1,
    zIndex: 2,
  },

  content: {
    width: "78%",
    maxWidth: 520,
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 24,
  },

  carouselSpacer: {
    height: 14,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  browseButton: {
    flex: 1,
    minHeight: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#293DE1",
    borderWidth: 5,
    borderTopColor: "#DDE4FF",
    borderLeftColor: "#DDE4FF",
    borderRightColor: "#11142D",
    borderBottomColor: "#11142D",
    shadowColor: "#101226",
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 8,
  },

  browseButtonText: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.2,
    textShadowColor: "#10132D",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },

  dressMeButton: {
    flex: 1.15,
    minHeight: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5A4AE",
    borderWidth: 5,
    borderTopColor: "#F1F0F7",
    borderLeftColor: "#F1F0F7",
    borderRightColor: "#20202B",
    borderBottomColor: "#20202B",
    shadowColor: "#181821",
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.58,
    shadowRadius: 0,
    elevation: 8,
  },

  dressMeButtonText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.2,
    textShadowColor: "#EEEEF4",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  disabledButton: {
    opacity: 0.5,
  },

  resultPanel: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#AABAD8",
    borderWidth: 5,
    borderTopColor: "#EFF3FF",
    borderLeftColor: "#EFF3FF",
    borderRightColor: "#30364C",
    borderBottomColor: "#30364C",
    marginTop: 18,
    padding: 14,
    shadowColor: "#090913",
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 0,
    elevation: 8,
  },

  resultHeader: {
    width: "100%",
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17172A",
    borderBottomWidth: 3,
    borderBottomColor: "#4A506D",
    marginBottom: 12,
  },

  resultHeaderText: {
    color: "#D5DAFF",
    fontFamily: RETRO_FONT,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
  },

  resultStatus: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 12,
    textAlign: "center",
  },

  resultHint: {
    color: "#474D63",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 7,
    textAlign: "center",
  },

  generatedImage: {
    width: "100%",
    height: 430,
    backgroundColor: "#C1CCE5",
  },

  regenerateButton: {
    width: "70%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9C9CA8",
    borderWidth: 4,
    borderTopColor: "#EEEEF5",
    borderLeftColor: "#EEEEF5",
    borderRightColor: "#24242C",
    borderBottomColor: "#24242C",
    marginTop: 12,
  },

  regenerateButtonText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  errorPanel: {
    width: "100%",
    backgroundColor: "#B8A4A7",
    borderWidth: 4,
    borderTopColor: "#F1DDE0",
    borderLeftColor: "#F1DDE0",
    borderRightColor: "#4A2B31",
    borderBottomColor: "#4A2B31",
    marginTop: 18,
    padding: 14,
  },

  errorTitle: {
    color: "#3B171D",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },

  errorMessage: {
    color: "#3B171D",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 8,
    textAlign: "center",
  },

  emptyPanel: {
    width: "100%",
    backgroundColor: "#AABAD8",
    borderWidth: 4,
    borderTopColor: "#EFF3FF",
    borderLeftColor: "#EFF3FF",
    borderRightColor: "#30364C",
    borderBottomColor: "#30364C",
    marginTop: 18,
    padding: 15,
  },

  emptyTitle: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },

  emptyText: {
    color: "#34394D",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 8,
    textAlign: "center",
  },

  bottomBar: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141426",
    borderTopWidth: 4,
    borderTopColor: "#070711",
    paddingHorizontal: 9,
    zIndex: 2,
  },

  bottomBarText: {
    width: "100%",
    color: "#C3CAFA",
    fontFamily: RETRO_FONT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.15,
    textAlign: "center",
  },

  scanlineLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    zIndex: 10,
  },

  scanline: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(14, 16, 39, 0.1)",
  },

  buttonPressed: {
    opacity: 0.84,
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
});
