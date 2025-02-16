import React from "react";
import { View,TouchableOpacity } from "react-native";
import { useFavorites } from "../../../../hooks/FavoritesContext";
import { Fontisto } from "@expo/vector-icons";
import FaveStyle from "../../../../styles/menus/FaveButton";

const ElectricalCircuitAnalysisScreen= () => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();

    // Check if the screen is a favorite
    const isFavorite = favorites.includes('ElectricalCircuitAnalysis');
  
    // Toggle favorite functionality
    const handleFavoritePress = () => {
      if (isFavorite) {
        removeFavorite('ElectricalCircuitAnalysis');
      } else {
        addFavorite('ElectricalCircuitAnalysis');
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
export default ElectricalCircuitAnalysisScreen;