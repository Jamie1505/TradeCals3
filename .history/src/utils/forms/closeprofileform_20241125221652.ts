import { Animated } from "react-native";

export const closeProfileForm = (
  slideAnim: Animated.Value,
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  callback?: () => void // Add an optional callback parameter
) => {
  console.log('Closing form...');
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300, // Set a duration for the animation
    useNativeDriver: true,
  }).start(() => {
    setIsProfileFormVisible(false);
    console.log('Form closed');
    if (callback) callback(); // Call the callback if provided
  });
};
