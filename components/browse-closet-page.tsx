import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { dummyData, type WardrobeItem } from "../assets/dummy-data/dummy-data";
import { browseClosetStyles as styles } from "../styles/app-styles";
import ItemDetailsPage from "./item-details-page";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

type ClosetFilter = "all" | "top" | "bottom";

export type ClosetSelection = {
  topId?: string;
  bottomId?: string;
};

type BrowseClosetPageProps = {
  onBack: () => void;
  onBuildOutfit: (selection: ClosetSelection) => void;
};

export default function BrowseClosetPage({
  onBack,
  onBuildOutfit,
}: BrowseClosetPageProps) {
  const [filter, setFilter] = useState<ClosetFilter>("all");
  const [selectedTopId, setSelectedTopId] = useState<string | undefined>();
  const [selectedBottomId, setSelectedBottomId] = useState<
    string | undefined
  >();
  const [detailsItem, setDetailsItem] = useState<WardrobeItem | null>(null);

  const clothingItems = useMemo(
    () =>
      dummyData.filter(
        (item): item is WardrobeItem =>
          item.type === "top" || item.type === "bottom"
      ),
    []
  );

  const filteredItems = useMemo(() => {
    if (filter === "all") {
      return clothingItems;
    }

    return clothingItems.filter((item) => item.type === filter);
  }, [clothingItems, filter]);

  const selectedCount = (selectedTopId ? 1 : 0) + (selectedBottomId ? 1 : 0);

  function toggleItem(item: WardrobeItem) {
    if (item.type === "top") {
      setSelectedTopId((currentId) =>
        currentId === item.id ? undefined : item.id
      );
      return;
    }

    setSelectedBottomId((currentId) =>
      currentId === item.id ? undefined : item.id
    );
  }

  function clearSelection() {
    setSelectedTopId(undefined);
    setSelectedBottomId(undefined);
  }

  function handleBuildOutfit() {
    if (selectedCount === 0) {
      return;
    }

    onBuildOutfit({
      topId: selectedTopId,
      bottomId: selectedBottomId,
    });
  }

  function renderItem({ item }: { item: WardrobeItem }) {
    const isSelected =
      item.type === "top"
        ? item.id === selectedTopId
        : item.id === selectedBottomId;

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${item.name} details`}
        onPress={() => setDetailsItem(item)}
        style={({ pressed }) => [
          styles.itemCell,
          pressed && styles.itemCellPressed,
        ]}
      >
        <View
          style={[
            styles.thumbnailFrame,
            isSelected && styles.thumbnailFrameSelected,
          ]}
        >
          <View
            style={[
              styles.itemTitleBar,
              isSelected && styles.itemTitleBarSelected,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[styles.itemTitle, isSelected && styles.itemTitleSelected]}
            >
              {item.name}
            </Text>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel={`${isSelected ? "Deselect" : "Select"} ${
                item.name
              } for an outfit`}
              accessibilityState={{ checked: isSelected }}
              hitSlop={8}
              onPress={(event) => {
                event.stopPropagation();
                toggleItem(item);
              }}
              style={[
                styles.selectionBox,
                isSelected && styles.selectionBoxSelected,
              ]}
            >
              {isSelected && <Text style={styles.selectionCheck}>✓</Text>}
            </Pressable>
          </View>

          <View style={styles.imageWell}>
            <Image
              source={item.catalogPhotos.front}
              resizeMode="contain"
              style={styles.itemImage}
            />
          </View>

          <View style={styles.itemFooter}>
            <Text style={styles.itemType}>
              {item.type === "top" ? "TOP" : "BOTTOM"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  if (detailsItem) {
    return (
      <ItemDetailsPage item={detailsItem} onBack={() => setDetailsItem(null)} />
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
              Cher AI - Browse Closet
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
                accessibilityLabel="Close closet"
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
            <Text style={styles.menuItem}>Outfits</Text>
            <Text style={styles.menuItem}>Help</Text>
          </View>

          <View style={styles.toolbar}>
            <Text style={styles.toolbarLabel}>Show:</Text>

            <Pressable
              onPress={() => setFilter("all")}
              style={[
                styles.filterButton,
                filter === "all" && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "all" && styles.filterButtonTextActive,
                ]}
              >
                All
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter("top")}
              style={[
                styles.filterButton,
                filter === "top" && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "top" && styles.filterButtonTextActive,
                ]}
              >
                Tops
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter("bottom")}
              style={[
                styles.filterButton,
                filter === "bottom" && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "bottom" && styles.filterButtonTextActive,
                ]}
              >
                Bottoms
              </Text>
            </Pressable>
          </View>

          <View style={styles.selectionStrip}>
            <View style={styles.selectionSummary}>
              <Text numberOfLines={1} style={styles.selectionSummaryText}>
                Top:{" "}
                {selectedTopId
                  ? clothingItems.find((item) => item.id === selectedTopId)
                      ?.name ?? "Selected"
                  : "None"}
              </Text>

              <Text numberOfLines={1} style={styles.selectionSummaryText}>
                Bottom:{" "}
                {selectedBottomId
                  ? clothingItems.find((item) => item.id === selectedBottomId)
                      ?.name ?? "Selected"
                  : "None"}
              </Text>
            </View>

            {selectedCount > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear selection"
                onPress={clearSelection}
                style={({ pressed }) => [
                  styles.smallWindowsButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.smallButtonText}>Clear</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.gridContainer}>
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.gridContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No clothing items found.
                  </Text>
                </View>
              }
            />
          </View>

          {selectedCount > 0 && (
            <View style={styles.buildBar}>
              <View style={styles.buildBarCopy}>
                <Text style={styles.buildBarTitle}>
                  {selectedCount} item{selectedCount === 1 ? "" : "s"} selected
                </Text>
                <Text style={styles.buildBarHint}>
                  Select up to one top and one bottom.
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Build outfit with selected clothing"
                onPress={handleBuildOutfit}
                style={({ pressed }) => [
                  styles.buildButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.buildButtonText}>Build Outfit...</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.statusBar}>
            <View style={styles.statusPanel}>
              <Text style={styles.statusText}>
                {filteredItems.length} item
                {filteredItems.length === 1 ? "" : "s"} shown
              </Text>
            </View>

            <View style={styles.statusPanelSmall}>
              <Text style={styles.statusText}>
                {selectedCount > 0 ? `${selectedCount} selected` : "Ready"}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
