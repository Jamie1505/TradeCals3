import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFavorites } from "../../../../hooks/FavoritesContext";
import { Fontisto } from "@expo/vector-icons";
import FaveStyle from "../../../../styles/menus/FaveButton";

const ElectricalOhmsLawScreen= () => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();

    // Check if the screen is a favorite
    const isFavorite = favorites.includes('ElectricalOhmsLaw');
  
    // Toggle favorite functionality
    const handleFavoritePress = () => {
      if (isFavorite) {
        removeFavorite('ElectricalOhmsLaw');
      } else {
        addFavorite('ElectricalOhmsLaw');
      }
    };
  
    return (
      <View style={FaveStyle.container}>
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

export default ElectricalOhmsLawScreen;