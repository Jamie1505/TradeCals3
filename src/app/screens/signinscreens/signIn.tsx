import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../hooks/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import signinstyles from '../../../styles/signin/SignInStyles';
import { RootStackParamList } from '../../../types/TradeCalsMainTypes';

const STORAGE_KEYS = {
  EMAIL: 'userEmail',
  AUTH_TOKEN: 'authToken',
};


type signinScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Save auth token to secure storage
const saveAuthToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Regular expression to validate email
const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordStrong = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const SigninScreen: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigation = useNavigation<signinScreenNavigationProp>();

  // Handle form input changes
  const handleInputChange = useCallback((key: string) => (text: string) => {
    setFormData(prev => ({ ...prev, [key]: text }));
  }, []);

  // Handle sign-in or sign-up
  const handleAuth = useCallback(async () => {
    setError('');
    setSuccess('');
    setLoading(true);
  
    const { email, password, confirmPassword } = formData;
  
    if (isSignUp) {
      // Sign-up validation
      if (!isValidEmail(email)) {
        setError('Please enter a valid email address.');
        setLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
  
      if (!isPasswordStrong(password)) {
        setError('Password must include uppercase, lowercase, number, and special character.');
        setLoading(false);
        return;
      }
    }
  
    try {
      const authFunction = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      const userCredential = await authFunction(auth, email, password);
      
      // Save the token and email
      const token = await userCredential.user.getIdToken();
      await saveAuthToken(token);
      await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, email);
      
      if (isSignUp) {
        setSuccess('Account created successfully!');
        // Navigate to SignupProfile only on successful sign-up
        navigation.navigate('SignupProfile');
      } else {
        setSuccess('Successfully signed in!');
        navigation.navigate('MainMenu');
      }
    } catch (error: any) { // Use `any` type for error
      setError(error?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  }, [formData, isSignUp, navigation]);

  const toggleAuthMode = useCallback(() => {
    setIsSignUp(prev => !prev);
    setError('');
    setSuccess('');
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  }, []);

  const isButtonDisabled = useMemo(() => {
    const { email, password, confirmPassword } = formData;
    return loading || !email || !password || (isSignUp && !confirmPassword);
  }, [formData, loading, isSignUp]);

  const keyboardBehavior = 'height';


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={signinstyles.container} behavior={keyboardBehavior}>
        <View style={signinstyles.content}>
          <Text style={signinstyles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>

          <TextInput
            style={signinstyles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={handleInputChange('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={signinstyles.input}
            placeholder="Password"
            value={formData.password}
            secureTextEntry
            onChangeText={handleInputChange('password')}
          />

          {isSignUp && (
            <TextInput
              style={signinstyles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              secureTextEntry
              onChangeText={handleInputChange('confirmPassword')}
            />
          )}

          <TouchableOpacity
            style={[signinstyles.button, { backgroundColor: isButtonDisabled ? '#aaa' : '#007bff' }]}
            onPress={handleAuth}
            disabled={isButtonDisabled}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={signinstyles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>}
          </TouchableOpacity>

          {error ? <Text style={signinstyles.errorText}>{error}</Text> : null}
          {success ? <Text style={signinstyles.successText}>{success}</Text> : null}

          <TouchableOpacity onPress={toggleAuthMode}>
            <Text style={signinstyles.toggleText}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SigninScreen;
