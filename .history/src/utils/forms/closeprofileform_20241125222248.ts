import { Animated } from "react-native";

export const closeProfileForm = (
  slideAnim: Animated.Value,
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  callback?: () => void
) => {
  console.log('Closing form...');
  // Temporarily remove animation
  setIsProfileFormVisible(false);
  console.log('Form closed');
  if (callback) callback();
};
