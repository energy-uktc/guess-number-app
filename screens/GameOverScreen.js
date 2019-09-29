import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import CustomButton from "../components/CustomButton";
import DefaultStyle from "../constants/defaultStyles";
import Color from "../constants/color";
import screenMeasures from "../constants/dimensions";

const GameOverScreen = props => {
  const [dimensions, setDimensions] = useState(screenMeasures());

  const orientationUpdatedHandler = () => {
    setDimensions(screenMeasures());
  };

  useEffect(() => {
    Dimensions.addEventListener("change", orientationUpdatedHandler);
    return () => {
      Dimensions.removeEventListener("change", orientationUpdatedHandler);
    };
  });
  const imageWidthHeight = 300 * dimensions.widthFactor;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyle.title}>The Game is Over!</Text>
        <View
          style={[
            styles.imageContainer,
            {
              width: imageWidthHeight,
              height: imageWidthHeight,
              borderRadius: imageWidthHeight / 2,
              marginVertical: dimensions.height / 25
            }
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
            resizeMode={"cover"}
            fadeDuration={3000}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ ...DefaultStyle.bodyText, ...styles.resultText }}>
            Your phone needed{" "}
            <Text style={styles.highlight}> {props.numberOfRounds}</Text> Rounds
            to guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>
        <CustomButton onPress={props.onRestart}>RESTART</CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  imageContainer: {
    //width: imageWidthHeight,
    //height: imageWidthHeight,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2
    //borderRadius: imageWidthHeight / 2,
    //marginVertical: dimensions.height / 25 //30
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: Color.primary
  },
  resultText: {
    textAlign: "center",
    fontSize: 20
  },
  textContainer: {
    //marginHorizontal: dimensions.width / 10, //35,
    marginVertical: 10,
    alignItems: "center"
  }
});

export default GameOverScreen;
