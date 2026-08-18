import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type HomePageProps = {
  onLogOut: () => void;
  onBuildOutfit?: () => void;
  onAddClothing?: () => void;
};

export default function HomePage({
  onLogOut,
  onBuildOutfit = () => undefined,
  onAddClothing = () => undefined,
}: HomePageProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#080B14" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>DRESS ME</Text>
            <Text style={styles.heading}>Your closet</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log out"
            onPress={onLogOut}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.logoutButtonText}>Log out</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>TODAY&apos;S LOOK</Text>

          <Text style={styles.heroTitle}>Ready to get dressed?</Text>

          <Text style={styles.heroDescription}>
            Browse your wardrobe, choose a top and bottom, and preview the
            finished outfit.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Build an outfit"
            onPress={onBuildOutfit}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Build an Outfit</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Wardrobe</Text>
          <Text style={styles.sectionSubtitle}>Your current collection</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tops</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Bottoms</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add clothing"
          onPress={onAddClothing}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <View style={styles.addButtonTextContainer}>
            <Text style={styles.addButtonTitle}>Add Clothing</Text>
            <Text style={styles.addButtonSubtitle}>
              Upload a new top or bottom
            </Text>
          </View>
          <Text style={styles.addButtonArrow}>›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080B14",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  brand: {
    color: "#72A1FF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 5,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  logoutButton: {
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  heroCard: {
    backgroundColor: "#15244A",
    borderColor: "rgba(94, 145, 255, 0.45)",
    borderRadius: 26,
    borderWidth: 1,
    padding: 24,
    shadowColor: "#2369FF",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },

  heroEyebrow: {
    color: "#8EB2FF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 12,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 34,
  },

  heroDescription: {
    color: "#CED8ED",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 24,
  },

  primaryButton: {
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 20,
  },

  primaryButtonText: {
    color: "#0B1020",
    fontSize: 16,
    fontWeight: "800",
  },

  sectionHeader: {
    marginTop: 34,
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#8893A8",
    fontSize: 14,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111725",
    borderColor: "#222B3C",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 20,
  },

  statNumber: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  statLabel: {
    color: "#9AA5B8",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },

  addButton: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111725",
    borderColor: "#222B3C",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  addButtonIcon: {
    width: 42,
    height: 42,
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 39,
    textAlign: "center",
    backgroundColor: "#2469FF",
    borderRadius: 21,
    overflow: "hidden",
  },

  addButtonTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  addButtonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  addButtonSubtitle: {
    color: "#929EB3",
    fontSize: 13,
    marginTop: 4,
  },

  addButtonArrow: {
    color: "#8390A5",
    fontSize: 30,
    fontWeight: "300",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
