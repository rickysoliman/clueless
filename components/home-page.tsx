import React from "react";
import {
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
import { dummyData } from "../assets/dummy-data/dummy-data";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

const SCANLINES = Array.from({ length: 46 });

type HomePageProps = {
  onLogOut: () => void;
  onBuildOutfit?: () => void;
  onAddClothing?: () => void;
};

type DummyWardrobeItem = {
  type: "top" | "bottom" | "outfit";
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

export default function HomePage({
  onLogOut,
  onBuildOutfit = () => undefined,
  onAddClothing = () => undefined,
}: HomePageProps) {
  const wardrobeItems = dummyData as DummyWardrobeItem[];

  const topCount = wardrobeItems.filter((item) => item.type === "top").length;
  const bottomCount = wardrobeItems.filter(
    (item) => item.type === "bottom"
  ).length;
  const outfitCount = wardrobeItems.filter(
    (item) => item.type === "outfit"
  ).length;

  const wardrobeIsEmpty =
    topCount === 0 && bottomCount === 0 && outfitCount === 0;

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
              <Text style={styles.brand}>DRESS ME</Text>

              <View style={styles.seasonTab}>
                <Text style={styles.seasonTabText}>ALL FASHIONS</Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Log out"
                onPress={onLogOut}
                style={({ pressed }) => [
                  styles.logoutButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.logoutButtonText}>LOG OUT</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.heroPanel}>
                <View style={styles.heroPanelHeader}>
                  <Text style={styles.heroEyebrow}>TODAY&apos;S LOOK</Text>
                </View>

                <View style={styles.heroPanelBody}>
                  {wardrobeIsEmpty ? (
                    <>
                      <Text style={styles.heroTitle}>YOUR CLOSET IS EMPTY</Text>

                      <View style={styles.heroDivider} />

                      <Text style={styles.heroDescription}>
                        YOU HAVEN&apos;T ADDED ANY CLOTHING YET. START BUILDING
                        YOUR DIGITAL WARDROBE BY UPLOADING YOUR FIRST TOP OR
                        BOTTOM!
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Add your first clothing item"
                        onPress={onAddClothing}
                        style={({ pressed }) => [
                          styles.dressMeButton,
                          pressed && styles.buttonPressed,
                        ]}
                      >
                        <Text style={styles.dressMeButtonText}>
                          ADD YOUR FIRST ITEM
                        </Text>
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Text style={styles.heroTitle}>
                        READY TO GET DRESSED?
                      </Text>

                      <View style={styles.heroDivider} />

                      <Text style={styles.heroDescription}>
                        SELECT A TOP AND BOTTOM, THEN PREVIEW THE COMPLETE
                        OUTFIT.
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Build an outfit"
                        onPress={onBuildOutfit}
                        style={({ pressed }) => [
                          styles.dressMeButton,
                          pressed && styles.buttonPressed,
                        ]}
                      >
                        <Text style={styles.dressMeButtonText}>DRESS ME</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>

              <View style={styles.sectionLabel}>
                <Text style={styles.sectionLabelText}>WARDROBE INVENTORY</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{topCount}</Text>
                  <Text style={styles.statLabel}>TOPS</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{bottomCount}</Text>
                  <Text style={styles.statLabel}>BOTTOMS</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{outfitCount}</Text>
                  <Text style={styles.statLabel}>OUTFITS</Text>
                </View>
              </View>

              {!wardrobeIsEmpty && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Add clothing"
                  onPress={onAddClothing}
                  style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <View style={styles.addButtonIcon}>
                    <Text style={styles.addButtonIconText}>+</Text>
                  </View>

                  <View style={styles.addButtonTextContainer}>
                    <Text style={styles.addButtonTitle}>ADD CLOTHING</Text>
                    <Text style={styles.addButtonSubtitle}>
                      BROWSE TOPS + BOTTOMS
                    </Text>
                  </View>

                  <Text style={styles.addButtonArrow}>&gt;&gt;</Text>
                </Pressable>
              )}
            </ScrollView>

            <View style={styles.bottomBar}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.bottomBarText}
              >
                TOPS · BOTTOMS · OUTFITS · MORE
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
    shadowOffset: {
      width: 0,
      height: 8,
    },
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
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141426",
    borderBottomWidth: 4,
    borderBottomColor: "#070711",
    paddingHorizontal: 8,
    zIndex: 2,
  },

  brand: {
    flex: 1,
    color: "#BAC6FF",
    fontFamily: RETRO_FONT,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.8,
    textShadowColor: "#536BFF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },

  seasonTab: {
    backgroundColor: "#1B1B30",
    borderWidth: 2,
    borderTopColor: "#8B93C5",
    borderLeftColor: "#8B93C5",
    borderRightColor: "#080810",
    borderBottomColor: "#080810",
    marginRight: 7,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  seasonTabText: {
    color: "#D2D7FF",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  logoutButton: {
    backgroundColor: "#9C9CA8",
    borderWidth: 3,
    borderTopColor: "#EEEEF5",
    borderLeftColor: "#EEEEF5",
    borderRightColor: "#24242C",
    borderBottomColor: "#24242C",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  logoutButtonText: {
    color: "#15151E",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  scrollView: {
    flex: 1,
    zIndex: 2,
  },

  content: {
    flexGrow: 1,
    width: "86%",
    maxWidth: 560,
    alignSelf: "center",
    paddingTop: 17,
    paddingBottom: 24,
  },

  heroPanel: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#AABAD8",
    borderWidth: 5,
    borderTopColor: "#EFF3FF",
    borderLeftColor: "#EFF3FF",
    borderRightColor: "#30364C",
    borderBottomColor: "#30364C",
    shadowColor: "#090913",
    shadowOffset: {
      width: 6,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 10,
  },

  heroPanelHeader: {
    minHeight: 39,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17172A",
    borderBottomWidth: 4,
    borderBottomColor: "#4A506D",
    paddingHorizontal: 12,
  },

  heroEyebrow: {
    color: "#D5DAFF",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textShadowColor: "#4F68FF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 4,
  },

  heroPanelBody: {
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
  },

  heroTitle: {
    color: "#191A29",
    fontFamily: RETRO_FONT,
    fontSize: 25,
    fontWeight: "700",
    lineHeight: 31,
    letterSpacing: 1.5,
    textAlign: "center",
    textShadowColor: "#EEF2FF",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  heroDivider: {
    width: "72%",
    height: 4,
    backgroundColor: "#3D435D",
    borderTopWidth: 1,
    borderTopColor: "#F2F5FF",
    marginTop: 15,
    marginBottom: 15,
  },

  heroDescription: {
    maxWidth: 410,
    color: "#292C40",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 19,
    letterSpacing: 0.55,
    textAlign: "center",
  },

  dressMeButton: {
    width: "100%",
    maxWidth: 320,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5A4AE",
    borderWidth: 4,
    borderTopColor: "#F1F0F7",
    borderLeftColor: "#F1F0F7",
    borderRightColor: "#20202B",
    borderBottomColor: "#20202B",
    marginTop: 22,
    paddingHorizontal: 16,
    shadowColor: "#181821",
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 0,
    elevation: 7,
  },

  dressMeButtonText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: 2,
    textShadowColor: "#EEEEF4",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  sectionLabel: {
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17172A",
    borderWidth: 3,
    borderTopColor: "#767FAD",
    borderLeftColor: "#767FAD",
    borderRightColor: "#080810",
    borderBottomColor: "#080810",
    marginTop: 24,
    paddingHorizontal: 10,
  },

  sectionLabelText: {
    color: "#D1D6FF",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 11,
    marginHorizontal: -3,
  },

  statCard: {
    flex: 1,
    minHeight: 91,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9B9D7",
    borderWidth: 4,
    borderTopColor: "#EDF2FF",
    borderLeftColor: "#EDF2FF",
    borderRightColor: "#30364B",
    borderBottomColor: "#30364B",
    marginHorizontal: 3,
    paddingHorizontal: 4,
    paddingVertical: 12,
  },

  statNumber: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 27,
    fontWeight: "700",
    textShadowColor: "#EFF3FF",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  statLabel: {
    color: "#303348",
    fontFamily: RETRO_FONT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 6,
    textAlign: "center",
  },

  addButton: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#293DE1",
    borderWidth: 5,
    borderTopColor: "#DDE4FF",
    borderLeftColor: "#DDE4FF",
    borderRightColor: "#11142D",
    borderBottomColor: "#11142D",
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 11,
    shadowColor: "#101226",
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 8,
  },

  addButtonIcon: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#182179",
    borderWidth: 3,
    borderTopColor: "#ADB9FF",
    borderLeftColor: "#ADB9FF",
    borderRightColor: "#080B2B",
    borderBottomColor: "#080B2B",
  },

  addButtonIconText: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 31,
  },

  addButtonTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  addButtonTitle: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.1,
    textShadowColor: "#10132D",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  addButtonSubtitle: {
    color: "#D5DDFF",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.7,
    marginTop: 5,
  },

  addButtonArrow: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -2,
    marginLeft: 8,
    textShadowColor: "#10132D",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
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
    letterSpacing: 1.25,
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
