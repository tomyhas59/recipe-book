// src/data/recipes.ts

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

// 예시 데이터
export const recipes: Recipe[] = [
  {
    id: 1,
    name: "김치찌개",
    description: "한국의 대표적인 찌개로, 매운 맛과 깊은 국물 맛이 특징입니다.",
    ingredients: ["김치", "돼지고기", "두부", "양파", "대파"],
    instructions: [
      "돼지고기를 썰어 팬에 볶습니다.",
      "김치를 넣고 함께 볶습니다.",
      "물과 두부를 넣고 끓입니다.",
      "양파와 대파를 썰어 넣고 끓여서 완성합니다.",
    ],
  },
  {
    id: 2,
    name: "불고기",
    description:
      "달콤하고 짭짤한 양념에 재운 고기를 구워 먹는 한국의 전통 음식입니다.",
    ingredients: ["소고기", "양파", "간장", "설탕", "마늘"],
    instructions: [
      "소고기를 얇게 썬 후 양념에 재웁니다.",
      "양파를 채썰어 고기와 함께 볶습니다.",
      "고기가 익을 때까지 구워서 완성합니다.",
    ],
  },
  {
    id: 3,
    name: "비빔밥",
    description: "다양한 나물과 고기를 비벼서 먹는 한 그릇 음식입니다.",
    ingredients: ["밥", "시금치", "고추장", "계란", "소고기"],
    instructions: [
      "시금치는 데쳐서 나물로 준비합니다.",
      "소고기는 간장에 양념하여 볶습니다.",
      "계란은 프라이팬에 볶고, 나머지 재료들과 함께 밥에 비벼 먹습니다.",
    ],
  },
  {
    id: 4,
    name: "된장찌개",
    description: "된장으로 만든 한국 전통 찌개로, 구수한 맛이 일품입니다.",
    ingredients: ["된장", "두부", "호박", "대파", "양파"],
    instructions: [
      "된장과 물을 섞어 끓입니다.",
      "두부와 호박을 넣고 끓입니다.",
      "양파와 대파를 넣고 다시 끓여서 완성합니다.",
    ],
  },
];
