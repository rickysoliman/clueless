import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { WardrobeItem } from "../assets/dummy-data/dummy-data";

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

type CarouselProps = {
  title: string;
  items: WardrobeItem[];
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
};

export default function Carousel({
  title,
  items,
  selectedIndex,
  onSelectedIndexChange,
}: CarouselProps) {
  const selectedItem = items[selectedIndex];

  function moveBy(amount: number) {
    if (items.length === 0) {
      return;
    }

    const nextIndex =
      (selectedIndex + amount + items.length * 100) % items.length;

    onSelectedIndexChange(nextIndex);
  }

  return (
    <View style={styles.groupBox}>
      <View style={styles.groupLabelBackground}>
        <Text style={styles.groupLabel}>{title}</Text>
      </View>

      <View style={styles.innerPanel}>
        <View style={styles.itemBar}>
          <Text numberOfLines={1} style={styles.itemName}>
            {selectedItem?.name ?? `No ${title.toLowerCase()} found`}
          </Text>

          {items.length > 0 && (
            <Text style={styles.counter}>
              {selectedIndex + 1} of {items.length}
            </Text>
          )}
        </View>

        <View style={styles.imageWindow}>
          {selectedItem ? (
            <Image
              source={selectedItem.catalogPhotos.front}
              resizeMode="contain"
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderName}>
                No {title.toLowerCase()} found.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Previous ${title.toLowerCase()}`}
            disabled={items.length < 2}
            onPress={() => moveBy(-1)}
            style={({ pressed }) => [
              styles.controlButton,
              pressed && styles.buttonPressed,
              items.length < 2 && styles.disabledButton,
            ]}
          >
            <Text style={styles.controlText}>{"<<"}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Next ${title.toLowerCase()}`}
            disabled={items.length < 2}
            onPress={() => moveBy(1)}
            style={({ pressed }) => [
              styles.controlButton,
              pressed && styles.buttonPressed,
              items.length < 2 && styles.disabledButton,
            ]}
          >
            <Text style={styles.playText}>{"▶"}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Next ${title.toLowerCase()}`}
            disabled={items.length < 2}
            onPress={() => moveBy(1)}
            style={({ pressed }) => [
              styles.controlButton,
              pressed && styles.buttonPressed,
              items.length < 2 && styles.disabledButton,
            ]}
          >
            <Text style={styles.controlText}>{">>"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupBox: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    position: "relative",
    backgroundColor: "#C0C0C0",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 8,
  },

  groupLabelBackground: {
    position: "absolute",
    top: -9,
    left: 10,
    zIndex: 2,
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  innerPanel: {
    flex: 1,
    minHeight: 0,
  },

  itemBar: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000080",
    paddingHorizontal: 7,
  },

  itemName: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
    fontWeight: "700",
  },

  counter: {
    color: "#FFFFFF",
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
    marginLeft: 8,
  },

  imageWindow: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "88%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
  },

  placeholderName: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    textAlign: "center",
  },

  controls: {
    height: 38,
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#C0C0C0",
    paddingTop: 5,
  },

  controlButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
  },

  controlText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
  },

  playText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
