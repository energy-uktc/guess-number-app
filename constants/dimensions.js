import { Dimensions } from "react-native";

const screenSize = () => {
  let BaselineHeight = 822.86;
  let BaselineWidth = 411.42;

  if (Dimensions.get("screen").width > Dimensions.get("screen").height) {
    BaselineHeight += BaselineWidth;
    BaselineWidth = BaselineHeight - BaselineWidth;
    BaselineHeight = BaselineHeight - BaselineWidth;
  }

  return {
    baselineHeight: BaselineHeight,
    baselineWidth: BaselineWidth,
    widthFactor: Dimensions.get("screen").width / BaselineWidth,
    heightFactor: Dimensions.get("screen").height / BaselineHeight,
    short: Dimensions.get("screen").height < 600,
    narrow: Dimensions.get("screen").height < 300,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  };
};

export default screenSize;
