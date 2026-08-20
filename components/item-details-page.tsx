import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import type { WardrobeItem } from "../assets/dummy-data/dummy-data";
import { itemDetailsStyles as styles } from "../styles/app-styles";

type ItemDetailsPageProps = {
  item: WardrobeItem;
  onBack: () => void;
  initialPhotoIndex?: number;
};

type ItemPhoto = {
  key: string;
  label: string;
  source: ImageSourcePropType;
};

function formatPhotoLabel(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getPhotosFromRecord(
  photos: Record<string, ImageSourcePropType | undefined>
): ItemPhoto[] {
  return Object.entries(photos)
    .filter(
      (entry): entry is [string, ImageSourcePropType] =>
        entry[1] !== undefined && entry[1] !== null
    )
    .map(([key, source]) => ({
      key,
      label: formatPhotoLabel(key),
      source,
    }));
}

function getItemPhotos(item: WardrobeItem): ItemPhoto[] {
  const catalogPhotos = getPhotosFromRecord(
    item.catalogPhotos as Record<string, ImageSourcePropType | undefined>
  );

  if (catalogPhotos.length > 0) {
    return catalogPhotos;
  }

  return getPhotosFromRecord(
    item.referencePhotos as Record<string, ImageSourcePropType | undefined>
  );
}

export default function ItemDetailsPage({
  item,
  onBack,
  initialPhotoIndex = 0,
}: ItemDetailsPageProps) {
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<ItemPhoto>>(null);

  const photos = useMemo(() => getItemPhotos(item), [item]);

  const safeInitialIndex =
    photos.length === 0
      ? 0
      : Math.min(Math.max(initialPhotoIndex, 0), photos.length - 1);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(safeInitialIndex);

  const [controlsVisible, setControlsVisible] = useState(true);

  const currentPhoto = photos[currentPhotoIndex];

  function toggleControls() {
    setControlsVisible((visible) => !visible);
  }

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (photos.length === 0 || width === 0) {
      return;
    }

    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    setCurrentPhotoIndex(Math.min(Math.max(nextIndex, 0), photos.length - 1));
  }

  function renderPhoto({ item: photo }: { item: ItemPhoto }) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          controlsVisible ? "Hide item information" : "Show item information"
        }
        onPress={toggleControls}
        style={[
          styles.photoPage,
          {
            width,
            height,
          },
        ]}
      >
        <Image
          source={photo.source}
          resizeMode="contain"
          style={[
            styles.photo,
            {
              width,
              height,
            },
          ]}
        />
      </Pressable>
    );
  }

  return (
    <View style={[styles.screen, { flex: 1, backgroundColor: "#000000" }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {photos.length > 0 ? (
        <FlatList
          ref={listRef}
          data={photos}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(photo) => photo.key}
          renderItem={renderPhoto}
          initialScrollIndex={safeInitialIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollToIndexFailed={() => {
            listRef.current?.scrollToOffset({
              offset: safeInitialIndex * width,
              animated: false,
            });
          }}
          style={[styles.photoList, { flex: 1 }]}
        />
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            controlsVisible ? "Hide item information" : "Show item information"
          }
          onPress={toggleControls}
          style={[
            styles.emptyPhotoArea,
            {
              width,
              height,
            },
          ]}
        >
          <Text style={styles.emptyPhotoText}>
            No photos available for this item.
          </Text>
        </Pressable>
      )}

      {controlsVisible && (
        <>
          <View style={styles.headerOverlay} pointerEvents="box-none">
            <SafeAreaView>
              <View style={styles.headerContent}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Back"
                  hitSlop={10}
                  onPress={onBack}
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed && styles.overlayButtonPressed,
                  ]}
                >
                  <Text style={styles.backButtonText}>‹</Text>
                </Pressable>

                <View style={styles.headerTextContainer}>
                  <Text numberOfLines={1} style={styles.itemName}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemType}>
                    {item.type === "top" ? "TOP" : "BOTTOM"}
                  </Text>
                </View>

                <View style={styles.headerSpacer} />
              </View>
            </SafeAreaView>
          </View>

          <View style={styles.footerOverlay} pointerEvents="box-none">
            <SafeAreaView>
              <View style={styles.footerContent}>
                <View style={styles.infoRow}>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>TYPE</Text>
                    <Text style={styles.infoValue}>
                      {item.type === "top" ? "Top" : "Bottom"}
                    </Text>
                  </View>

                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>PHOTO</Text>
                    <Text style={styles.infoValue}>
                      {currentPhoto?.label ?? "None"}
                    </Text>
                  </View>

                  <View style={[styles.infoBlock, styles.infoBlockLast]}>
                    <Text style={styles.infoLabel}>ITEM ID</Text>
                    <Text numberOfLines={1} style={styles.infoValue}>
                      {item.id}
                    </Text>
                  </View>
                </View>

                {photos.length > 1 && (
                  <View style={styles.photoIndicatorRow}>
                    <Text style={styles.photoCount}>
                      {currentPhotoIndex + 1} of {photos.length}
                    </Text>

                    <View style={styles.dots}>
                      {photos.map((photo, index) => (
                        <View
                          key={photo.key}
                          style={[
                            styles.dot,
                            index === currentPhotoIndex && styles.dotActive,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                )}

                <Text style={styles.footerHint}>
                  Tap photo to hide info
                  {photos.length > 1 ? "  •  Swipe for more photos" : ""}
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </>
      )}
    </View>
  );
}
