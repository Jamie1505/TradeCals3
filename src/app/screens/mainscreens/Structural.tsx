import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import Structural_tiles from '../../../styles/tilestyles/Structural_tiles';
import { StructuralParamList } from '../../../types/TradeCalsMainTypes';
import { StructuralItemTypes } from '../../../types/menuitemtypes';

// Type for the navigation prop
type StructuralScreenNavigationProp = NativeStackNavigationProp<StructuralParamList>;

const DATA: StructuralItemTypes[] = [
  {
    id: '1',
    title: 'Beam and Column',
    screen: 'StructuralBeamandColumm',
    icon: require('../../../assets/structuralicons/column.png')
  },
  {
    id: '2',
    title: 'Foundations',
    screen: 'StructuralFoundations',
    icon: require('../../../assets/structuralicons/foundation.png')
  },
  {
    id: '3',
    title: 'Structural Load',
    screen: 'StructuralLoad',
    icon: require('../../../assets/architecticons/weight.png')
  },
  {
    id: '4',
    title: 'Reinforced Concrete',
    screen: 'StructuralReinforcedConc',
    icon: require('../../../assets/structuralicons/concrete.png')
  },
  {
    id: '5',
    title: 'Spans',
    screen: 'StructuralSpans',
    icon: require('../../../assets/structuralicons/span.png')
  },
  {
    id: '6',
    title: 'Truss and Frame',
    screen: 'StructuralTrussandFrame',
    icon: require('../../../assets/structuralicons/truss.png')
  }
];

const StructuralScreen: React.FC = () => {
  const navigation = useNavigation<StructuralScreenNavigationProp>();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoritePress = (screen: keyof StructuralParamList) => {
    const isFavorite = favorites.includes(screen);
    
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };

  const renderItem: ListRenderItem<StructuralItemTypes> = ({ item }) => {
    const isFavorite = favorites.includes(item.screen);

    return (
      <TouchableOpacity
        style={Structural_tiles.tile}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={Structural_tiles.icon} resizeMode="contain" />
        <View style={Structural_tiles.contentContainer}>
          <Text style={Structural_tiles.title}>{item.title}</Text>
          <TouchableOpacity
            style={[Structural_tiles.favoriteButton, isFavorite && Structural_tiles.favoriteButtonActive]}
            onPress={() => handleFavoritePress(item.screen)}
          >
            <Fontisto 
              name={isFavorite ? "favorite" : "favorite"} 
              size={28} 
              color={isFavorite ? "#FF3B30" : "#323232"} 
            />
          </TouchableOpacity>
        </View>
        <Ionicons name="chevron-forward" size={32} color="#323232" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Structural_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Structural_tiles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StructuralScreen;