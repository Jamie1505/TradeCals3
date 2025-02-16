import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useFavorites } from "../../../../hooks/FavoritesContext";
import FaveStyle from "../../../../styles/menus/FaveButton";
import { Fontisto } from "@expo/vector-icons";

const StructuralBeamandColummScreen= () => {
    const { addFavorite, removeFavorite, favorites } = useFavorites();

    // Check if the screen is a favorite
    const isFavorite = favorites.includes('StructuralBeamandColumm');
  
    // Toggle favorite functionality
    const handleFavoritePress = () => {
      if (isFavorite) {
        removeFavorite('StructuralBeamandColumm');
      } else {
        addFavorite('StructuralBeamandColumm');
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

export default StructuralBeamandColummScreen;