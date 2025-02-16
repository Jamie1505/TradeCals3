import { Animated } from "react-native";

export const closeProfileForm = (
  slideAnim: Animated.Value,
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  callback?: () => void
) => {
  console.log('Closing form...');
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start(() => {
    setIsProfileFormVisible(false);
    console.log('Form closed');
    console.log('isProfileFormVisible:', false);
    if (callback) callback();
  });
};
