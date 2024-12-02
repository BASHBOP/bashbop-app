import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const heightPercentage = (percentage: number) => (screenHeight * percentage) / 100;
export const widthPercentage = (percentage: number) => (screenWidth * percentage) / 100;