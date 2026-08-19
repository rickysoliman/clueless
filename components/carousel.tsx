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

const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
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
    <View style={styles.wrapper}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>{title}</Text>

        {items.length > 0 && (
          <Text style={styles.counter}>
            {selectedIndex + 1}/{items.length}
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
            <Text style={styles.placeholderName}>NO {title} FOUND</Text>
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#11121E",
    borderWidth: 2,
    borderColor: "#202237",
  },

  titleBar: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#17172A",
    borderBottomWidth: 2,
    borderBottomColor: "#59618A",
    paddingHorizontal: 10,
  },

  title: {
    color: "#D8DEFF",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    textShadowColor: "#526BFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  counter: {
    color: "#B5BFF2",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    fontWeight: "700",
  },

  imageWindow: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "88%",
    height: "72%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C2CCE2",
    borderWidth: 1,
    borderColor: "#7E88A2",
    paddingHorizontal: 12,
  },

  placeholderName: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  controls: {
    height: 36,
    flexDirection: "row",
    backgroundColor: "#11121E",
    borderTopWidth: 2,
    borderTopColor: "#202237",
    padding: 4,
    gap: 4,
  },

  controlButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A7A7B0",
    borderWidth: 1,
    borderTopColor: "#F1F1F6",
    borderLeftColor: "#F1F1F6",
    borderRightColor: "#52525B",
    borderBottomColor: "#52525B",
  },

  controlText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -1,
  },

  playText: {
    color: "#171720",
    fontSize: 12,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
