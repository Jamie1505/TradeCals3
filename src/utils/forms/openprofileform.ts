import { Animated } from "react-native";

export const OpenProfileForm = (
    isProfileFormVisible: boolean,
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  slideAnim: Animated.Value
) => {
  if (isProfileFormVisible) return;

  setIsProfileFormVisible(true);

  Animated.timing(slideAnim, {
    toValue: 100, // Adjust as needed
    duration: 300,
    useNativeDriver: true,
  }).start();
};