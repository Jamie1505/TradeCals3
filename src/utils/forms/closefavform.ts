import { Animated } from "react-native";

export const closeFavForm = (slideAnim: Animated.Value, setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsFormVisible(false);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  