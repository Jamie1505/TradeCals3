import { Animated } from "react-native";

export const closeProfileForm = (slideAnim: Animated.Value, setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setIsProfileFormVisible(false);
    });
  };
