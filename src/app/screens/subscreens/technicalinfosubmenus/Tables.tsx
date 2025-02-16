import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text, NativeSyntheticEvent, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useFavorites } from "../../../../hooks/FavoritesContext";
import { Fontisto } from "@expo/vector-icons";
import FaveStyle from "../../../../styles/menus/FaveButton";

// Define the component using TypeScript
const TablesScreen: React.FC = () => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const isFavorite = favorites.includes('Tables');
  // URL of the website or PDF
  const pdfUrl: string = 'https://www.dropbox.com/scl/fi/fzpiwsnirjxxo1zhjr6a0/planning-a-guide-for-householders.docx?rlkey=a5p4p3urve4j9yipihuqy763g&st=w4ryzkns&dl=0'; // Replace with the actual PDF URL if needed

  // State to track whether there is an error
  const [error, setError] = useState<boolean>(false);

  // Error handling function
  const handleError = (syntheticEvent: NativeSyntheticEvent<any>) => {
    setError(true);
  };

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite('Tables');
    } else {
      addFavorite('Tables');
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load content.</Text>
        </View>
      ) : (
        <WebView
          style={styles.container}
          source={{ uri: pdfUrl }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          onError={handleError} // Handle loading errors
        />
      )}
      <TouchableOpacity
          style={[FaveStyle.addButton, isFavorite && FaveStyle.favoriteButtonActive]}
          onPress={handleFavoritePress}
        >
          <Fontisto 
                name={isFavorite ? "favorite" : "favorite"} 
                size={28} 
                color={isFavorite ? "#FF3B30" : "#323232"} 
              />
        </TouchableOpacity>
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //marginTop: Constants.statusBarHeight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});


export default TablesScreen;