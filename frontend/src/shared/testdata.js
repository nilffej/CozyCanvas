export const findFurnitureAttributes = (furnitureName) => {
  return FURNITUREITEMS.filter((item) => item.name === furnitureName)[0];
};

export const FURNITUREITEMS = [
];

export const TESTDATA = [
  {
    category: "Bookcases",
    items: [
      {
        name: "BILLY",
        x: 2.5,
        y: 1,
        price: 69.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/billy-bookcase-white__0625599_pe692385_s5.jpg?f=xl"
      },
      {
        name: "EKENABBEN",
        x: 2.5,
        y: 1,
        price: 49.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/ekenabben-open-shelf-unit-aspen-white__1029426_pe835815_s5.jpg?f=xl"
      },
      {
        name: "KALLAX",
        x: 2.5,
        y: 1.5,
        price: 159.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-with-4-inserts-white__0754627_pe747994_s5.jpg?f=xl"
      }
    ]
  },
  {
    category: "Chairs",
    items: [
      {
        name: "STRANDMON",
        x: 2.5,
        y: 3,
        price: 299.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/strandmon-wing-chair-nordvalla-dark-gray__0325432_pe517964_s5.jpg?f=xl"
      },
      {
        name: "POANG",
        x: 2,
        y: 3,
        price: 219.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/poaeng-armchair-brown-gunnared-beige__1192128_pe900849_s5.jpg?f=xl"
      },
    ]
  },
  {
    category: "Dressers",
    items: [
      {
        name: "HEMNES",
        x: 3.5,
        y: 1.5,
        price: 349.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/hemnes-6-drawer-chest-white-stain__0152648_pe310999_s5.jpg?f=xl"
      },
      {
        name: "HUAGA",
        x: 4.5,
        y: 3,
        price: 279.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/hauga-6-drawer-dresser-white__0898785_pe782651_s5.jpg?f=xl"
      },
      {
        name: "KOPPANG",
        x: 5.5,
        y: 2.5,
        price: 259.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/koppang-6-drawer-dresser-white__0651639_pe706984_s5.jpg?f=xl"
      },
    ]
  },
  {
    category: "Sofas",
    items: [
      {
        name: "FRIHETEN",
        x: 4.5,
        y: 7.0,
        price: 899.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/friheten-sleeper-sectional-3-seat-w-storage-skiftebo-dark-gray__0175610_pe328883_s5.jpg?f=xl"
      },
      {
        name: "LINANAS",
        x: 2.5,
        y: 6.5,
        price: 299.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/linanaes-sofa-vissle-dark-gray__1013898_pe829450_s5.jpg?f=xl"
      },
      {
        name: "UPPLAND",
        x: 7.5,
        y: 3,
        price: 849.00,
        imgSrc: "https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0818565_pe774487_s5.jpg?f=xl"
      },
    ]
  },
  {
    category: "Tables",
    items: [
      {
        name: "LACK",
        x: 2,
        y: 2,
        price: 12.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/lack-side-table-black-brown__57544_pe163126_s5.jpg?f=xl"
      },
      {
        name: "LAGKAPTEN / ALEX",
        x: 6.5,
        y: 3.5,
        price: 164.98,
        imgSrc: "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1022428_pe832716_s5.jpg?f=xl"
      },
      {
        name: "LINNMON / ADILS",
        x: 3.5,
        y: 2,
        price: 54.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/linnmon-adils-table-white__0737165_pe740925_s5.jpg?f=xl"
      },
      {
        name: "MALM",
        x: 4,
        y: 1.5,
        price: 169.99,
        imgSrc: "https://www.ikea.com/us/en/images/products/malm-dressing-table-white__0805994_pe769781_s5.jpg?f=xl"
      },
    ]
  },
];