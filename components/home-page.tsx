import React, { useState } from "react";
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
import AddClothingPage from "./add-clothing-page";
import BrowseClosetPage from "./browse-closet-page";
import BuildOutfitPage from "./build-outfit-page";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

type HomePageProps = {
  onLogOut: () => void;
};

type DummyWardrobeItem = {
  type: "top" | "bottom" | "outfit";
};

export default function HomePage({ onLogOut }: HomePageProps) {
  // TABS: home, build, browse, add
  // Home (default)
  // Build (build a new outfit, aka "DRESS ME")
  // Browse (browse all clothing items in closet)
  // Add (add new clothing items to closet)
  const [tab, setTab] = useState("home");

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

  if (tab === "home") {
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
                Cher AI - Closet
              </Text>

              <View style={styles.windowControls}>
                <View style={styles.windowControlButton}>
                  <Text style={styles.minimizeSymbol}>_</Text>
                </View>

                <View style={styles.windowControlButton}>
                  <Text style={styles.maximizeSymbol}>□</Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Log out"
                  onPress={onLogOut}
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

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.groupBox}>
                <View style={styles.groupLabelBackground}>
                  <Text style={styles.groupLabel}>Cher AI</Text>
                </View>

                <View style={styles.heroPanelBody}>
                  {wardrobeIsEmpty ? (
                    <>
                      <Text style={styles.heroTitle}>
                        Your closet is empty.
                      </Text>

                      <Text style={styles.heroDescription}>
                        You haven&apos;t added any clothing yet. Start building
                        your digital wardrobe by uploading your first top or
                        bottom.
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Add your first clothing item"
                        onPress={() => setTab("add")}
                        style={({ pressed }) => [
                          styles.windowsButton,
                          styles.heroButton,
                          pressed && styles.windowsButtonPressed,
                        ]}
                      >
                        <Text style={styles.buttonText}>
                          Add Your First Item
                        </Text>
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Text style={styles.heroTitle}>
                        Ready to get dressed?
                      </Text>

                      <Text style={styles.heroDescription}>
                        Select a top and bottom, then preview the complete
                        outfit.
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Build an outfit"
                        onPress={() => setTab("build")}
                        style={({ pressed }) => [
                          styles.windowsButton,
                          styles.heroButton,
                          pressed && styles.windowsButtonPressed,
                        ]}
                      >
                        <Text style={styles.buttonText}>Dress Me</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Wardrobe Inventory</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{topCount}</Text>
                  <Text style={styles.statLabel}>Tops</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{bottomCount}</Text>
                  <Text style={styles.statLabel}>Bottoms</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{outfitCount}</Text>
                  <Text style={styles.statLabel}>Outfits</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Browse closet"
                  onPress={() => setTab("browse")}
                  style={({ pressed }) => [
                    styles.windowsButton,
                    styles.actionButton,
                    pressed && styles.windowsButtonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>Browse Closet</Text>
                </Pressable>

                {!wardrobeIsEmpty && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add clothing"
                    onPress={() => setTab("add")}
                    style={({ pressed }) => [
                      styles.windowsButton,
                      styles.actionButton,
                      pressed && styles.windowsButtonPressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Add Clothing...</Text>
                  </Pressable>
                )}
              </View>
            </ScrollView>

            <View style={styles.statusBar}>
              <View style={styles.statusPanel}>
                <Text style={styles.statusText}>
                  {topCount + bottomCount} clothing item
                  {topCount + bottomCount === 1 ? "" : "s"}
                </Text>
              </View>

              <View style={styles.statusPanelSmall}>
                <Text style={styles.statusText}>Ready</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (tab === "build") {
    return (
      <BuildOutfitPage
        onBack={() => setTab("home")}
        onBrowseCloset={() => setTab("browse")}
      />
    );
  }

  if (tab === "browse") {
    return (
      <View style={styles.childPage}>
        <Pressable onPress={() => setTab("home")}>
          <BrowseClosetPage />
        </Pressable>
      </View>
    );
  }

  if (tab === "add") {
    return (
      <View style={styles.childPage}>
        <Pressable onPress={() => setTab("home")}>
          <AddClothingPage />
        </Pressable>
      </View>
    );
  }

  return null;
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

  scrollView: {
    flex: 1,
    backgroundColor: "#C0C0C0",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
  },

  groupBox: {
    position: "relative",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 18,
  },

  groupLabelBackground: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  heroPanelBody: {
    alignItems: "center",
  },

  heroTitle: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  heroDescription: {
    maxWidth: 420,
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    textAlign: "center",
  },

  windowsButton: {
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
    paddingHorizontal: 14,
  },

  windowsButtonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },

  heroButton: {
    minWidth: 160,
    marginTop: 18,
  },

  buttonText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
  },

  sectionHeader: {
    marginTop: 18,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },

  sectionHeaderText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  statCard: {
    flex: 1,
    minHeight: 78,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 6,
    paddingVertical: 10,
  },

  statNumber: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 24,
    fontWeight: "700",
  },

  statLabel: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    marginTop: 3,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  actionButton: {
    flex: 1,
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
    width: 72,
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

  childPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
