import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/color";
import screenMeasures from "../constants/dimensions";
import DefaultStyle from "../constants/defaultStyles";

const Header = props => {
  const [screenSize, setScreenSize] = useState(screenMeasures());
  const updateOrientation = () => {
    //setScreenSize(screenMeasures());
    setScreenSize(prevScreenSize => {
      const currScreenSize = screenMeasures();
      return {
        ...prevScreenSize,
        ...currScreenSize
      };
    });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", updateOrientation);
    return () => {
      Dimensions.removeEventListener("change", updateOrientation);
    };
  });

  return (
    <View
      style={[
        styles.header,
        {
          height: screenSize.short ? 70 : 90,
          paddingTop: 36 * screenSize.heightFactor
        }
      ]}
    >
      <Text style={{ ...DefaultStyle.title, ...styles.headerTitle }}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "white", // "black ",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default Header;
