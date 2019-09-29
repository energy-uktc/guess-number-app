import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyle from "../constants/defaultStyles";
import screenMeasures from "../constants/dimensions";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (dimensions, listLength, itemData) => (
  <View
    style={{
      ...styles.listItem,
      marginVertical: dimensions.short ? 5 : 10,
      padding: dimensions.short ? 10 : 15
    }}
  >
    <Text style={DefaultStyle.bodyText}>#{listLength - itemData.index}</Text>
    <Text style={DefaultStyle.bodyText}>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 99, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [dimensions, setDimensions] = useState(screenMeasures());

  const currentLow = useRef(1);
  const currentMax = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const orientationUpdatedHandler = () => {
    setDimensions(screenMeasures());
  };

  useEffect(() => {
    Dimensions.addEventListener("change", orientationUpdatedHandler);
    return () => {
      Dimensions.removeEventListener("change", orientationUpdatedHandler);
    };
  });

  const nextGuessHandler = direction => {
    if (currentGuess === userChoice) {
      return;
    }

    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "grater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }

    if (direction === "lower") {
      currentMax.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current + 1,
      currentMax.current - 1,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    // setRounds(currRounds => currRounds + 1);
    setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
  };
  let gameControls = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginTop: dimensions.short ? 5 : 20
        }}
      >
        <CustomButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "grater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </Card>
    </React.Fragment>
  );
  if (dimensions.height < 500) {
    gameControls = (
      <View style={styles.landscapeGameControls}>
        <CustomButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <CustomButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "grater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.bodyText}>Opponent's Guess</Text>
      {gameControls}
      <View style={styles.list}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, dimensions, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  landscapeGameControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop: dimensions.short ? 5 : 20,
    width: 300,
    maxWidth: "80%"
  },
  button: {
    width: "35%",
    borderRadius: 20
  },
  list: {
    flex: 1,
    width: "80%"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1
    //marginVertical: dimensions.short ? 5 : 10,
    //padding: dimensions.short ? 10 : 15
  }
});

export default GameScreen;
