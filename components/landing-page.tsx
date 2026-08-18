import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const landingPageBackground = require("../assets/images/landing-page-background.png");

type LandingPageProps = {
  onLogIn: () => void;
  onCreateAccount: () => void;
};

export default function LandingPage({
  onLogIn,
  onCreateAccount,
}: LandingPageProps) {
  return (
    <ImageBackground
      source={landingPageBackground}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.headingContainer}>
            <Text style={styles.eyebrow}>YOUR DIGITAL WARDROBE</Text>

            <Text style={styles.title}>Dress Me</Text>

            <Text style={styles.subtitle}>
              Build your wardrobe, create the perfect outfit, and see yourself
              wearing it.
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Log in"
              onPress={onLogIn}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Log In</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create an account"
              onPress={onCreateAccount}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </Pressable>
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

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.42)",
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },

  headingContainer: {
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
  },

  eyebrow: {
    color: "#D9E5FF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 16,
    textAlign: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor: "rgba(36, 105, 255, 0.9)",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 14,
  },

  subtitle: {
    color: "#F1F4FF",
    fontSize: 17,
    lineHeight: 25,
    marginTop: 18,
    maxWidth: 420,
    textAlign: "center",
  },

  actions: {
    width: "100%",
    maxWidth: 380,
  },

  primaryButton: {
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 24,
  },

  primaryButtonText: {
    color: "#0B0F1C",
    fontSize: 17,
    fontWeight: "700",
  },

  secondaryButton: {
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 999,
    borderWidth: 1.5,
    marginTop: 14,
    paddingHorizontal: 24,
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
