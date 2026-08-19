export type WardrobeItemType = "top" | "bottom";

export type WardrobePhotos = {
  front: string;
  back?: string;
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
      front: "white-button-down-reference-front.jpg",
      back: "white-button-down-reference-back.jpg",
    },
    catalogPhotos: {
      front: "white-button-down-catalog-front.png",
      back: "white-button-down-catalog-back.png",
    },
  },
  {
    id: "top-002",
    name: "Black T-Shirt",
    type: "top",
    referencePhotos: {
      front: "black-tshirt-reference-front.jpg",
    },
    catalogPhotos: {
      front: "black-tshirt-catalog-front.png",
      back: "black-tshirt-catalog-back.png",
    },
  },
  {
    id: "top-003",
    name: "Blue Sweater",
    type: "top",
    referencePhotos: {
      front: "blue-sweater-reference-front.jpg",
      back: "blue-sweater-reference-back.jpg",
    },
    catalogPhotos: {
      front: "blue-sweater-catalog-front.png",
      back: "blue-sweater-catalog-back.png",
    },
  },
  {
    id: "bottom-001",
    name: "Black Jeans",
    type: "bottom",
    referencePhotos: {
      front: "black-jeans-reference-front.jpg",
      back: "black-jeans-reference-back.jpg",
    },
    catalogPhotos: {
      front: "black-jeans-catalog-front.png",
      back: "black-jeans-catalog-back.png",
    },
  },
  {
    id: "bottom-002",
    name: "Khaki Pants",
    type: "bottom",
    referencePhotos: {
      front: "khaki-pants-reference-front.jpg",
      back: "khaki-pants-reference-back.jpg",
    },
    catalogPhotos: {
      front: "khaki-pants-catalog-front.png",
      back: "khaki-pants-catalog-back.png",
    },
  },
];
