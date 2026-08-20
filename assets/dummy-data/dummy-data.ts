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
  // TOPS

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
    id: "top-004",
    name: "Pink Cardigan",
    type: "top",

    referencePhotos: {
      front: require("../images/pink-cardigan.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/pink-cardigan.jpeg"),
    },
  },

  {
    id: "top-005",
    name: "Striped Long Sleeve",
    type: "top",

    referencePhotos: {
      front: require("../images/striped-long-sleeve.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/striped-long-sleeve.jpeg"),
    },
  },

  {
    id: "top-006",
    name: "Spaghetti Strap Top",
    type: "top",

    referencePhotos: {
      front: require("../images/spaghetti-strap.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/spaghetti-strap.jpeg"),
    },
  },

  // BOTTOMS

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

  {
    id: "bottom-003",
    name: "Blue Jeans",
    type: "bottom",

    referencePhotos: {
      front: require("../images/blue-jeans.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/blue-jeans.jpeg"),
    },
  },

  {
    id: "bottom-004",
    name: "Plaid Skirt",
    type: "bottom",

    referencePhotos: {
      front: require("../images/plaid-skirt.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/plaid-skirt.jpeg"),
    },
  },

  {
    id: "bottom-005",
    name: "Lululemon Tights",
    type: "bottom",

    referencePhotos: {
      front: require("../images/lululemon-tights.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/lululemon-tights.jpeg"),
    },
  },

  {
    id: "bottom-006",
    name: "Denim Shorts",
    type: "bottom",

    referencePhotos: {
      front: require("../images/denim-shorts.jpeg"),
    },

    catalogPhotos: {
      front: require("../images/denim-shorts.jpeg"),
    },
  },
];
