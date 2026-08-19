import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

type ProfileProps = {
  firstName: string;
  profilePicture?: ImageSourcePropType;
  onBack: () => void;
  onChangePhoto?: () => void;
  onEditName?: () => void;
};

export default function Profile({
  firstName,
  profilePicture,
  onBack,
  onChangePhoto,
  onEditName,
}: ProfileProps) {
  const displayName = firstName.trim() || "Not set";
  const initial = firstName.trim().charAt(0).toUpperCase() || "?";

  return (
    <ImageBackground
      source={leopardPrintBackground}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.window}>
          <View style={styles.titleBar}>
            <Text numberOfLines={1} style={styles.titleBarText}>
              Cher AI - Profile
            </Text>

            <View style={styles.windowControls}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.windowControlButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.minimizeSymbol}>_</Text>
              </Pressable>

              <View style={styles.windowControlButton}>
                <Text style={styles.maximizeSymbol}>□</Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close profile"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.windowControlButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.closeSymbol}>×</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.menuBar}>
            <Text style={styles.menuItem}>File</Text>
            <Text style={styles.menuItem}>Profile</Text>
            <Text style={styles.menuItem}>Help</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.groupBox}>
              <View style={styles.groupLabelBackground}>
                <Text style={styles.groupLabel}>Profile Picture</Text>
              </View>

              <View style={styles.photoSection}>
                <View style={styles.photoFrame}>
                  {profilePicture ? (
                    <Image
                      source={profilePicture}
                      resizeMode="cover"
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <Text style={styles.photoPlaceholderInitial}>
                        {initial}
                      </Text>
                    </View>
                  )}
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Change profile picture"
                  disabled={!onChangePhoto}
                  onPress={onChangePhoto}
                  style={({ pressed }) => [
                    styles.windowsButton,
                    styles.photoButton,
                    !onChangePhoto && styles.disabledButton,
                    pressed && onChangePhoto && styles.windowsButtonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>Change Photo...</Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.groupBox, styles.infoGroup]}>
              <View style={styles.groupLabelBackground}>
                <Text style={styles.groupLabel}>Personal Information</Text>
              </View>

              <View style={styles.formRow}>
                <Text style={styles.fieldLabel}>First name:</Text>

                <View style={styles.textField}>
                  <Text numberOfLines={1} style={styles.textFieldText}>
                    {displayName}
                  </Text>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit first name"
                disabled={!onEditName}
                onPress={onEditName}
                style={({ pressed }) => [
                  styles.windowsButton,
                  styles.editButton,
                  !onEditName && styles.disabledButton,
                  pressed && onEditName && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Edit Name...</Text>
              </Pressable>
            </View>

            <View style={styles.tipBox}>
              <View style={styles.tipIcon}>
                <Text style={styles.tipIconText}>i</Text>
              </View>

              <Text style={styles.tipText}>
                Your profile picture can be used as your reference image when
                previewing outfits in Cher AI.
              </Text>
            </View>

            <View style={styles.bottomActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close profile"
                onPress={onBack}
                style={({ pressed }) => [
                  styles.windowsButton,
                  styles.closeButton,
                  pressed && styles.windowsButtonPressed,
                ]}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.statusBar}>
            <View style={styles.statusPanel}>
              <Text style={styles.statusText}>User profile</Text>
            </View>

            <View style={styles.statusPanelSmall}>
              <Text style={styles.statusText}>Ready</Text>
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

  safeArea: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  window: {
    flex: 1,
    width: "100%",
    maxWidth: 640,
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

  menuBar: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 8,
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },

  menuItem: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 12,
  },

  groupBox: {
    position: "relative",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 16,
  },

  infoGroup: {
    marginTop: 22,
  },

  groupLabelBackground: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#C0C0C0",
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  photoSection: {
    alignItems: "center",
  },

  photoFrame: {
    width: 150,
    height: 150,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    padding: 3,
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  photoPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D4D0C8",
  },

  photoPlaceholderInitial: {
    color: "#000080",
    fontFamily: WINDOWS_FONT,
    fontSize: 64,
    fontWeight: "700",
  },

  windowsButton: {
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0C0C0",
    borderWidth: 2,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#404040",
    borderBottomColor: "#404040",
    paddingHorizontal: 14,
  },

  windowsButtonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },

  disabledButton: {
    opacity: 0.45,
  },

  photoButton: {
    minWidth: 150,
    marginTop: 12,
  },

  buttonText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  formRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  fieldLabel: {
    width: 78,
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  textField: {
    flex: 1,
    minHeight: 32,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 7,
  },

  textFieldText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  editButton: {
    alignSelf: "flex-end",
    minWidth: 110,
    marginTop: 12,
  },

  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
    paddingHorizontal: 4,
  },

  tipIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000080",
    marginRight: 9,
  },

  tipIconText: {
    color: "#FFFFFF",
    fontFamily: WINDOWS_FONT,
    fontSize: 16,
    fontWeight: "700",
  },

  tipText: {
    flex: 1,
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
    lineHeight: 16,
  },

  bottomActions: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  closeButton: {
    minWidth: 90,
  },

  statusBar: {
    minHeight: 28,
    flexDirection: "row",
    gap: 3,
    backgroundColor: "#C0C0C0",
    padding: 3,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
  },

  statusPanel: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 6,
  },

  statusPanelSmall: {
    width: 72,
    justifyContent: "center",
    borderWidth: 1,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingHorizontal: 6,
  },

  statusText: {
    color: "#000000",
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
  },
});
