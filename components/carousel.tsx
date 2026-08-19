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
          <>
            <Image
              source={selectedItem.catalogPhotos.front}
              resizeMode="contain"
              style={styles.image}
            />

            <View style={styles.itemNameBar}>
              <Text numberOfLines={1} style={styles.itemName}>
                {selectedItem.name.toUpperCase()}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderName}>NO {title} FOUND</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Jump backward through ${title.toLowerCase()}`}
          disabled={items.length < 2}
          onPress={() => moveBy(-5)}
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
          accessibilityLabel={`Previous ${title.toLowerCase()}`}
          disabled={items.length < 2}
          onPress={() => moveBy(-1)}
          style={({ pressed }) => [
            styles.controlButton,
            pressed && styles.buttonPressed,
            items.length < 2 && styles.disabledButton,
          ]}
        >
          <Text style={styles.controlText}>{"<"}</Text>
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
          <Text style={styles.controlText}>{">"}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Jump forward through ${title.toLowerCase()}`}
          disabled={items.length < 2}
          onPress={() => moveBy(5)}
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
    width: "100%",
    backgroundColor: "#0C0D18",
    borderWidth: 4,
    borderTopColor: "#DDE3FF",
    borderLeftColor: "#DDE3FF",
    borderRightColor: "#24283B",
    borderBottomColor: "#24283B",
    shadowColor: "#090913",
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 0,
    elevation: 8,
  },

  titleBar: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#18182A",
    borderBottomWidth: 3,
    borderBottomColor: "#555D80",
    paddingHorizontal: 10,
  },

  title: {
    color: "#D5DBFF",
    fontFamily: RETRO_FONT,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.7,
    textShadowColor: "#526BFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  counter: {
    color: "#AEB9F0",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
  },

  imageWindow: {
    height: 210,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#ADBDE0",
    borderTopWidth: 3,
    borderTopColor: "#EFF3FF",
    borderBottomWidth: 3,
    borderBottomColor: "#31374C",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "84%",
    minHeight: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9EAED0",
    borderWidth: 2,
    borderTopColor: "#E9EEFF",
    borderLeftColor: "#E9EEFF",
    borderRightColor: "#4B536D",
    borderBottomColor: "#4B536D",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  placeholderLabel: {
    color: "#4E5670",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 8,
  },

  placeholderName: {
    color: "#171824",
    fontFamily: RETRO_FONT,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },

  placeholderHint: {
    color: "#4A5065",
    fontFamily: RETRO_FONT,
    fontSize: 8,
    lineHeight: 12,
    marginTop: 10,
    textAlign: "center",
  },

  itemNameBar: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 7,
    minHeight: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 38, 0.88)",
    borderWidth: 1,
    borderColor: "#6974A4",
    paddingHorizontal: 8,
  },

  itemName: {
    color: "#E3E7FF",
    fontFamily: RETRO_FONT,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  controls: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#11121E",
    padding: 6,
  },

  controlButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9B9CA9",
    borderWidth: 3,
    borderTopColor: "#F2F1F8",
    borderLeftColor: "#F2F1F8",
    borderRightColor: "#24242D",
    borderBottomColor: "#24242D",
  },

  controlText: {
    color: "#171720",
    fontFamily: RETRO_FONT,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -1,
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
