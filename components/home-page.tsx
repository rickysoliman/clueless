import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const retroFont =
  Platform.select({
    ios: "Courier New",
    android: "monospace",
    default: "monospace",
  }) ?? "monospace";

const scanlines = Array.from({ length: 80 });
const leopardRows = Array.from({ length: 15 });

const verticalPlaidLines = [16, 34, 52, 70, 88];
const horizontalPlaidLines = [18, 37, 56, 75];

type HomePageProps = {
  onLogOut: () => void;
  onBuildOutfit?: () => void;
  onAddClothing?: () => void;
  userName?: string;
};

type GarmentPreviewProps = {
  category: string;
  itemName: string;
  kind: "top" | "bottom";
};

function Scanlines() {
  return (
    <View pointerEvents="none" style={styles.scanlines}>
      {scanlines.map((_, index) => (
        <View
          key={index}
          style={[
            styles.scanline,
            {
              top: index * 14,
            },
          ]}
        />
      ))}
    </View>
  );
}

function LeopardPanel({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <View style={styles.leopardPanel}>
      {leopardRows.map((_, index) => {
        const wideSpot = index % 3 === 0;
        const horizontalPosition = index % 2 === 0 ? 5 : 18;

        return (
          <View
            key={index}
            style={[
              styles.leopardSpot,
              {
                top: index * 45 + 7,
                left: mirrored ? undefined : horizontalPosition,
                right: mirrored ? horizontalPosition : undefined,
                width: wideSpot ? 34 : 25,
                height: wideSpot ? 23 : 29,
              },
            ]}
          >
            <View style={styles.leopardSpotCenter} />
          </View>
        );
      })}
    </View>
  );
}

function GarmentPreview({ category, itemName, kind }: GarmentPreviewProps) {
  return (
    <View style={styles.garmentWindow}>
      <View style={styles.garmentWindowHeader}>
        <Text style={styles.garmentWindowHeaderText}>{category}</Text>
      </View>

      <View style={styles.previewSurface}>
        <View
          style={[
            styles.garment,
            kind === "top" ? styles.topGarment : styles.bottomGarment,
          ]}
        >
          {verticalPlaidLines.map((position) => (
            <View
              key={`vertical-${position}`}
              style={[
                styles.plaidVerticalLine,
                {
                  left: position,
                },
              ]}
            />
          ))}

          {horizontalPlaidLines.map((position) => (
            <View
              key={`horizontal-${position}`}
              style={[
                styles.plaidHorizontalLine,
                {
                  top: position,
                },
              ]}
            />
          ))}

          {kind === "top" && <View style={styles.neckCutout} />}
        </View>

        <Text style={styles.garmentName}>{itemName}</Text>
      </View>
    </View>
  );
}

function CarouselControls() {
  return (
    <View style={styles.controlBar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous wardrobe item"
        onPress={() => undefined}
        style={({ pressed }) => [
          styles.controlButton,
          pressed && styles.controlButtonPressed,
        ]}
      >
        <Text style={styles.controlButtonText}>{"<<"}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select wardrobe item"
        onPress={() => undefined}
        style={({ pressed }) => [
          styles.controlButton,
          pressed && styles.controlButtonPressed,
        ]}
      >
        <Text style={styles.controlButtonText}>{">"}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next wardrobe item"
        onPress={() => undefined}
        style={({ pressed }) => [
          styles.controlButton,
          pressed && styles.controlButtonPressed,
        ]}
      >
        <Text style={styles.controlButtonText}>{">>"}</Text>
      </Pressable>
    </View>
  );
}

export default function HomePage({
  onLogOut,
  onBuildOutfit = () => undefined,
  onAddClothing = () => undefined,
  userName = "SUZIN",
}: HomePageProps) {
  const wardrobeTitle = `${userName.toUpperCase()}'S WARDROBE`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />

      <View style={styles.outerFrame}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {wardrobeTitle}
          </Text>

          <View style={styles.modePlate}>
            <Text style={styles.modePlateText}>FALL/FASHION</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log out"
            onPress={onLogOut}
            style={({ pressed }) => [
              styles.exitButton,
              pressed && styles.controlButtonPressed,
            ]}
          >
            <Text style={styles.exitButtonText}>EXIT</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.wardrobeStage}>
            <LeopardPanel />

            <View style={styles.carouselColumn}>
              <GarmentPreview
                category="TOPS"
                itemName="BLACK PLAID VEST"
                kind="top"
              />

              <CarouselControls />

              <GarmentPreview
                category="BOTTOMS"
                itemName="PLAID MINI SKIRT"
                kind="bottom"
              />

              <CarouselControls />
            </View>

            <LeopardPanel mirrored />
          </View>

          <View style={styles.actionRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Browse wardrobe"
              onPress={onAddClothing}
              style={({ pressed }) => [
                styles.actionButton,
                styles.browseButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.browseButtonText}>BROWSE</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Generate dressed image"
              onPress={onBuildOutfit}
              style={({ pressed }) => [
                styles.actionButton,
                styles.dressMeButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.dressMeButtonText}>DRESS{"\n"}ME</Text>
            </Pressable>
          </View>

          <View style={styles.statusPanel}>
            <Text style={styles.statusLabel}>CURRENT SELECTION</Text>
            <Text style={styles.statusValue}>
              BLACK PLAID VEST + PLAID MINI SKIRT
            </Text>
          </View>
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryBar}
          contentContainerStyle={styles.categoryBarContent}
        >
          <Text style={styles.categoryText}>SHOES</Text>
          <Text style={styles.categoryText}>JEWELRY</Text>
          <Text style={styles.categoryText}>SCARVES</Text>
          <Text style={styles.categoryText}>PANTYHOSE</Text>
          <Text style={styles.categoryText}>UNDERWEAR</Text>
          <Text style={styles.categoryText}>PANTS</Text>
          <Text style={styles.categoryText}>SWEATERS</Text>
          <Text style={styles.categoryText}>MORE</Text>
        </ScrollView>

        <Scanlines />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#7E6C5D",
  },

  outerFrame: {
    flex: 1,
    margin: 6,
    overflow: "hidden",
    backgroundColor: "#171526",
    borderWidth: 5,
    borderTopColor: "#DCCFC3",
    borderLeftColor: "#DCCFC3",
    borderRightColor: "#433A34",
    borderBottomColor: "#433A34",
  },

  header: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101020",
    borderBottomWidth: 4,
    borderBottomColor: "#4F4A69",
    paddingHorizontal: 8,
  },

  headerTitle: {
    flex: 1,
    color: "#C9CCFF",
    fontFamily: retroFont,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  modePlate: {
    backgroundColor: "#19182D",
    borderWidth: 2,
    borderTopColor: "#777896",
    borderLeftColor: "#777896",
    borderRightColor: "#05050D",
    borderBottomColor: "#05050D",
    marginHorizontal: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  modePlateText: {
    color: "#D0D1FF",
    fontFamily: retroFont,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  exitButton: {
    backgroundColor: "#A9A5AF",
    borderWidth: 3,
    borderTopColor: "#F3EEF5",
    borderLeftColor: "#F3EEF5",
    borderRightColor: "#403B44",
    borderBottomColor: "#403B44",
    paddingHorizontal: 7,
    paddingVertical: 5,
  },

  exitButtonText: {
    color: "#17131C",
    fontFamily: retroFont,
    fontSize: 9,
    fontWeight: "900",
  },

  content: {
    paddingBottom: 20,
  },

  wardrobeStage: {
    minHeight: 630,
    flexDirection: "row",
    backgroundColor: "#C2B08D",
    borderBottomWidth: 4,
    borderBottomColor: "#403746",
  },

  leopardPanel: {
    width: 52,
    overflow: "hidden",
    backgroundColor: "#C7B18A",
    borderColor: "#78634E",
    borderWidth: 2,
  },

  leopardSpot: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B292A",
    borderRadius: 16,
  },

  leopardSpotCenter: {
    width: "46%",
    height: "46%",
    backgroundColor: "#A86454",
    borderRadius: 10,
  },

  carouselColumn: {
    flex: 1,
    backgroundColor: "#27243A",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#554F6F",
    paddingHorizontal: 5,
    paddingVertical: 7,
  },

  garmentWindow: {
    backgroundColor: "#9DA7D2",
    borderWidth: 4,
    borderTopColor: "#DDE2FF",
    borderLeftColor: "#DDE2FF",
    borderRightColor: "#444763",
    borderBottomColor: "#444763",
  },

  garmentWindowHeader: {
    alignItems: "center",
    backgroundColor: "#17172A",
    borderBottomWidth: 3,
    borderBottomColor: "#4D4B67",
    paddingVertical: 6,
  },

  garmentWindowHeaderText: {
    color: "#D1D3FF",
    fontFamily: retroFont,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  previewSurface: {
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C5CDEE",
    paddingTop: 15,
  },

  garment: {
    overflow: "hidden",
    backgroundColor: "#291522",
    borderWidth: 3,
    borderColor: "#110B12",
  },

  topGarment: {
    width: 116,
    height: 96,
  },

  bottomGarment: {
    width: 110,
    height: 102,
  },

  plaidVerticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "rgba(136, 86, 105, 0.75)",
  },

  plaidHorizontalLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(117, 75, 95, 0.72)",
  },

  neckCutout: {
    position: "absolute",
    top: -4,
    left: 39,
    width: 32,
    height: 20,
    backgroundColor: "#C5CDEE",
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#110B12",
  },

  garmentName: {
    color: "#28243A",
    fontFamily: retroFont,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginTop: 14,
    textAlign: "center",
  },

  controlBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B192A",
    borderWidth: 3,
    borderTopColor: "#514D68",
    borderLeftColor: "#514D68",
    borderRightColor: "#06060D",
    borderBottomColor: "#06060D",
    paddingHorizontal: 5,
  },

  controlButton: {
    flex: 1,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AAA7B4",
    borderWidth: 3,
    borderTopColor: "#ECE8F0",
    borderLeftColor: "#ECE8F0",
    borderRightColor: "#403B47",
    borderBottomColor: "#403B47",
    marginHorizontal: 4,
  },

  controlButtonText: {
    color: "#1E1A27",
    fontFamily: retroFont,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -2,
    textShadowColor: "#F1ECF4",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  controlButtonPressed: {
    opacity: 0.75,
    transform: [
      {
        translateX: 1,
      },
      {
        translateY: 1,
      },
    ],
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#1A1827",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  actionButton: {
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    paddingHorizontal: 14,
  },

  browseButton: {
    flex: 1.15,
    backgroundColor: "#313CFF",
    borderTopColor: "#A9AEFF",
    borderLeftColor: "#A9AEFF",
    borderRightColor: "#11145F",
    borderBottomColor: "#11145F",
    marginRight: 10,
  },

  dressMeButton: {
    flex: 0.85,
    backgroundColor: "#AAA7B1",
    borderTopColor: "#EEEAF0",
    borderLeftColor: "#EEEAF0",
    borderRightColor: "#423D46",
    borderBottomColor: "#423D46",
  },

  browseButtonText: {
    color: "#FFFFFF",
    fontFamily: retroFont,
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 1.5,
    textShadowColor: "#11145A",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  dressMeButtonText: {
    color: "#211C28",
    fontFamily: retroFont,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 18,
    textAlign: "center",
    textShadowColor: "#F2EEF4",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [
      {
        translateX: 2,
      },
      {
        translateY: 2,
      },
    ],
  },

  statusPanel: {
    backgroundColor: "#0F0E1C",
    borderWidth: 4,
    borderTopColor: "#4D4963",
    borderLeftColor: "#4D4963",
    borderRightColor: "#05050B",
    borderBottomColor: "#05050B",
    marginHorizontal: 18,
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  statusLabel: {
    color: "#8188C4",
    fontFamily: retroFont,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  statusValue: {
    color: "#D7D9F5",
    fontFamily: retroFont,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 6,
  },

  categoryBar: {
    flexGrow: 0,
    minHeight: 46,
    backgroundColor: "#101020",
    borderTopWidth: 4,
    borderTopColor: "#4E4966",
  },

  categoryBarContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  categoryText: {
    color: "#C9CAEC",
    fontFamily: retroFont,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginHorizontal: 10,
    paddingVertical: 14,
  },

  scanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.72,
  },

  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(190, 198, 255, 0.07)",
  },
});
