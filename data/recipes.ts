import { Recipe } from "../types/type";

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "김치찌개",
    description: "한국의 대표적인 찌개로, 매운 맛과 깊은 국물 맛이 특징입니다.",
    category: "한식",
    image: "/assets/kimchi.png",
    ingredients: [
      { id: 1, name: "김치", amount: "200g" },
      { id: 2, name: "돼지고기", amount: "150g" },
      { id: 3, name: "두부", amount: "1/2모" },
      { id: 4, name: "양파", amount: "1/2개" },
      { id: 5, name: "대파", amount: "1대" },
    ],
    instructions: [
      { id: 1, stepNumber: 1, description: "돼지고기를 썰어 팬에 볶습니다." },
      { id: 2, stepNumber: 2, description: "김치를 넣고 함께 볶습니다." },
      { id: 3, stepNumber: 3, description: "물과 두부를 넣고 끓입니다." },
      {
        id: 4,
        stepNumber: 4,
        description: "양파와 대파를 넣고 끓여서 완성합니다.",
      },
    ],
  },
  {
    id: 2,
    name: "불고기",
    description:
      "달콤하고 짭짤한 양념에 재운 고기를 구워 먹는 한국의 전통 음식입니다.",
    category: "한식",
    image: "/assets/bulgo.png",
    ingredients: [
      { id: 1, name: "소고기", amount: "200g" },
      { id: 2, name: "양파", amount: "1/2개" },
      { id: 3, name: "간장", amount: "3큰술" },
      { id: 4, name: "설탕", amount: "1큰술" },
      { id: 5, name: "마늘", amount: "1쪽" },
    ],
    instructions: [
      {
        id: 1,
        stepNumber: 1,
        description: "소고기를 얇게 썬 후 양념에 재웁니다.",
      },
      {
        id: 2,
        stepNumber: 2,
        description: "양파를 채썰어 고기와 함께 볶습니다.",
      },
      {
        id: 3,
        stepNumber: 3,
        description: "고기가 익을 때까지 구워서 완성합니다.",
      },
    ],
  },
  {
    id: 3,
    name: "비빔밥",
    description: "다양한 나물과 고기를 비벼서 먹는 한 그릇 음식입니다.",
    category: "한식",
    image: "/assets/bibim.png",
    ingredients: [
      { id: 1, name: "밥", amount: "1공기" },
      { id: 2, name: "시금치", amount: "50g" },
      { id: 3, name: "고추장", amount: "2큰술" },
      { id: 4, name: "계란", amount: "1개" },
      { id: 5, name: "소고기", amount: "50g" },
    ],
    instructions: [
      {
        id: 1,
        stepNumber: 1,
        description: "시금치는 데쳐서 나물로 준비합니다.",
      },
      {
        id: 2,
        stepNumber: 2,
        description: "소고기는 간장에 양념하여 볶습니다.",
      },
      {
        id: 3,
        stepNumber: 3,
        description:
          "계란을 프라이팬에 볶고, 나머지 재료들과 함께 밥에 비벼 먹습니다.",
      },
    ],
  },
];
