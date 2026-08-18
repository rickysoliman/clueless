import {
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const landingPageBackground = require("../assets/images/landing-page-background.png");

const retroFont =
  Platform.select({
    ios: "Courier New",
    android: "monospace",
    default: "monospace",
  }) ?? "monospace";

const scanlines = Array.from({ length: 70 });

type LandingPageProps = {
  onLogIn: () => void;
  onCreateAccount: () => void;
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

export default function LandingPage({
  onLogIn,
  onCreateAccount,
}: LandingPageProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />

      <View style={styles.outerFrame}>
        <View style={styles.titleBar}>
          <Text style={styles.titleBarText}>DRESS ME</Text>

          <View style={styles.titleBarBadge}>
            <Text style={styles.titleBarBadgeText}>WARDROBE SYSTEM</Text>
          </View>
        </View>

        <ImageBackground
          source={landingPageBackground}
          resizeMode="cover"
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.backgroundOverlay} />

          <View style={styles.content}>
            <View style={styles.loginWindow}>
              <View style={styles.windowTitleBar}>
                <Text style={styles.windowTitle}>ACCESS WARDROBE</Text>
              </View>

              <View style={styles.windowBody}>
                <Text style={styles.eyebrow}>YOUR DIGITAL WARDROBE</Text>

                <Text style={styles.title}>DRESS ME</Text>

                <View style={styles.divider} />

                <Text style={styles.subtitle}>
                  BUILD YOUR CLOSET, SELECT AN OUTFIT, AND SEE THE FINISHED
                  LOOK.
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Log in"
                    onPress={onLogIn}
                    style={({ pressed }) => [
                      styles.retroButton,
                      styles.primaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>LOG IN</Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Create an account"
                    onPress={onCreateAccount}
                    style={({ pressed }) => [
                      styles.retroButton,
                      styles.secondaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.secondaryButtonText}>
                      CREATE ACCOUNT
                    </Text>
                  </Pressable>
                </View>

                <Text style={styles.systemMessage}>
                  SELECT AN OPTION TO CONTINUE
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.categoryBar}>
            <Text style={styles.categoryText}>TOPS</Text>
            <Text style={styles.categoryText}>BOTTOMS</Text>
            <Text style={styles.categoryText}>SHOES</Text>
            <Text style={styles.categoryText}>JEWELRY</Text>
            <Text style={styles.categoryText}>MORE</Text>
          </View>

          <Scanlines />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#857464",
  },

  outerFrame: {
    flex: 1,
    margin: 6,
    overflow: "hidden",
    backgroundColor: "#B9AA9D",
    borderWidth: 5,
    borderTopColor: "#E5D9CE",
    borderLeftColor: "#E5D9CE",
    borderRightColor: "#4C413A",
    borderBottomColor: "#4C413A",
  },

  titleBar: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0E1021",
    borderBottomWidth: 4,
    borderBottomColor: "#4A4569",
    paddingHorizontal: 10,
  },

  titleBarText: {
    color: "#C9CEFF",
    fontFamily: retroFont,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2.5,
  },

  titleBarBadge: {
    backgroundColor: "#18172B",
    borderWidth: 2,
    borderTopColor: "#77789A",
    borderLeftColor: "#77789A",
    borderRightColor: "#05050D",
    borderBottomColor: "#05050D",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  titleBarBadgeText: {
    color: "#D2D3FF",
    fontFamily: retroFont,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  background: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.82,
  },

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(4, 5, 16, 0.38)",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 28,
  },

  loginWindow: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#AFA8B6",
    borderWidth: 5,
    borderTopColor: "#E6E0EA",
    borderLeftColor: "#E6E0EA",
    borderRightColor: "#413A49",
    borderBottomColor: "#413A49",
  },

  windowTitleBar: {
    alignItems: "center",
    backgroundColor: "#17152A",
    borderBottomWidth: 3,
    borderBottomColor: "#4D4866",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  windowTitle: {
    color: "#C8CBFF",
    fontFamily: retroFont,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },

  windowBody: {
    alignItems: "center",
    backgroundColor: "rgba(7, 7, 18, 0.92)",
    borderWidth: 3,
    borderTopColor: "#4B465E",
    borderLeftColor: "#4B465E",
    borderRightColor: "#08070E",
    borderBottomColor: "#08070E",
    paddingHorizontal: 22,
    paddingVertical: 28,
  },

  eyebrow: {
    color: "#AEB7FF",
    fontFamily: retroFont,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    textAlign: "center",
  },

  title: {
    color: "#E7E8FF",
    fontFamily: retroFont,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 4,
    marginTop: 12,
    textAlign: "center",
    textShadowColor: "#344BFF",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 0,
  },

  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#555172",
    borderBottomWidth: 1,
    borderBottomColor: "#05050B",
    marginVertical: 20,
  },

  subtitle: {
    color: "#D3D5EB",
    fontFamily: retroFont,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },

  actions: {
    width: "100%",
    marginTop: 28,
  },

  retroButton: {
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    paddingHorizontal: 18,
  },

  primaryButton: {
    backgroundColor: "#313CFF",
    borderTopColor: "#A8AEFF",
    borderLeftColor: "#A8AEFF",
    borderRightColor: "#11145B",
    borderBottomColor: "#11145B",
  },

  secondaryButton: {
    backgroundColor: "#B3AFBA",
    borderTopColor: "#F0ECF2",
    borderLeftColor: "#F0ECF2",
    borderRightColor: "#4B4650",
    borderBottomColor: "#4B4650",
    marginTop: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: retroFont,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    textShadowColor: "#090A40",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  secondaryButtonText: {
    color: "#17131D",
    fontFamily: retroFont,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.5,
    textShadowColor: "#FFFFFF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  systemMessage: {
    color: "#7F86B6",
    fontFamily: retroFont,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginTop: 18,
    textAlign: "center",
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [
      {
        translateX: 2,
      },
      {
        translateY: 2,
      },
    ],
  },

  categoryBar: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101020",
    borderTopWidth: 4,
    borderTopColor: "#474361",
    paddingHorizontal: 4,
  },

  categoryText: {
    flex: 1,
    color: "#C8CAEF",
    fontFamily: retroFont,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
    textAlign: "center",
  },

  scanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
  },

  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(187, 197, 255, 0.07)",
  },
});
