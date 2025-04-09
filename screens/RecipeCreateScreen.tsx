import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

type Props = {
  navigation: any;
};

const RecipeCreateScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // 레시피 저장 로직 추가 예정
    console.log({ title, description });
    navigation.goBack(); // 작성 완료 후 뒤로 가기
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="레시피 제목"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="레시피 설명"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{ height: 100, marginBottom: 12, borderWidth: 1 }}
      />
      <Button title="등록하기" onPress={handleSubmit} />
    </View>
  );
};

export default RecipeCreateScreen;
