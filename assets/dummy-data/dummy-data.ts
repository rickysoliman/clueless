import type { ImageSourcePropType } from "react-native";

export type WardrobeItemType = "top" | "bottom";

export type WardrobePhotos = {
  front: ImageSourcePropType;
  back?: ImageSourcePropType;
};

export type WardrobeItem = {
  id: string;
  name: string;
  type: WardrobeItemType;
  referencePhotos: WardrobePhotos;
  catalogPhotos: WardrobePhotos;
};

export const dummyData: WardrobeItem[] = [
  {
    id: "top-001",
    name: "White Button Down",
    type: "top",

    referencePhotos: {
      front: require("../images/white-button-down.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/white-button-down.jpeg"),
    },
  },

  {
    id: "top-002",
    name: "Black T-Shirt",
    type: "top",

    referencePhotos: {
      front: require("../images/black-t-shirt.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/black-t-shirt.jpeg"),
    },
  },

  {
    id: "top-003",
    name: "Blue Sweater",
    type: "top",

    referencePhotos: {
      front: require("../images/blue-sweater.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/blue-sweater.jpeg"),
    },
  },

  {
    id: "bottom-001",
    name: "Black Jeans",
    type: "bottom",

    referencePhotos: {
      front: require("../images/black-jeans.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/black-jeans.jpeg"),
    },
  },

  {
    id: "bottom-002",
    name: "Khaki Pants",
    type: "bottom",

    referencePhotos: {
      front: require("../images/khaki-pants.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/khaki-pants.jpeg"),
    },
  },
];
