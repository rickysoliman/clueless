import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import type { WardrobeItem } from "../assets/dummy-data/dummy-data";
import { carouselStyles as styles } from "../styles/app-styles";

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
