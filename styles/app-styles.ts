import { Platform, StyleSheet } from "react-native";

/**
 * Central visual system for Cher AI
 *
 *   import { homePageStyles as styles } from "../styles/app-styles";
 */

export const palette = {
  win98: {
    desktop: "#008080",
    face: "#C0C0C0",
    light: "#FFFFFF",
    mid: "#808080",
    dark: "#404040",
    black: "#000000",
    blue: "#000080",
    maroon: "#800000",
  },
  retro: {
    screen: "#171521",
    frame: "#443A31",
    frameLight: "#817469",
    frameDark: "#211B17",
    bezel: "#27232A",
    bezelLight: "#5B535E",
    bezelDark: "#100E13",
    ink: "#141426",
    inkDark: "#070711",
    periwinkle: "#B9C7FF",
    panel: "#AEBEDB",
    panelLight: "#EDF2FF",
    panelDark: "#30364D",
  },
} as const;

export const WINDOWS_FONT = Platform.select({
  ios: "Arial",
  android: "sans-serif",
  default: "Arial",
});

export const RETRO_FONT = Platform.select({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

const win98Base = {
  background: {
    flex: 1,
    width: "100%" as const,
    height: "100%" as const,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  window: {
    flex: 1,
    width: "100%" as const,
    maxWidth: 640,
    alignSelf: "center" as const,
    position: "relative" as const,
    backgroundColor: palette.win98.face,
    borderWidth: 3,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.black,
    borderBottomColor: palette.win98.black,
    padding: 3,
  },

  titleBar: {
    height: 30,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: palette.win98.blue,
    paddingLeft: 6,
    paddingRight: 3,
  },

  titleBarText: {
    flex: 1,
    color: palette.win98.light,
    fontFamily: WINDOWS_FONT,
    fontSize: 15,
    fontWeight: "700" as const,
  },

  windowControls: {
    flexDirection: "row" as const,
    gap: 2,
  },

  windowControlButton: {
    width: 22,
    height: 22,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
  },

  minimizeSymbol: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    fontWeight: "900" as const,
    lineHeight: 15,
    marginTop: -2,
  },

  maximizeSymbol: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700" as const,
    lineHeight: 15,
  },

  closeSymbol: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 17,
    fontWeight: "700" as const,
    lineHeight: 18,
  },

  menuBar: {
    height: 30,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: palette.win98.face,
    paddingHorizontal: 8,
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.mid,
  },

  menuItem: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  windowsButton: {
    minHeight: 36,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
    paddingHorizontal: 14,
  },

  windowsButtonPressed: {
    borderTopColor: palette.win98.dark,
    borderLeftColor: palette.win98.dark,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  groupBox: {
    position: "relative" as const,
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 16,
  },

  groupLabelBackground: {
    position: "absolute" as const,
    top: -9,
    left: 12,
    backgroundColor: palette.win98.face,
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  statusBar: {
    minHeight: 28,
    flexDirection: "row" as const,
    gap: 3,
    backgroundColor: palette.win98.face,
    padding: 3,
    borderTopWidth: 1,
    borderTopColor: palette.win98.light,
  },

  statusPanel: {
    flex: 1,
    justifyContent: "center" as const,
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 6,
  },

  statusPanelSmall: {
    width: 72,
    justifyContent: "center" as const,
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 6,
  },

  statusText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
  },
};

export const homePageStyles = StyleSheet.create({
  ...win98Base,

  titleBar: {
    ...win98Base.titleBar,
    zIndex: 30,
  },

  menuBar: {
    ...win98Base.menuBar,
    paddingHorizontal: 4,
    gap: 0,
    zIndex: 40,
    overflow: "visible",
  },

  menuItemContainer: {
    position: "relative",
    height: "100%",
    justifyContent: "center",
    marginRight: 2,
    zIndex: 50,
  },

  menuButton: {
    minHeight: 24,
    justifyContent: "center",
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "transparent",
  },

  menuButtonActive: {
    backgroundColor: palette.win98.blue,
    borderColor: palette.win98.blue,
  },

  menuItemActive: {
    color: palette.win98.light,
  },

  dropdownMenu: {
    position: "absolute",
    top: 28,
    left: 0,
    width: 190,
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.black,
    borderBottomColor: palette.win98.black,
    padding: 2,
    zIndex: 100,
    elevation: 20,
  },

  dropdownMenuRight: {
    left: undefined,
    right: 0,
  },

  dropdownItem: {
    minHeight: 28,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  dropdownItemPressed: {
    backgroundColor: palette.win98.blue,
  },

  dropdownItemDisabled: {
    backgroundColor: palette.win98.face,
  },

  dropdownItemText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  dropdownItemTextPressed: {
    color: palette.win98.light,
  },

  dropdownItemTextDisabled: {
    color: palette.win98.mid,
    textShadowColor: palette.win98.light,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  menuSeparator: {
    height: 2,
    marginVertical: 3,
    marginHorizontal: 2,
    borderTopWidth: 1,
    borderTopColor: palette.win98.mid,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.light,
  },

  menuDismissLayer: {
    ...StyleSheet.absoluteFillObject,
    top: 60,
    zIndex: 20,
  },

  scrollView: {
    flex: 1,
    backgroundColor: palette.win98.face,
    zIndex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
  },

  groupBox: {
    ...win98Base.groupBox,
    paddingBottom: 18,
  },

  heroPanelBody: {
    alignItems: "center",
  },

  heroTitle: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  heroDescription: {
    maxWidth: 420,
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    textAlign: "center",
  },

  heroButton: {
    minWidth: 160,
    marginTop: 18,
  },

  buttonText: {
    ...win98Base.buttonText,
    fontSize: 13,
  },

  sectionHeader: {
    marginTop: 18,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.mid,
  },

  sectionHeaderText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  statCard: {
    flex: 1,
    minHeight: 78,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },

  statNumber: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 24,
    fontWeight: "700",
  },

  statLabel: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    marginTop: 3,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  actionButton: {
    flex: 1,
  },

  childPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const profileStyles = StyleSheet.create({
  ...win98Base,

  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 12,
  },

  infoGroup: {
    marginTop: 22,
  },

  photoSection: {
    alignItems: "center",
  },

  photoFrame: {
    width: 150,
    height: 150,
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
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
    color: palette.win98.blue,
    fontFamily: WINDOWS_FONT,
    fontSize: 64,
    fontWeight: "700",
  },

  photoButton: {
    minWidth: 150,
    marginTop: 12,
  },

  formRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  fieldLabel: {
    width: 78,
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  textField: {
    flex: 1,
    minHeight: 32,
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 7,
  },

  textFieldText: {
    color: palette.win98.black,
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
    backgroundColor: palette.win98.blue,
    marginRight: 9,
  },

  tipIconText: {
    color: palette.win98.light,
    fontFamily: WINDOWS_FONT,
    fontSize: 16,
    fontWeight: "700",
  },

  tipText: {
    flex: 1,
    color: palette.win98.black,
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
});

export const browseClosetStyles = StyleSheet.create({
  ...win98Base,

  statusPanelSmall: {
    ...win98Base.statusPanelSmall,
    width: 82,
  },

  toolbar: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    backgroundColor: palette.win98.face,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.mid,
  },

  toolbarLabel: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
    marginRight: 2,
  },

  filterButton: {
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
    paddingHorizontal: 10,
  },

  filterButtonActive: {
    backgroundColor: palette.win98.blue,
    borderTopColor: palette.win98.dark,
    borderLeftColor: palette.win98.dark,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
  },

  filterButtonText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
  },

  filterButtonTextActive: {
    color: palette.win98.light,
  },

  selectionStrip: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: palette.win98.face,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.mid,
  },

  selectionSummary: {
    flex: 1,
  },

  selectionSummaryText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
    lineHeight: 16,
  },

  smallWindowsButton: {
    minWidth: 58,
    minHeight: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
    paddingHorizontal: 8,
  },

  smallButtonText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
  },

  gridContainer: {
    flex: 1,
    minHeight: 0,
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    marginHorizontal: 8,
    marginTop: 8,
  },

  gridContent: {
    padding: 5,
    paddingBottom: 10,
  },

  gridRow: {
    justifyContent: "space-between",
  },

  itemCell: {
    width: "49%",
    marginBottom: 6,
  },

  itemCellPressed: {
    opacity: 0.82,
  },

  thumbnailFrame: {
    overflow: "hidden",
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
  },

  thumbnailFrameSelected: {
    borderTopColor: palette.win98.blue,
    borderLeftColor: palette.win98.blue,
    borderRightColor: palette.win98.blue,
    borderBottomColor: palette.win98.blue,
  },

  itemTitleBar: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.win98.face,
    paddingLeft: 5,
    paddingRight: 3,
  },

  itemTitleBarSelected: {
    backgroundColor: palette.win98.blue,
  },

  itemTitle: {
    flex: 1,
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
    fontWeight: "700",
  },

  itemTitleSelected: {
    color: palette.win98.light,
  },

  selectionBox: {
    width: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
  },

  selectionBoxSelected: {
    backgroundColor: palette.win98.light,
  },

  selectionCheck: {
    color: palette.win98.blue,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 14,
  },

  imageWell: {
    aspectRatio: 0.95,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    borderTopWidth: 1,
    borderTopColor: palette.win98.mid,
    borderBottomWidth: 1,
    borderBottomColor: palette.win98.light,
  },

  itemImage: {
    width: "100%",
    height: "100%",
  },

  itemFooter: {
    height: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.face,
  },

  itemType: {
    color: palette.win98.dark,
    fontFamily: WINDOWS_FONT,
    fontSize: 9,
    fontWeight: "700",
  },

  emptyState: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  emptyStateText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    textAlign: "center",
  },

  buildBar: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: palette.win98.face,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: palette.win98.light,
  },

  buildBarCopy: {
    flex: 1,
  },

  buildBarTitle: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    fontWeight: "700",
  },

  buildBarHint: {
    color: palette.win98.dark,
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
    marginTop: 3,
  },

  buildButton: {
    minWidth: 124,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
    paddingHorizontal: 10,
  },

  buildButtonText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
    fontWeight: "700",
  },
});

export const buildOutfitStyles = StyleSheet.create({
  ...win98Base,

  statusPanelSmall: {
    ...win98Base.statusPanelSmall,
    width: 76,
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },

  carouselStack: {
    flex: 1,
    minHeight: 0,
  },

  carouselGap: {
    height: 10,
  },

  actionRow: {
    height: 42,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  windowsButton: {
    ...win98Base.windowsButton,
    paddingHorizontal: 12,
  },

  buttonText: {
    ...win98Base.buttonText,
    fontSize: 13,
  },

  actionButton: {
    flex: 1,
  },

  resultGroup: {
    flex: 1,
    minHeight: 0,
    position: "relative",
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    padding: 10,
  },

  resultBody: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    padding: 12,
  },

  resultStatus: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },

  resultHint: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 7,
    textAlign: "center",
  },

  errorMessage: {
    color: palette.win98.maroon,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },

  generatedImage: {
    width: "100%",
    height: "100%",
    backgroundColor: palette.win98.light,
  },
});

export const carouselStyles = StyleSheet.create({
  groupBox: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    position: "relative",
    backgroundColor: palette.win98.face,
    borderWidth: 1,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 8,
  },

  groupLabelBackground: {
    position: "absolute",
    top: -9,
    left: 10,
    zIndex: 2,
    backgroundColor: palette.win98.face,
    paddingHorizontal: 4,
  },

  groupLabel: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
  },

  innerPanel: {
    flex: 1,
    minHeight: 0,
  },

  itemBar: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.win98.blue,
    paddingHorizontal: 7,
  },

  itemName: {
    flex: 1,
    color: palette.win98.light,
    fontFamily: WINDOWS_FONT,
    fontSize: 11,
    fontWeight: "700",
  },

  counter: {
    color: palette.win98.light,
    fontFamily: WINDOWS_FONT,
    fontSize: 10,
    marginLeft: 8,
  },

  imageWindow: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: palette.win98.light,
    borderWidth: 2,
    borderTopColor: palette.win98.mid,
    borderLeftColor: palette.win98.mid,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "88%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.light,
    paddingHorizontal: 12,
  },

  placeholderName: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 12,
    textAlign: "center",
  },

  controls: {
    height: 38,
    flexDirection: "row",
    gap: 6,
    backgroundColor: palette.win98.face,
    paddingTop: 5,
  },

  controlButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.win98.face,
    borderWidth: 2,
    borderTopColor: palette.win98.light,
    borderLeftColor: palette.win98.light,
    borderRightColor: palette.win98.dark,
    borderBottomColor: palette.win98.dark,
  },

  controlText: {
    color: palette.win98.black,
    fontFamily: WINDOWS_FONT,
    fontSize: 13,
    fontWeight: "700",
  },

  playText: {
    color: palette.win98.black,
    fontSize: 12,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonPressed: {
    borderTopColor: palette.win98.dark,
    borderLeftColor: palette.win98.dark,
    borderRightColor: palette.win98.light,
    borderBottomColor: palette.win98.light,
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});

export const landingPageStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    overflow: "hidden",
  },

  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.22 }],
  },

  patternArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

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

  windowsButtonPressed: {
    borderTopColor: "#404040",
    borderLeftColor: "#404040",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
});
