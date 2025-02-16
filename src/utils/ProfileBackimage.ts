import { useEffect, useCallback, useState } from "react";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const ProfileBackimage = () => {
  console.log('ProfileBackimage');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const imageUriFileName = 'profileBackgroundImageUri.txt';
  const fullPath = FileSystem.documentDirectory + imageUriFileName;

  useEffect(() => {
    const loadImage = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(fullPath);
        if (fileInfo.exists) {
          const uri = await FileSystem.readAsStringAsync(fullPath);
          if (uri) {
            setImageUri(uri);
          }
        } else {
        }
      } catch (error) {
      }
    };

    loadImage();
  }, []);  // Only runs once when the component mounts

  const pickImage = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await FileSystem.writeAsStringAsync(fullPath, uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('An error occurred while picking the image.');
    }
  }, []);  // Callback is memoized to prevent unnecessary re-creations

  return { imageUri, pickImage };
};

export default ProfileBackimage;