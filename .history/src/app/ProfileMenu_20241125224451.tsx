import React, { useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/TradeCalsMainTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import useAuth from '../hooks/useAuth';
import { closeProfileForm } from '../utils/forms/closeprofileform';

type NavigationProp = StackNavigationProp<RootStackParamList>;
interface ProfileMenuProps {
  setIsProfileFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  slideAnim: Animated.Value; // Ensure this is the correct type
}



const ProfileMenuScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { isLoggedIn, LogOutAuth } = useAuth();
    const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    
    const handleSignIn = () => {
      console.log('Sign In button pressed');
      closeProfileForm(slideAnim, setIsProfileFormVisible, () => {
          console.log('Navigating to Sign In');
      });
    };


  const NavigateProfile = () => {
    navigation.navigate('Profile'); // Replace with your desired screen name
  };
  const NavigateSignIn = () => {
    navigation.navigate('signin'); // Replace with your desired screen name
  };
  const NavigatePremium = () => {
    navigation.navigate('premium'); // Replace with your desired screen name
  };
  return (
    <Animated.View style={styles.formContainer}>
<TouchableOpacity
  style={styles.Profilebutton}
  onPress={() => {
    NavigateProfile();
  }}
>
  <Text style={styles.buttonText}>Profile</Text>
</TouchableOpacity>
z
    
    <TouchableOpacity style={styles.SignIn} onPress={() => {
            if (isLoggedIn) {
              LogOutAuth();
            } else {
              navigation.navigate('signin')
              closeProfileForm(slideAnim, setIsProfileFormVisible);
           }
            }}>
      <Text style={styles.buttonText}>{isLoggedIn ? '   Sign Out' : '   Sign In'}</Text>
    </TouchableOpacity>


    <TouchableOpacity style={styles.Premium} onPress={NavigatePremium}>
      <Text style={styles.buttonText}>Premium</Text>
    </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    backgroundColor: '#000019',
    padding: 10,
    margin: 10,
    bottom: 60,
    borderRadius: 20,
    zIndex: 10,
    right: 10,
    width: '60%',
  },
  Profilebutton: {
    backgroundColor: '#4CAF50', // Nice green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  SignIn: {
    backgroundColor: '#4CAF50', // Nice green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  Premium: {
    backgroundColor: '#4CAF50', // Nice green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileMenuScreen;