import { useEffect, useCallback, useState } from "react";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const cachedImagePath = `${FileSystem.cacheDirectory}imageUri.txt`; // Cache directory

  useEffect(() => {
    let isMounted = true; // Prevents state updates if the component is unmounted
    const loadCachedImage = async () => {
      try {
        // Check if cached image exists
        const fileInfo = await FileSystem.getInfoAsync(cachedImagePath);
        if (fileInfo.exists) {
          const uri = await FileSystem.readAsStringAsync(cachedImagePath);
          if (isMounted) {
            setImageUri(uri); // Update state only if still mounted
          }
        }
      } catch (error) {
        console.error('Error loading cached image:', error);
      }
    };

    if (!imageUri) { // Only load cached image if it's not already in memory
      loadCachedImage();
    }

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [cachedImagePath, imageUri]);

  const pickImage = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to images
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Compress image to 50% quality
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);

        // Cache the image URI
        await FileSystem.writeAsStringAsync(cachedImagePath, uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('An error occurred while picking the image.');
    }
  }, []);

  return { imageUri, pickImage };
};

export default useImagePicker;
