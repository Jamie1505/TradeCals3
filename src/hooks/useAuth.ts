import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types/TradeCalsMainTypes';

type UseAuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUserName] = useState<string>(''); // Username state for sign-up
  const [email, setEmail] = useState<string>(''); // Email state
  const [password, setPassword] = useState<string>(''); // Password state
  const [loading, setLoading] = useState<boolean>(true); // Loading state to indicate sign-in/sign-out process
  const navigation = useNavigation<UseAuthScreenNavigationProp>();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); // Loading stops once the state is known
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [navigation]);

  // Function to handle sign-in
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Sign-in Error', error.message || 'An error occurred during sign-in');
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      //navigation.navigate('MainMenu'); // Navigate back to the sign-in screen
    } catch (error: any) {
      Alert.alert('Sign-out Error', error.message || 'An error occurred during sign-out');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sign-up
  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('All fields (email, password, username) are required');
      return;
    }

    setLoading(true);
    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set the displayName to the chosen username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // Store additional user information in Firestore
      await setDoc(doc(db, 'Users', userCredential.user.uid), {
        email,
        username,
        createdAt: serverTimestamp(),
      });

    } catch (error: any) {
      Alert.alert('Sign-up Error', error.message || 'An error occurred during sign-up');
    } finally {
      setLoading(false);
    }
  };

  // LogOutAuth to trigger sign-out
  const LogOutAuth = () => {
    if (isLoggedIn) {
      handleSignOut();
    }
  };

  return {
    handleSignUp,
    isLoggedIn,
    loading,
    LogOutAuth,
    handleSignIn,
    setEmail,
    setUserName,
    setPassword,
  };
};

export default useAuth;
