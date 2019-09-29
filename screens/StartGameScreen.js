import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import Colors from "../constants/color";
import DefaultStyle from "../constants/defaultStyles";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const enteredValueHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number should be between 1 and 99", [
        { text: "OK", style: "cancel", onPress: resetInputHandler }
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={DefaultStyle.bodyText}>Selected Number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton
          backgroundColor={Colors.accent}
          //onPress={() => props.onStartGame(selectedNumber)}
          onPress={props.onStartGame.bind(this, selectedNumber)}
        >
          START GAME
        </CustomButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="30">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={{ ...DefaultStyle.title, ...styles.title }}>
              Start a new Game
            </Text>
            <Card style={styles.inputContainer}>
              <Text style={DefaultStyle.bodyText}>Select a number</Text>
              <Input
                style={styles.input}
                maxLength={2}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType={"number-pad"}
                value={enteredValue}
                onChangeText={enteredValueHandler}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  style={styles.button}
                  backgroundColor={Colors.accent}
                  onPress={resetInputHandler}
                >
                  RESET
                </CustomButton>
                <CustomButton
                  style={styles.button}
                  onPress={confirmInputHandler}
                >
                  CONFIRM
                </CustomButton>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    height: "100%",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: "40%",
    alignItems: "center",
    marginVertical: 10
  },
  buttonText: {
    color: "white"
  },
  input: {
    width: "30%",
    textAlign: "center"
  },
  summaryContainer: {
    margin: 10,
    alignItems: "center"
  }
});

export default StartGameScreen;
