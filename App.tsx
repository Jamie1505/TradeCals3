import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
import TradeCalsMain from './src/app/tradeCals';
import { loadResourcesAndDataAsync } from './src/hooks/loadResources'; // Import your resource loading function

SplashScreen.preventAutoHideAsync(); // Keep splash screen visible  `

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Function to load any resources or data before rendering the app
  const loadAppResources = useCallback(async () => {
    try {
      // Load all necessary resources (fonts, images, etc.)
      await loadResourcesAndDataAsync();

      // Introduce an artificial delay (e.g., 2 seconds) before marking the app as ready
      //await new Promise(resolve => setTimeout(resolve, 2000)); // 2000 ms = 2 seconds

    } catch (error) {
      console.warn('Error loading app resources:', error);

    } finally {
      setAppIsReady(true);
    }
  }, []);

  // Effect to load resources when the app starts
  useEffect(() => {
    loadAppResources();
  }, [loadAppResources]);

  // Effect to hide the splash screen when the app is ready
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    // Return splash screen component with black background
    return <SplashScreenBackground />;
  }
  return (
      <TradeCalsMain />
  );
}

// Component to render a black background while the splash screen is visible
const SplashScreenBackground = () => (
  <View style={styles.splashBackground} />
);

const styles = StyleSheet.create({
  splashBackground: {
    flex: 1,
    backgroundColor: 'black', // Set the background color to black
  },
});
