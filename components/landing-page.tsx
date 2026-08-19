import { useVideoPlayer, VideoView } from "expo-video";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const screensaverVideo = require("../assets/videos/screensaver-loop.mp4");

const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

type LandingPageProps = {
  onLogIn: () => void;
  onCreateAccount: () => void;
};

export default function LandingPage({
  onLogIn,
  onCreateAccount,
}: LandingPageProps) {
  const player = useVideoPlayer(screensaverVideo, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View style={styles.screen}>
      <VideoView
        player={player}
        nativeControls={false}
        contentFit="cover"
        style={styles.backgroundVideo}
      />

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
              <Text style={styles.emphasis}>FABULOUS!</Text> OBVIOUSLY!
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    overflow: "hidden",
  },

  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,

    // contentFit="cover" already crops the landscape video to the
    // portrait phone screen. This extra zoom removes more of the
    // monitor frame from the top/bottom of the original footage.
    transform: [{ scale: 1.22 }],
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
    lineHeight: 22,
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

  buttonPressed: {
    opacity: 0.86,
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
});
