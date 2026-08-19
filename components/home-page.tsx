import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ImageSourcePropType,
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
import BrowseClosetPage, { type ClosetSelection } from "./browse-closet-page";
import BuildOutfitPage from "./build-outfit-page";
import Profile from "./profile";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

type HomePageProps = {
  onLogOut: () => void;
  profileFirstName?: string;
  profilePicture?: ImageSourcePropType;
  onChangeProfilePhoto?: () => void;
  onEditProfileName?: () => void;
};

type DummyWardrobeItem = {
  type: "top" | "bottom" | "outfit";
};

type MenuName = "file" | "closet" | "outfits" | "help";

type WindowsMenuItemProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

function WindowsMenuItem({
  label,
  onPress,
  disabled = false,
}: WindowsMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="menuitem"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.dropdownItem,
        pressed && !disabled && styles.dropdownItemPressed,
        disabled && styles.dropdownItemDisabled,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.dropdownItemText,
            pressed && !disabled && styles.dropdownItemTextPressed,
            disabled && styles.dropdownItemTextDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

export default function HomePage({
  onLogOut,
  profileFirstName = "User",
  profilePicture,
  onChangeProfilePhoto,
  onEditProfileName,
}: HomePageProps) {
  // TABS: home, build, browse, add
  const [tab, setTab] = useState("home");

  // Windows 98 menu currently open.
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);

  // Optional selection passed from Browse Closet into Build Outfit.
  const [buildSelection, setBuildSelection] = useState<ClosetSelection>({});

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

  function toggleMenu(menu: MenuName) {
    setActiveMenu((currentMenu) => (currentMenu === menu ? null : menu));
  }

  function runMenuAction(action: () => void) {
    setActiveMenu(null);
    action();
  }

  function openBuildOutfit(selection: ClosetSelection = {}) {
    setBuildSelection(selection);
    setTab("build");
  }

  function showHowItWorks() {
    Alert.alert(
      "How Cher AI Works",
      "Add your clothes to your closet, mix and match a top and bottom, then use Dress Me to preview the finished outfit."
    );
  }

  function showAbout() {
    Alert.alert(
      "About Cher AI",
      "Cher AI is your totally fabulous digital wardrobe for mixing, matching, and previewing outfits."
    );
  }

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
              <View style={styles.menuItemContainer}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="File menu"
                  onPress={() => toggleMenu("file")}
                  style={[
                    styles.menuButton,
                    activeMenu === "file" && styles.menuButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      activeMenu === "file" && styles.menuItemActive,
                    ]}
                  >
                    File
                  </Text>
                </Pressable>

                {activeMenu === "file" && (
                  <View style={styles.dropdownMenu}>
                    <WindowsMenuItem
                      label="Home"
                      onPress={() => runMenuAction(() => setTab("home"))}
                    />
                    <WindowsMenuItem
                      label="Add Clothing..."
                      onPress={() => runMenuAction(() => setTab("add"))}
                    />

                    <View style={styles.menuSeparator} />

                    <WindowsMenuItem
                      label="Log Out"
                      onPress={() => runMenuAction(onLogOut)}
                    />
                  </View>
                )}
              </View>

              <View style={styles.menuItemContainer}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Closet menu"
                  onPress={() => toggleMenu("closet")}
                  style={[
                    styles.menuButton,
                    activeMenu === "closet" && styles.menuButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      activeMenu === "closet" && styles.menuItemActive,
                    ]}
                  >
                    Closet
                  </Text>
                </Pressable>

                {activeMenu === "closet" && (
                  <View style={styles.dropdownMenu}>
                    <WindowsMenuItem
                      label="Browse Closet"
                      onPress={() => runMenuAction(() => setTab("browse"))}
                    />
                    <WindowsMenuItem
                      label="Add Clothing..."
                      onPress={() => runMenuAction(() => setTab("add"))}
                    />
                  </View>
                )}
              </View>

              <View style={styles.menuItemContainer}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Outfits menu"
                  onPress={() => toggleMenu("outfits")}
                  style={[
                    styles.menuButton,
                    activeMenu === "outfits" && styles.menuButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      activeMenu === "outfits" && styles.menuItemActive,
                    ]}
                  >
                    Outfits
                  </Text>
                </Pressable>

                {activeMenu === "outfits" && (
                  <View style={styles.dropdownMenu}>
                    <WindowsMenuItem
                      label="Build Outfit..."
                      onPress={() => runMenuAction(() => openBuildOutfit())}
                    />
                    <WindowsMenuItem label="Browse Saved Outfits" disabled />
                  </View>
                )}
              </View>

              <View style={styles.menuItemContainer}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Help menu"
                  onPress={() => toggleMenu("help")}
                  style={[
                    styles.menuButton,
                    activeMenu === "help" && styles.menuButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      activeMenu === "help" && styles.menuItemActive,
                    ]}
                  >
                    Help
                  </Text>
                </Pressable>

                {activeMenu === "help" && (
                  <View style={[styles.dropdownMenu, styles.dropdownMenuRight]}>
                    <WindowsMenuItem
                      label="How Cher AI Works"
                      onPress={() => runMenuAction(showHowItWorks)}
                    />
                    <WindowsMenuItem
                      label="Profile"
                      onPress={() => runMenuAction(() => setTab("profile"))}
                    />

                    <View style={styles.menuSeparator} />

                    <WindowsMenuItem
                      label="About Cher AI"
                      onPress={() => runMenuAction(showAbout)}
                    />
                  </View>
                )}
              </View>
            </View>

            {activeMenu !== null && (
              <Pressable
                accessibilityLabel="Close menu"
                onPress={() => setActiveMenu(null)}
                style={styles.menuDismissLayer}
              />
            )}

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
                        onPress={() => openBuildOutfit()}
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
        initialTopId={buildSelection.topId}
        initialBottomId={buildSelection.bottomId}
      />
    );
  }

  if (tab === "browse") {
    return (
      <BrowseClosetPage
        onBack={() => setTab("home")}
        onBuildOutfit={(selection) => openBuildOutfit(selection)}
      />
    );
  }

  if (tab === "profile") {
    return (
      <Profile
        firstName={profileFirstName}
        profilePicture={profilePicture}
        onBack={() => setTab("home")}
        onChangePhoto={onChangeProfilePhoto}
        onEditName={onEditProfileName}
      />
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
    position: "relative",
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
    zIndex: 30,
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
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    zIndex: 40,
    overflow: "visible",
  },

  menuItemContainer: {
    position: "relative",
    height: "100%",
    justifyContent: "center",
    marginRight: 2,
    zIndex: 50,
  },

  menuButton: {
    minHeight: 24,
    justifyContent: "center",
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "transparent",
  },

  menuButtonActive: {
    backgroundColor: "#000080",
    borderColor: "#000080",
  },

  menuItem: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  menuItemActive: {
    color: "#FFFFFF",
  },

  dropdownMenu: {
    position: "absolute",
    top: 28,
    left: 0,
    width: 190,
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#000000",
    borderBottomColor: "#000000",
    padding: 2,
    zIndex: 100,
    elevation: 20,
  },

  dropdownMenuRight: {
    left: undefined,
    right: 0,
  },

  dropdownItem: {
    minHeight: 28,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  dropdownItemPressed: {
    backgroundColor: "#000080",
  },

  dropdownItemDisabled: {
    backgroundColor: "#C0C0C0",
  },

  dropdownItemText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  dropdownItemTextPressed: {
    color: "#FFFFFF",
  },

  dropdownItemTextDisabled: {
    color: "#808080",
    textShadowColor: "#FFFFFF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  menuSeparator: {
    height: 2,
    marginVertical: 3,
    marginHorizontal: 2,
    borderTopWidth: 1,
    borderTopColor: "#808080",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },

  menuDismissLayer: {
    ...StyleSheet.absoluteFillObject,
    top: 60,
    zIndex: 20,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    zIndex: 1,
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
