import { useVideoPlayer, VideoView } from "expo-video";
import { Pressable, Text, View } from "react-native";
import { landingPageStyles as styles } from "../styles/app-styles";

const screensaverVideo = require("../assets/videos/screensaver-loop.mp4");

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
