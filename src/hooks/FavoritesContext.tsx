import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextData {
  favorites: string[];
  addFavorite: (screenName: string) => void;
  removeFavorite: (screenName: string) => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  // Function to save favorites to AsyncStorage
  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  };

  // Add a favorite to the list and save it
  const addFavorite = (screenName: string) => {
    if (!favorites.includes(screenName) && favorites.length < 4) {
      const newFavorites = [...favorites, screenName];
      saveFavorites(newFavorites);
    } else if (favorites.length >= 4) {
      console.log('You cannot add more than 4 favorites.');
    }
  };

  // Remove a favorite from the list and save it
  const removeFavorite = (screenName: string) => {
    const newFavorites = favorites.filter(fav => fav !== screenName);
    saveFavorites(newFavorites);
  };

  // Load the favorites when the provider mounts
  useEffect(() => {
    loadFavorites();
  }, []);  // Empty dependency array ensures it runs only once when the component mounts

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
