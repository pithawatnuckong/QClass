import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import SwitchSelector from "react-native-switch-selector";

import { theme, color } from "../../assets/theme/Theme";
import Choice from "../../components/Choice";
import AddChoiceButton from "../../components/button/AddChoiceButton";
import PrimaryButton from "../../components/button/PrimaryButton";
import { createSurvey } from "../../controller/QuizController";

export default (props) => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [choices, setChoices] = useState([
    {
      title: "",
      isDeletable: false,
      isCorrect: false,
    },
    {
      title: "",
      isDeletable: false,
      isCorrect: false,
    },
  ]);

  const addChoiceHandler = () => {
    var newChoices = choices
    newChoices.push({
      title: "",
      isDeletable: true,
      isCorrect: false,
    })
    setChoices([...newChoices])
  };

  const titleChangeHandler = (newTitle, index) => {
    const newChoices = choices;
    newChoices[index].title = newTitle;
    setChoices([...newChoices]);
  };

  const deleteHandler = (index) => {
    var newChoices = choices;
    newChoices.splice(index, 1);
    setChoices([...newChoices]);
  };
  const startHandler = () => {
    try {
      var newSurvey = createSurvey(surveyTitle, choices)
      console.log(newSurvey);
    } catch (error){
      console.log("Error :  ", error.message);
    }
    // props.onStart({
    //   type: "survey",
    //   survey: {},
    // });
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.base2 }}>
      <View style={[theme.container]}>
        <Text style={theme.textLabel}>TITLE</Text>
        <TextInput
          style={theme.textInput}
          maxLength={60}
          placeholderTextColor={color.base3}
          placeholder="Survey title"
          value={surveyTitle}
          onChangeText={(text) => {
            setSurveyTitle(text);
          }}
        />
        <Text style={[theme.textLabel, { marginTop: 8 }]}>CHOICE</Text>
        <View style={{ marginBottom: 48 }}>
          {choices.map((choice, index) => {
            return (
              <Choice
                key={index}
                isDeletable={choice.isDeletable}
                index={index}
                onSetCorrect={() => {
                  // do nothing
                }}
                onDelete={(index) => {
                  deleteHandler(index);
                }}
                onTitleChange={(newTitle) => {
                  titleChangeHandler(newTitle, index);
                }}
              />
            );
          })}
          <AddChoiceButton onAddChoice={addChoiceHandler} />
        </View>
      </View>
      <View style={theme.tabBarContainer}>
        <View style={theme.tabBar}>
          <PrimaryButton title={"Start Survey"} onPress={startHandler} />
        </View>
      </View>
    </View>
  );
};
