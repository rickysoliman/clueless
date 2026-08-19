import type { ImageSourcePropType } from "react-native";

export type DummyProfileData = {
  firstName: string;
  profilePicture: ImageSourcePropType;
};

export const dummyProfileData: DummyProfileData = {
  firstName: "Suzin",
  profilePicture: require("../images/suzin-profile.jpg"),
};
