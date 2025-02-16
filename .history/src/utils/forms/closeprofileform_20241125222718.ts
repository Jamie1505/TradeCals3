import { Animated } from "react-native";

export const closeProfileForm = (
  slideAnim: Animated.Value,
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  callback?: () => void
) => {
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start(() => {
    setIsProfileFormVisible(false);
    if (callback) callback();
  });
};
