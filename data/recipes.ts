/* // src/data/recipes.ts

import { ImageSourcePropType } from "react-native";

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  category: string;
  image: ImageSourcePropType;
}

// 예시 데이터
export const recipes: Recipe[] = [
  // 한식
  {
    id: "1",
    name: "김치찌개",
    description: "한국의 대표적인 찌개로, 매운 맛과 깊은 국물 맛이 특징입니다.",
    ingredients: [
      { name: "김치", amount: "200g" },
      { name: "돼지고기", amount: "150g" },
      { name: "두부", amount: "1/2모" },
      { name: "양파", amount: "1/2개" },
      { name: "대파", amount: "1대" },
    ],
    instructions: [
      "돼지고기를 썰어 팬에 볶습니다.",
      "김치를 넣고 함께 볶습니다.",
      "물과 두부를 넣고 끓입니다.",
      "양파와 대파를 썰어 넣고 끓여서 완성합니다.",
    ],
    category: "한식",
    image: require("../assets/kimchi.png"),
  },
  {
    id: "2",
    name: "불고기",
    description:
      "달콤하고 짭짤한 양념에 재운 고기를 구워 먹는 한국의 전통 음식입니다.",
    ingredients: [
      { name: "소고기", amount: "200g" },
      { name: "양파", amount: "1/2개" },
      { name: "간장", amount: "3큰술" },
      { name: "설탕", amount: "1큰술" },
      { name: "마늘", amount: "1쪽" },
    ],
    instructions: [
      "소고기를 얇게 썬 후 양념에 재웁니다.",
      "양파를 채썰어 고기와 함께 볶습니다.",
      "고기가 익을 때까지 구워서 완성합니다.",
    ],
    category: "한식",
    image: require("../assets/bulgo.png"),
  },
  {
    id: "3",
    name: "비빔밥",
    description: "다양한 나물과 고기를 비벼서 먹는 한 그릇 음식입니다.",
    ingredients: [
      { name: "밥", amount: "1공기" },
      { name: "시금치", amount: "50g" },
      { name: "고추장", amount: "2큰술" },
      { name: "계란", amount: "1개" },
      { name: "소고기", amount: "50g" },
    ],
    instructions: [
      "시금치는 데쳐서 나물로 준비합니다.",
      "소고기는 간장에 양념하여 볶습니다.",
      "계란은 프라이팬에 볶고, 나머지 재료들과 함께 밥에 비벼 먹습니다.",
    ],
    image: require("../assets/bibim.png"),
    category: "한식",
  },

  // 중식
  {
    id: "4",
    name: "짜장면",
    description:
      "중국의 대표적인 면 요리로, 검은 콩장과 고기를 볶은 소스가 특징입니다.",
    ingredients: [
      { name: "짜장면 면", amount: "1인분" },
      { name: "돼지고기", amount: "100g" },
      { name: "양파", amount: "1/2개" },
      { name: "호박", amount: "1/2개" },
      { name: "짜장소스", amount: "3큰술" },
    ],
    instructions: [
      "돼지고기와 양파, 호박을 볶습니다.",
      "짜장소스를 넣고 볶은 재료들과 잘 섞습니다.",
      "면을 삶아 소스를 부어 완성합니다.",
    ],
    category: "중식",
    image: require("../assets/jjajang.png"),
  },
  {
    id: "5",
    name: "마파두부",
    description: "매운 두부 요리로, 중국에서 유래한 인기 있는 반찬입니다.",
    ingredients: [
      { name: "두부", amount: "200g" },
      { name: "다진 돼지고기", amount: "100g" },
      { name: "고추장", amount: "1큰술" },
      { name: "마늘", amount: "1쪽" },
      { name: "대파", amount: "1대" },
    ],
    instructions: [
      "다진 돼지고기를 볶다가 마늘과 고추장을 넣습니다.",
      "두부를 넣고 함께 볶은 후 물을 추가하여 끓입니다.",
      "대파를 썰어 넣고 간을 맞춘 후 완성합니다.",
    ],
    category: "중식",
    image: require("../assets/mapa.png"),
  },
  {
    id: "6",
    name: "탕수육",
    description:
      "바삭하게 튀긴 돼지고기와 새콤달콤한 소스가 어우러진 요리입니다.",
    ingredients: [
      { name: "돼지고기", amount: "200g" },
      { name: "전분", amount: "2큰술" },
      { name: "식초", amount: "1큰술" },
      { name: "설탕", amount: "1큰술" },
      { name: "케첩", amount: "2큰술" },
    ],
    instructions: [
      "돼지고기를 얇게 썰고 전분을 묻혀 튀깁니다.",
      "소스 재료를 섞어 끓여서 튀긴 돼지고기에 부어 완성합니다.",
    ],
    category: "중식",
    image: require("../assets/tangsu.png"),
  },

  // 양식
  {
    id: "7",
    name: "스파게티",
    description: "이탈리아의 대표적인 면 요리로, 다양한 소스를 얹어 먹습니다.",
    ingredients: [
      { name: "스파게티 면", amount: "1인분" },
      { name: "토마토 소스", amount: "1컵" },
      { name: "마늘", amount: "1쪽" },
      { name: "올리브 오일", amount: "1큰술" },
      { name: "파마산 치즈", amount: "약간" },
    ],
    instructions: [
      "스파게티 면을 삶고, 마늘을 올리브 오일에 볶습니다.",
      "토마토 소스를 넣고 끓인 후 면에 부어 완성합니다.",
      "파마산 치즈를 올려서 마무리합니다.",
    ],
    category: "양식",
    image: require("../assets/spa.png"),
  },
  {
    id: "8",
    name: "피자",
    description:
      "이탈리아의 대표적인 음식으로, 다양한 토핑과 치즈가 특징입니다.",
    ingredients: [
      { name: "피자 도우", amount: "1개" },
      { name: "토마토 소스", amount: "1컵" },
      { name: "치즈", amount: "1컵" },
      { name: "베이컨", amount: "50g" },
      { name: "올리브", amount: "10개" },
    ],
    instructions: [
      "피자 도우에 토마토 소스를 바르고 치즈와 토핑을 올립니다.",
      "오븐에 구워서 완성합니다.",
    ],
    category: "양식",
    image: require("../assets/pizza.png"),
  },
  {
    id: "9",
    name: "리조또",
    description:
      "이탈리아의 크리미한 쌀 요리로, 다양한 재료로 변화를 줄 수 있습니다.",
    ingredients: [
      { name: "리조또 쌀", amount: "1컵" },
      { name: "버터", amount: "1큰술" },
      { name: "양파", amount: "1/2개" },
      { name: "치킨 스톡", amount: "1컵" },
      { name: "파마산 치즈", amount: "약간" },
    ],
    instructions: [
      "양파를 볶다가 리조또 쌀을 넣고 섞습니다.",
      "치킨 스톡을 넣고 쌀이 익을 때까지 끓입니다.",
      "버터와 치즈를 넣고 섞어 완성합니다.",
    ],
    category: "양식",
    image: require("../assets/rijo.png"),
  },

  // 일식
  {
    id: "10",
    name: "초밥",
    description:
      "일본의 전통적인 요리로, 신선한 생선과 밥을 결합한 요리입니다.",
    ingredients: [
      { name: "초밥용 밥", amount: "1공기" },
      { name: "연어", amount: "100g" },
      { name: "간장", amount: "2큰술" },
      { name: "와사비", amount: "약간" },
    ],
    instructions: [
      "초밥용 밥을 준비하고, 연어를 얇게 썰어 올립니다.",
      "간장과 와사비를 곁들여 먹습니다.",
    ],
    category: "일식",
    image: require("../assets/chobab.png"),
  },
  {
    id: "11",
    name: "돈까스",
    description:
      "일본식 튀김 요리로, 바삭한 튀김옷과 부드러운 고기가 특징입니다.",
    ingredients: [
      { name: "돼지고기", amount: "200g" },
      { name: "빵가루", amount: "적당량" },
      { name: "달걀", amount: "1개" },
      { name: "밀가루", amount: "적당량" },
      { name: "소스", amount: "적당량" },
    ],
    instructions: [
      "돼지고기를 밀가루, 달걀, 빵가루 순으로 묻혀 튀깁니다.",
      "돈까스 소스를 뿌려 완성합니다.",
    ],
    category: "일식",
    image: require("../assets/donga.png"),
  },
  {
    id: "12",
    name: "우동",
    description:
      "일본의 대표적인 면 요리로, 두꺼운 면발과 진한 국물이 특징입니다.",
    ingredients: [
      { name: "우동 면", amount: "1인분" },
      { name: "국물", amount: "1컵" },
      { name: "파", amount: "1대" },
      { name: "고기", amount: "50g" },
    ],
    instructions: [
      "우동 면을 삶고, 국물과 함께 끓입니다.",
      "고기와 파를 넣고 끓여서 완성합니다.",
    ],
    category: "일식",
    image: require("../assets/udong.png"),
  },
];
 */
