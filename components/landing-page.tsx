import { useVideoPlayer, VideoView } from "expo-video";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const screensaverVideo = require("../assets/videos/screensaver-loop.mp4");

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
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
        <View style={styles.window}>
          <View style={styles.titleBar}>
            <Text numberOfLines={1} style={styles.titleBarText}>
              Cher AI
            </Text>

            <View style={styles.windowControls}>
              <View style={styles.windowControlButton}>
                <Text style={styles.minimizeSymbol}>_</Text>
              </View>

              <View style={styles.windowControlButton}>
                <Text style={styles.maximizeSymbol}>□</Text>
              </View>

              <View style={styles.windowControlButton}>
                <Text style={styles.closeSymbol}>×</Text>
              </View>
            </View>
          </View>

          <View style={styles.windowBody}>
            <Text style={styles.welcomeText}>Welcome to</Text>

            <Text style={styles.appTitle}>CHER AI</Text>

            <View style={styles.separator} />

            <Text style={styles.subtitle}>
              Your very own digital wardrobe where you can mix, match, and look{" "}
              <Text style={styles.emphasis}>FABULOUS!</Text>
              {"\n"}
              Obviously!
            </Text>

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Log in"
                onPress={onLogIn}
                style={({ pressed }) => [
                  styles.windowsButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Create an account"
                onPress={onCreateAccount}
                style={({ pressed }) => [
                  styles.windowsButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Create Account</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  /*
   * Classic Windows 98 outer dialog frame.
   *
   * Bright top/left borders + dark bottom/right borders
   * create the raised 3D appearance.
   */
  window: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",

    backgroundColor: "#C0C0C0",

    borderWidth: 3,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#000000",
    borderBottomColor: "#000000",

    padding: 3,
  },

  titleBar: {
    height: 30,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#000080",

    paddingLeft: 6,
    paddingRight: 3,
  },

  titleBarText: {
    flex: 1,

    color: "#FFFFFF",

    fontFamily: WINDOWS_FONT,
    fontSize: 15,
    fontWeight: "700",
  },

  windowControls: {
    flexDirection: "row",
    gap: 2,
  },

  windowControlButton: {
    width: 22,
    height: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#C0C0C0",

    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
  },

  minimizeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 15,
    marginTop: -2,
  },

  maximizeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },

  closeSymbol: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 18,
  },

  windowBody: {
    alignItems: "center",

    backgroundColor: "#C0C0C0",

    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 22,
  },

  welcomeText: {
    color: "#000000",

    fontFamily: WINDOWS_FONT,
    fontSize: 13,

    textAlign: "center",
  },

  appTitle: {
    color: "#000000",

    fontFamily: WINDOWS_FONT,
    fontSize: 34,
    fontWeight: "700",

    marginTop: 7,

    textAlign: "center",
  },

  /*
   * Mimics an inset Windows 98 separator.
   */
  separator: {
    width: "90%",
    height: 2,

    marginTop: 18,
    marginBottom: 18,

    borderTopWidth: 1,
    borderTopColor: "#808080",

    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },

  subtitle: {
    maxWidth: 310,

    color: "#000000",

    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    lineHeight: 21,

    textAlign: "center",
  },

  emphasis: {
    fontWeight: "700",
  },

  actions: {
    width: "100%",

    flexDirection: "row",

    gap: 12,

    marginTop: 28,
  },

  /*
   * Classic raised Windows button.
   */
  windowsButton: {
    flex: 1,

    minHeight: 38,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#C0C0C0",

    borderWidth: 2,

    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",

    borderRightColor: "#404040",
    borderBottomColor: "#404040",

    paddingHorizontal: 8,
  },

  buttonText: {
    color: "#000000",

    fontFamily: WINDOWS_FONT,
    fontSize: 13,
  },

  /*
   * Simulates the button physically depressing.
   */
  windowsButtonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",

    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",

    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
