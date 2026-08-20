import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { dummyData } from "../assets/dummy-data/dummy-data";
import { homePageStyles as styles } from "../styles/app-styles";
import AddClothingPage from "./add-clothing-page";
import BrowseClosetPage, { type ClosetSelection } from "./browse-closet-page";
import BuildOutfitPage from "./build-outfit-page";
import Profile from "./profile";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

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
  const [tab, setTab] = useState("home");
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
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
