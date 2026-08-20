import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import type { WardrobeItem } from "../assets/dummy-data/dummy-data";
import { itemDetailsStyles as styles } from "../styles/app-styles";

const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 900;

const PHOTO_SWIPE_DISTANCE = 72;
const PHOTO_SWIPE_VELOCITY = 650;

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

  const photos = useMemo(() => getItemPhotos(item), [item]);

  const safeInitialIndex =
    photos.length === 0
      ? 0
      : Math.min(Math.max(initialPhotoIndex, 0), photos.length - 1);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(safeInitialIndex);

  const [controlsVisible, setControlsVisible] = useState(true);

  const currentPhoto = photos[currentPhotoIndex];

  /*
   * Zoom state for the currently selected photo.
   */
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const zoomX = useSharedValue(0);
  const zoomY = useSharedValue(0);

  const savedZoomX = useSharedValue(0);
  const savedZoomY = useSharedValue(0);

  /*
   * Gallery movement.
   *
   * Every photo is rendered in one continuous horizontal strip. We never
   * tear down/rebuild a previous-current-next strip after a swipe, so the
   * incoming image cannot briefly disappear.
   */
  const galleryX = useSharedValue(-safeInitialIndex * width);
  const dismissY = useSharedValue(0);

  useEffect(() => {
    galleryX.value = -currentPhotoIndex * width;
  }, [currentPhotoIndex, galleryX, width]);

  function toggleControls() {
    setControlsVisible((visible) => !visible);
  }

  function finishDismiss() {
    onBack();
  }

  function resetZoom() {
    scale.value = 1;
    savedScale.value = 1;

    zoomX.value = 0;
    zoomY.value = 0;

    savedZoomX.value = 0;
    savedZoomY.value = 0;
  }

  function completePhotoChange(nextIndex: number) {
    setCurrentPhotoIndex(nextIndex);
    resetZoom();
  }

  const currentImageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: zoomX.value },
      { translateY: zoomY.value },
      { scale: scale.value },
    ],
  }));

  const galleryAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: galleryX.value }],
  }));

  const viewerAnimatedStyle = useAnimatedStyle(() => {
    const progress = Math.min(
      Math.max(dismissY.value / Math.max(height * 0.7, 1), 0),
      1
    );

    return {
      opacity: 1 - progress * 0.42,
      transform: [
        { translateY: dismissY.value },
        { scale: 1 - progress * 0.06 },
      ],
    };
  });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
      savedZoomX.value = zoomX.value;
      savedZoomY.value = zoomY.value;

      galleryX.value = -currentPhotoIndex * width;
      dismissY.value = 0;
    })
    .onUpdate((event) => {
      const nextScale = Math.min(
        Math.max(savedScale.value * event.scale, 1),
        MAX_SCALE
      );

      const scaleRatio =
        savedScale.value > 0 ? nextScale / savedScale.value : 1;

      const focalOffsetX = event.focalX - width / 2;
      const focalOffsetY = event.focalY - height / 2;

      scale.value = nextScale;

      zoomX.value = savedZoomX.value + focalOffsetX * (1 - scaleRatio);

      zoomY.value = savedZoomY.value + focalOffsetY * (1 - scaleRatio);
    })
    .onEnd(() => {
      if (scale.value <= 1.02) {
        scale.value = withTiming(1, { duration: 160 });
        zoomX.value = withTiming(0, { duration: 160 });
        zoomY.value = withTiming(0, { duration: 160 });

        savedScale.value = 1;
        savedZoomX.value = 0;
        savedZoomY.value = 0;
        return;
      }

      const maxX = (width * (scale.value - 1)) / 2;
      const maxY = (height * (scale.value - 1)) / 2;

      const boundedX = Math.min(Math.max(zoomX.value, -maxX), maxX);
      const boundedY = Math.min(Math.max(zoomY.value, -maxY), maxY);

      zoomX.value = withSpring(boundedX);
      zoomY.value = withSpring(boundedY);

      savedScale.value = scale.value;
      savedZoomX.value = boundedX;
      savedZoomY.value = boundedY;
    });

  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .minDistance(6)
    .onBegin(() => {
      savedZoomX.value = zoomX.value;
      savedZoomY.value = zoomY.value;
    })
    .onUpdate((event) => {
      /*
       * When zoomed, dragging pans the current photo instead of navigating.
       */
      if (scale.value > 1.02) {
        const maxX = (width * (scale.value - 1)) / 2;
        const maxY = (height * (scale.value - 1)) / 2;

        zoomX.value = Math.min(
          Math.max(savedZoomX.value + event.translationX, -maxX),
          maxX
        );

        zoomY.value = Math.min(
          Math.max(savedZoomY.value + event.translationY, -maxY),
          maxY
        );

        galleryX.value = -currentPhotoIndex * width;
        dismissY.value = 0;
        return;
      }

      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      /*
       * A mostly vertical downward drag controls dismissal.
       */
      if (event.translationY > 0 && absY > absX) {
        dismissY.value = event.translationY;
        galleryX.value = -currentPhotoIndex * width;
        return;
      }

      dismissY.value = 0;

      /*
       * Otherwise slide the complete, continuously rendered gallery.
       */
      const atFirstPhoto = currentPhotoIndex <= 0;
      const atLastPhoto = currentPhotoIndex >= photos.length - 1;

      const swipingTowardPrevious = event.translationX > 0;
      const swipingTowardNext = event.translationX < 0;

      let translationX = event.translationX;

      if (
        (swipingTowardPrevious && atFirstPhoto) ||
        (swipingTowardNext && atLastPhoto)
      ) {
        translationX *= 0.22;
      }

      galleryX.value = -currentPhotoIndex * width + translationX;
    })
    .onEnd((event) => {
      if (scale.value > 1.02) {
        savedZoomX.value = zoomX.value;
        savedZoomY.value = zoomY.value;
        return;
      }

      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      const isDownwardDismiss =
        event.translationY > 0 &&
        absY > absX &&
        (event.translationY > DISMISS_DISTANCE ||
          event.velocityY > DISMISS_VELOCITY);

      if (isDownwardDismiss) {
        galleryX.value = withTiming(-currentPhotoIndex * width, {
          duration: 120,
        });

        dismissY.value = withTiming(height, { duration: 180 }, (finished) => {
          if (finished) {
            scheduleOnRN(finishDismiss);
          }
        });

        return;
      }

      if (dismissY.value > 0) {
        dismissY.value = withSpring(0, {
          damping: 18,
          stiffness: 220,
        });
      }

      const wantsNext =
        event.translationX < -PHOTO_SWIPE_DISTANCE ||
        event.velocityX < -PHOTO_SWIPE_VELOCITY;

      const wantsPrevious =
        event.translationX > PHOTO_SWIPE_DISTANCE ||
        event.velocityX > PHOTO_SWIPE_VELOCITY;

      let targetIndex = currentPhotoIndex;

      if (wantsNext && currentPhotoIndex < photos.length - 1) {
        targetIndex = currentPhotoIndex + 1;
      } else if (wantsPrevious && currentPhotoIndex > 0) {
        targetIndex = currentPhotoIndex - 1;
      }

      galleryX.value = withTiming(
        -targetIndex * width,
        { duration: 190 },
        (finished) => {
          if (finished && targetIndex !== currentPhotoIndex) {
            scheduleOnRN(completePhotoChange, targetIndex);
          }
        }
      );
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(260)
    .maxDuration(250)
    .maxDistance(10)
    .onEnd((event, success) => {
      if (!success) {
        return;
      }

      galleryX.value = -currentPhotoIndex * width;
      dismissY.value = 0;

      if (scale.value > 1.02) {
        scale.value = withTiming(1, { duration: 220 });
        zoomX.value = withTiming(0, { duration: 220 });
        zoomY.value = withTiming(0, { duration: 220 });

        savedScale.value = 1;
        savedZoomX.value = 0;
        savedZoomY.value = 0;
        return;
      }

      const targetScale = DOUBLE_TAP_SCALE;

      const targetX = (width / 2 - event.x) * (targetScale - 1);

      const targetY = (height / 2 - event.y) * (targetScale - 1);

      const maxX = (width * (targetScale - 1)) / 2;
      const maxY = (height * (targetScale - 1)) / 2;

      const boundedX = Math.min(Math.max(targetX, -maxX), maxX);
      const boundedY = Math.min(Math.max(targetY, -maxY), maxY);

      scale.value = withTiming(targetScale, { duration: 220 });
      zoomX.value = withTiming(boundedX, { duration: 220 });
      zoomY.value = withTiming(boundedY, { duration: 220 });

      savedScale.value = targetScale;
      savedZoomX.value = boundedX;
      savedZoomY.value = boundedY;
    });

  const singleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDuration(250)
    .maxDistance(10)
    .onEnd((_event, success) => {
      if (success) {
        scheduleOnRN(toggleControls);
      }
    });

  /*
   * The tap recognizers are exclusive with the one-finger pan. Once the
   * finger actually starts dragging, a swipe can no longer be interpreted
   * as a tap, so changing photos will not hide the header/footer.
   */
  const tapGesture = Gesture.Exclusive(doubleTapGesture, singleTapGesture);

  const oneFingerGesture = Gesture.Exclusive(panGesture, tapGesture);

  const composedGesture = Gesture.Simultaneous(pinchGesture, oneFingerGesture);

  return (
    <GestureHandlerRootView style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.screen, viewerAnimatedStyle]}>
        <GestureDetector gesture={composedGesture}>
          <View
            style={{
              width,
              height,
              overflow: "hidden",
              backgroundColor: "#000000",
            }}
          >
            <Animated.View
              style={[
                {
                  width: width * Math.max(photos.length, 1),
                  height,
                  flexDirection: "row",
                },
                galleryAnimatedStyle,
              ]}
            >
              {photos.length > 0 ? (
                photos.map((photo, index) => (
                  <View
                    key={photo.key}
                    style={{
                      width,
                      height,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#000000",
                    }}
                  >
                    {index === currentPhotoIndex ? (
                      <Animated.View
                        style={[
                          {
                            width,
                            height,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          currentImageAnimatedStyle,
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
                      </Animated.View>
                    ) : (
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
                    )}
                  </View>
                ))
              ) : (
                <View
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
                </View>
              )}
            </Animated.View>
          </View>
        </GestureDetector>

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
                    Tap to hide info • Double-tap or pinch to zoom
                    {photos.length > 1
                      ? "  •  Swipe left/right for photos"
                      : ""}
                    {"  •  Swipe down to close"}
                  </Text>
                </View>
              </SafeAreaView>
            </View>
          </>
        )}
      </Animated.View>
    </GestureHandlerRootView>
  );
}
