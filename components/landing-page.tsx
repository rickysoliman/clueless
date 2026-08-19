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
      <StatusBar barStyle="light-content" backgroundColor="#171521" />

      <View style={styles.colorWash} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.monitorFrame}>
          <View style={styles.monitorBezel}>
            <View style={styles.display}>
              <View style={styles.topBar}>
                <Text style={styles.topBarBrand}>DRESS ME</Text>

                <View style={styles.topBarTab}>
                  <Text style={styles.topBarTabText}>WARDROBE ACCESS</Text>
                </View>
              </View>

              <View style={styles.patternArea}>
                <View style={styles.loginPanel}>
                  <View style={styles.panelHeader}>
                    <Text style={styles.panelHeaderText}>
                      YOUR DIGITAL WARDROBE
                    </Text>
                  </View>

                  <View style={styles.panelBody}>
                    <Text style={styles.eyebrow}>WELCOME TO</Text>

                    <Text style={styles.title}>DRESS ME</Text>

                    <View style={styles.divider} />

                    <Text style={styles.subtitle}>
                      BUILD YOUR WARDROBE, CREATE A LOOK, AND PREVIEW IT ON YOU.
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
                  </View>
                </View>
              </View>

              <View style={styles.bottomBar}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.bottomBarText}
                >
                  TOPS · BOTTOMS · OUTFITS · MORE
                </Text>
              </View>

              <Scanlines />
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    backgroundColor: "rgba(55, 34, 20, 0.46)",
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  monitorFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    backgroundColor: "#443A31",
    borderWidth: 5,
    borderTopColor: "#817469",
    borderLeftColor: "#817469",
    borderRightColor: "#211B17",
    borderBottomColor: "#211B17",
    borderRadius: 22,
    padding: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 16,
  },

  monitorBezel: {
    flex: 1,
    backgroundColor: "#27232A",
    borderWidth: 4,
    borderTopColor: "#5B535E",
    borderLeftColor: "#5B535E",
    borderRightColor: "#100E13",
    borderBottomColor: "#100E13",
    borderRadius: 15,
    padding: 7,
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
    backgroundColor: "rgba(188, 154, 111, 0.58)",
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
