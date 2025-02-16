  import React, { useEffect, useRef, useState } from 'react';
  import { Text, TouchableOpacity, Animated, View, useWindowDimensions, ScrollView } from 'react-native';
  import { NavigationProp, useNavigation } from '@react-navigation/native';
  import { RootStackParamList } from '../../../types/TradeCalsMainTypes';
  import useAuth from '../../../hooks/useAuth';
  import { ProfileMenuStyle } from '../../../styles/menus/ProfileMenu';
  import { Image } from 'react-native';
  import { doc, getDoc } from 'firebase/firestore';
  import { auth, db } from '../../../hooks/firebaseConfig';


  const ProfileMenuScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isLoggedIn, LogOutAuth } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [username, setUsername] = useState<string>('');
    const { width, height } = useWindowDimensions();

    // Determine orientation
    const isPortrait = height > width;
  
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'Users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileImage(userData.profileImage || null); // Set the profile image URL
            setUsername(userData.username || ''); // Set the username
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const NavigateProfile = () => {
      navigation.navigate('Profile'); // Replace with your desired screen name
    };

    const NavigatePremium = () => {
      navigation.navigate('Premium'); // Replace with your desired screen name
    };

    const NavigateSettings = () => {
      navigation.navigate('settings'); // Replace with your desired screen name
    };

    return (
      <Animated.View style={[ProfileMenuStyle.formContainer, isPortrait ? ProfileMenuStyle.formContainerportrait : ProfileMenuStyle.formContainerlandscape]}>
        <ScrollView>
        {isLoggedIn && (
          <View style={[ProfileMenuStyle.rowContainer, { alignItems: 'center' }]}>
            {/* Profile Image Container */}
            <TouchableOpacity>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={ProfileMenuStyle.Profileimage} />
              ) : (
                <View style={ProfileMenuStyle.Profileimageplaceholder}>
                  {/* You can add content here if needed */}
                </View>
              )}
            </TouchableOpacity>
            <Text style={[ProfileMenuStyle.usernameText, { marginLeft: 10 }]}>{username}</Text>
          </View>
        )}

      <TouchableOpacity
      style={ProfileMenuStyle.Profilebutton}
      onPress={() => {
        NavigateProfile();
      }}
    >
      <Text style={ProfileMenuStyle.buttonText}>Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity style={ProfileMenuStyle.SignIn} onPress={() => {
      if (isLoggedIn) {
        LogOutAuth();
      } else {
        navigation.navigate('signin')
      }
        }}>
      <Text style={ProfileMenuStyle.buttonText}>{isLoggedIn ? '   Sign Out' : '   Sign In'}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={ProfileMenuStyle.Premium} onPress={NavigatePremium}>
      <Text style={ProfileMenuStyle.buttonText}>Premium</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={ProfileMenuStyle.Settingsbutton}
      onPress={() => {
        NavigateSettings();
      }}
    >
      <Text style={ProfileMenuStyle.buttonText}>Settings</Text>
    </TouchableOpacity>
    </ScrollView>
    </Animated.View>
  );
};
export default ProfileMenuScreen;