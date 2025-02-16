import { Animated } from "react-native";

export const openfavForm = (
  isfavFormVisible: boolean,
  setIsfavFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  slideAnim: Animated.Value
) => {
  if (isfavFormVisible) return;

  setIsfavFormVisible(true);

  Animated.timing(slideAnim, {
    toValue: 100, // Adjust as needed
    duration: 300,
    useNativeDriver: true,
  }).start();
};
