/*
 * image 컴포넌트에 경로지정할때, static한 변수만 사용해야해서
 * imagesSource.js에 const 변수를 따로 만들고 JSON array에 포함시키는 방법을 택했다.
 */
export const IMAGES = {
  0: require('../config/images/agricultural_products/food_crops/rice_640.jpg'),
  1: require('../config/images/agricultural_products/food_crops/adzuki_beans_640.jpg'),
  2: require('../config/images/agricultural_products/food_crops/soybean_640.jpg'),
  3: require('../config/images/agricultural_products/food_crops/bean_sprouts_640.jpg'),
  4: require('../config/images/agricultural_products/food_crops/adzuki_beans_640.jpg'),
  5: require('../config/images/agricultural_products/food_crops/mung_beans_640.jpg'),
  6: require('../config/images/agricultural_products/food_crops/buckwheat_640.png'),
  7: require('../config/images/agricultural_products/food_crops/sweetpotato_640.jpg'),
  8: require('../config/images/agricultural_products/food_crops/chestnuts_640.jpg'),
  9: require('../config/images/agricultural_products/food_crops/potatoe_640.jpg'),
};
export const food_crops = [
  { //  쌀, IMAGES[0]
    "name": "rice",
    "img": IMAGES,
  },
  { //  찹쌀, IMAGES[1]
    "name": "glutinous_rice",
    "img": IMAGES,
  },
  {  //  1개로 백태 국산, 백태 수입 구분하기, IMAGES[2]
    "name": "soybean",
    "img": IMAGES,
  },
  {  //  콩나물콩, IMAGES[3]
    "name": "beansprouts",
    "img": IMAGES,
  },
  { //  1개로 국산 팥, 수입 팥 구분하기, IMAGES[4]
    "name": "adzuki_beans",
    "img": IMAGES,
  },
  { //  1개로 국산 녹두, 수입 녹두 구분하기, IMAGES[5]
    "name": "mung_beans",
    "img": IMAGES,
  },
  {  //  메밀 수입산, IMAGES[6]
    "name": "buckwheat",
    "img": IMAGES,
  },
  { //  고구마, IMAGES[7]
    "name": "sweet_potato",
    "img": IMAGES,
  },
  {  // 밤, IMAGES[8]
    "name": "chestnut",
    "img": IMAGES,
  },
  {  // 1개로 수미, 대지마 구분하기, IMAGES[9]
    "name": "potato",
    "img": IMAGES,
  },
];
