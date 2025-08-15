import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";

const CATEGORIES = ["한식", "양식", "일식", "중식"];

export default function CategoryScreen() {
  const [selected, setSelected] = useState<string | null>("한식");

  return (
    <Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelected(category)}
          >
            <Category selected={selected === category}>
              <CategoryText selected={selected === category}>
                {category}
              </CategoryText>
            </Category>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  padding: 10px;
`;

interface CategoryProps {
  selected: boolean;
}

const Category = styled.View<CategoryProps>`
  border: 1px solid
    ${({ selected }: { selected: boolean }) => (selected ? "#007AFF" : "#ccc")};
  background-color: ${({ selected }: { selected: boolean }) =>
    selected ? "#007AFF" : "white"};
  border-radius: 20px;
  padding: 10px 16px;
  margin-right: 8px;
`;

const CategoryText = styled.Text<CategoryProps>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? "white" : "black"};
  font-weight: 500;
`;
