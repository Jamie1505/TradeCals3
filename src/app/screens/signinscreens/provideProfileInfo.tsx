import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, ActivityIndicator, TouchableOpacity, View, StyleSheet, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db, auth, storage  } from '../../../hooks/firebaseConfig'; // Adjust this import based on your project structure
import { collection, doc, setDoc, query, where, getDocs, getDoc } from 'firebase/firestore'; // Adjust the import
import { RootStackParamList } from "../../../types/TradeCalsMainTypes";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesome } from "@expo/vector-icons";

type SignupProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const isValidUsername = (username: string): boolean => /^[a-zA-Z0-9._]{3,20}$/.test(username);
const isValidAboutMe = (aboutMe: string): boolean => /^[a-zA-Z0-9._ ]{3,200}$/.test(aboutMe.trim());

const SignupProfileScreen: React.FC = () => {
  const navigation = useNavigation<SignupProfileNavigationProp>();

  const [username, setUsername] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== 'android') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissions required', 'We need media library permissions to upload your profile picture.');
        }
      }
    };
    
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            const userDocRef = doc(db, 'Users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setProfileImage(userData?.profileImage || null);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Error', 'Failed to fetch user profile. Please try again later.');
          }
        }
      };
    
      requestPermissions();
      fetchUserData();
    }, []);

    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
    
        if (!result.canceled) {
          const fetchUri = Platform.OS === "ios"
            ? result.assets[0].uri.replace("file://", "")
            : result.assets[0].uri;
    
          setProfileImage(fetchUri); // Store the local URI in state
        }
      } catch (error) {
        console.error("Error picking image:", error);
        Alert.alert("Error", "Failed to pick image. Please try again.");
      }
    };
    
    const handleSaveProfile = async () => {
      setError('');
      setLoading(true);
    
      try {
        const user = auth.currentUser;
        if (!user) {
          setError('No authenticated user found.');
          setLoading(false);
          return;
        }
    
        // Validate the input
        if (!isValidUsername(username)) {
          setError('Please enter a valid username between 3-20 characters.');
          setLoading(false);
          return;
        }
    
        if (!isValidAboutMe(aboutMe)) {
          setError('Please enter valid about me details between 3-200 characters.');
          setLoading(false);
          return;
        }
    
        // Check if the username is already taken
        const isUsernameTaken = await checkIfUsernameExists(username);
        if (isUsernameTaken) {
          setError('Username is already taken. Please choose another one.');
          setLoading(false);
          return;
        }
    
        // Ensure the user document exists
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, { username: '', aboutMe: '', profileImage: '' });
        }
    
        let imageUrl = profileImage; // Use the selected profileImage state
    
        // If the user has picked a new image, upload it
        if (profileImage && !profileImage.startsWith('https://')) {
          const response = await fetch(profileImage);
          const blob = await response.blob();
    
          const imageRef = ref(storage, `profile-images/${user.uid}`);
          await uploadBytes(imageRef, blob);
          imageUrl = await getDownloadURL(imageRef);
        }
    
        // Save all data (username, aboutMe, and profileImage) to Firestore
        await setDoc(
          userDocRef,
          {
            username,
            aboutMe,
            profileImage: imageUrl,
          },
          { merge: true }
        );
    
        setProfileImage(imageUrl); // Update local state with the new profile image
    
        // Navigate to the home screen after saving
        navigation.navigate('MainMenu');
      } catch (error) {
        console.error('Error saving profile:', error);
        setError('Failed to save profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    

  // Check if username is already taken
  const checkIfUsernameExists = async (username: string): Promise<boolean> => {
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // If the query returns documents, the username is already taken
  };

  return (
    
    
    <View style={styles.container}>
      <KeyboardAvoidingView>
      <Text style={styles.title}>Edit User Profile</Text>

      <View style={styles.profileImage}>
      <TouchableOpacity onPress={pickImage} >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesome name="camera" size={40} color="#888" />
              <Text style={styles.placeholderText}>Tap to add profile photo</Text>
            </View>
          )}
        </TouchableOpacity>
        </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="About Me"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
        maxLength={200}
      />

<TouchableOpacity
  style={[styles.button, { backgroundColor: loading ? '#bbb' : '#007bff' }]}
  onPress={handleSaveProfile} // Use the new combined function
  disabled={loading || !username || !aboutMe}
>
  <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Profile'}</Text>
</TouchableOpacity>


      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </KeyboardAvoidingView>
      </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    margin: 10,
    borderRadius: 160,
  },
  placeholder: {
    width: 160,
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignupProfileScreen;
