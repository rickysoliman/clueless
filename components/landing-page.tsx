import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const landingPageBackground = require("../assets/images/landing-page-background.png");

const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

const SCANLINES = Array.from({ length: 42 });

type LandingPageProps = {
  onLogIn: () => void;
  onCreateAccount: () => void;
};

function Scanlines() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.scanlineLayer}
    >
      {SCANLINES.map((_, index) => (
        <View key={index} style={styles.scanline} />
      ))}
    </View>
  );
}

export default function LandingPage({
  onLogIn,
  onCreateAccount,
}: LandingPageProps) {
  return (
    <ImageBackground
      source={landingPageBackground}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.patternArea}>
        <View style={styles.loginPanel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelHeaderText}>YOUR DIGITAL WARDROBE</Text>
          </View>

          <View style={styles.panelBody}>
            <Text style={styles.eyebrow}>WELCOME TO</Text>

            <Text style={styles.title}>CHER AI</Text>

            <View style={styles.divider} />

            <Text style={styles.subtitle}>
              MIX, MATCH, AND LOOK{" "}
              <Text style={styles.emphasis}>FABULOUS!</Text>
              OBVIOUSLY!
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
                <Text style={styles.secondaryButtonText}>CREATE ACCOUNT</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  backgroundImage: {
    opacity: 0.92,
  },

  colorWash: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  display: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#B59B76",
    borderWidth: 3,
    borderColor: "#0B0B13",
    borderRadius: 9,
  },

  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141426",
    borderBottomWidth: 4,
    borderBottomColor: "#070711",
    paddingHorizontal: 10,
    zIndex: 2,
  },

  topBarBrand: {
    flex: 1,
    color: "#B9C7FF",
    fontFamily: RETRO_FONT,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2.2,
    textShadowColor: "#536CFF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },

  topBarTab: {
    backgroundColor: "#1A1A2E",
    borderWidth: 2,
    borderTopColor: "#8992C2",
    borderLeftColor: "#8992C2",
    borderRightColor: "#080810",
    borderBottomColor: "#080810",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  topBarTabText: {
    color: "#CED5FF",
    fontFamily: RETRO_FONT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
  },

  patternArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 20,
    zIndex: 2,
  },

  loginPanel: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: "#AEBEDB",
    borderWidth: 5,
    borderTopColor: "#EDF2FF",
    borderLeftColor: "#EDF2FF",
    borderRightColor: "#30364D",
    borderBottomColor: "#30364D",
    shadowColor: "#090914",
    shadowOffset: {
      width: 7,
      height: 8,
    },
    shadowOpacity: 0.65,
    shadowRadius: 0,
    elevation: 12,
  },

  panelHeader: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18182A",
    borderBottomWidth: 4,
    borderBottomColor: "#4B5270",
    paddingHorizontal: 12,
  },

  panelHeaderText: {
    color: "#D5DAFF",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.7,
    textAlign: "center",
    textShadowColor: "#5068FF",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 4,
  },

  panelBody: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },

  eyebrow: {
    color: "#34384E",
    fontFamily: RETRO_FONT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.5,
    textAlign: "center",
  },

  title: {
    color: "#161725",
    fontFamily: RETRO_FONT,
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 4,
    marginTop: 8,
    textAlign: "center",
    textShadowColor: "#F2F5FF",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  divider: {
    width: "76%",
    height: 4,
    backgroundColor: "#3C425D",
    borderTopWidth: 1,
    borderTopColor: "#F0F4FF",
    marginTop: 16,
    marginBottom: 17,
  },

  subtitle: {
    maxWidth: 380,
    color: "#25283A",
    fontFamily: RETRO_FONT,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: 0.7,
    textAlign: "center",
  },

  emphasis: {
    fontSize: 20,
    fontWeight: "900",
  },

  actions: {
    width: "100%",
    maxWidth: 340,
    marginTop: 24,
  },

  retroButton: {
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderTopColor: "#F5F4FF",
    borderLeftColor: "#F5F4FF",
    borderRightColor: "#151521",
    borderBottomColor: "#151521",
    borderRadius: 2,
    paddingHorizontal: 18,
    shadowColor: "#171723",
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 0,
    elevation: 7,
  },

  primaryButton: {
    backgroundColor: "#293CE0",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: RETRO_FONT,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 2,
    textShadowColor: "#111228",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 0,
  },

  secondaryButton: {
    backgroundColor: "#AAA9B3",
    marginTop: 13,
  },

  secondaryButtonText: {
    color: "#171721",
    fontFamily: RETRO_FONT,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.2,
    textShadowColor: "#ECECF4",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 0,
  },

  bottomBar: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141426",
    borderTopWidth: 4,
    borderTopColor: "#070711",
    paddingHorizontal: 10,
    zIndex: 2,
  },

  bottomBarText: {
    width: "100%",
    color: "#C3CAFA",
    fontFamily: RETRO_FONT,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textAlign: "center",
  },

  scanlineLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    zIndex: 10,
  },

  scanline: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(14, 16, 39, 0.1)",
  },

  buttonPressed: {
    opacity: 0.86,
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
});
