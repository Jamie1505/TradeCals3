import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db, auth, storage } from '../../../hooks/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import profilestyles from '../../../styles/profile/ProfileStyles'

const Tab = createMaterialTopTabNavigator();

const PostMainScreen = () => (
  <View style={profilestyles.screenContainer}>
    <Text>Posts Screen</Text>
  </View>
);

interface AboutEditScreenProps {
  aboutMe: string;
  setAboutMe: (text: string) => void;
  handleSave: () => Promise<void>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  loading: boolean;
}

const AboutEditScreen: React.FC<AboutEditScreenProps> = ({
  aboutMe,
  setAboutMe,
  handleSave,
  isEditing,
  setIsEditing,
  loading
}) => (
  <View style={profilestyles.screenContainer}>
    <Text style={profilestyles.title}>About Me</Text>
    {isEditing ? (
      <TextInput
        style={[profilestyles.input, profilestyles.aboutMeInput]}
        placeholder="Tell us about yourself..."
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
        numberOfLines={4}
        maxLength={500}
      />
    ) : (
      <Text style={profilestyles.aboutMeText}>{aboutMe}</Text>
    )}
    <TouchableOpacity
      style={[profilestyles.button, { backgroundColor: loading ? '#bbb' : '#007bff' }]}
      onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
      disabled={loading}
    >
      <Text style={profilestyles.buttonText}>{isEditing ? 'Save' : 'Edit About Me'}</Text>
    </TouchableOpacity>
   
  </View>
);

export type RootStackParamList = {
  home: undefined;
  signupProfile: undefined;
};

type SignupProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'Posts' | 'About'>('Posts');
  const navigation = useNavigation<SignupProfileNavigationProp>();
  const [username, setUsername] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || '');
          setAboutMe(userData.aboutMe || 'No information provided.');
          setProfileImage(userData.profileImage || null);
        }
      }
    };

    requestPermissions();
    fetchUserData().catch((error) => console.error("Error fetching user data: ", error));
  }, []);

  const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', // Use lowercase 'images'
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        
        const imageRef = ref(storage, `profile-images/${user.uid}`);
        await uploadBytes(imageRef, blob);
        
        const downloadURL = await getDownloadURL(imageRef);
        await setDoc(doc(db, 'Users', user.uid), {
          profileImage: downloadURL
        }, { merge: true });
        
        setProfileImage(downloadURL);
      }
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Error', 'Failed to upload image. Please try again.');
  } finally {
    setLoading(false);
  }
};
  
  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        await setDoc(userDocRef, { username, aboutMe }, { merge: true });
        setIsEditing(false);
      } else {
        setError('No authenticated user found.');
      }
    } catch (error: any) {
      setError('Failed to save profile. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={profilestyles.container}>
      
        <TouchableOpacity onPress={pickImage} >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={profilestyles.profileImage} />
          ) : (
            <View style={profilestyles.placeholder}>
              <FontAwesome name="camera" size={40} color="#888" />
              <Text style={profilestyles.placeholderText}>Tap to add profile photo</Text>
            </View>
          )}
        </TouchableOpacity>

      <View style={profilestyles.tabNavigator}>
        <TouchableOpacity
          style={[
            profilestyles.tabButton,
            currentScreen === 'Posts' && profilestyles.activeTab,
          ]}
          onPress={() => setCurrentScreen('Posts')}
        >
          <Text style={profilestyles.tabLabel}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            profilestyles.tabButton,
            currentScreen === 'About' && profilestyles.activeTab,
          ]}
          onPress={() => setCurrentScreen('About')}
        >
          <Text style={profilestyles.tabLabel}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering */}
      <View style={profilestyles.screenContainer}>
        {currentScreen === 'Posts' ? (
          <PostMainScreen />
        ) : (
          <AboutEditScreen
            aboutMe={aboutMe}
            setAboutMe={setAboutMe}
            handleSave={handleSave}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            loading={loading}
          />
        )}
      </View>

      {loading && (
        <View style={profilestyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
      
      {error ? <Text style={profilestyles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default ProfileScreen;