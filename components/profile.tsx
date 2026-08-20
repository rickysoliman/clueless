import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { profileStyles as styles } from "../styles/app-styles";

const leopardPrintBackground = require("../assets/images/leopard-print-background.png");

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
