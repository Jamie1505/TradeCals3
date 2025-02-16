import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { Fontisto } from '@expo/vector-icons';
import Architect_tiles from '../../../styles/tilestyles/Architect_tiles'
import { ArchitectParamList } from '../../../types/TradeCalsMainTypes'
import { ArchitectItemTypes } from '../../../types/menuitemtypes';
import Ionicons from '@expo/vector-icons/Ionicons';

type ArchitectScreenNavigationProp = NativeStackNavigationProp<ArchitectParamList>;

const DATA: ArchitectItemTypes[] = [
  {
    id: '1',
    title: 'Area',
    screen: 'ArchitectArea',
    icon: require('../../../assets/architecticons/area.png')
  },
  {
    id: '2',
    title: 'Volume',
    screen: 'ArchitectVolume',
    icon: require('../../../assets/architecticons/volume.png')
  },
  {
    id: '3',
    title: 'Structural Load',
    screen: 'ArchitectStructural',
    icon: require('../../../assets/architecticons/weight.png')
  },
  {
    id: '4',
    title: 'Energy Efficiency',
    screen: 'ArchitectEnergyEfficiency',
    icon: require('../../../assets/architecticons/efficiency.png')
  },
  {
    id: '5',
    title: 'Structural Design',
    screen: 'ArchitectStructuralDesign',
    icon: require('../../../assets/architecticons/design.png')
  },
  {
    id: '6',
    title: 'Lighting',
    screen: 'ArchitectLighting',
    icon: require('../../../assets/architecticons/lighting.png')
  }
];

const ArchitectScreen: React.FC = () => {
  const navigation = useNavigation<ArchitectScreenNavigationProp>();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoritePress = (screen: keyof ArchitectParamList) => {
    const isFavorite = favorites.includes(screen);
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };

  const renderItem: ListRenderItem<ArchitectItemTypes> = ({ item }) => {
    const isFavorite = favorites.includes(item.screen);

    return (

      <TouchableOpacity
        style={Architect_tiles.tile}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={Architect_tiles.icon} resizeMode="contain" />
        <View style={Architect_tiles.contentContainer}>
          <Text style={Architect_tiles.title}>{item.title}</Text>
          <TouchableOpacity
            style={[Architect_tiles.favoriteButton, isFavorite && Architect_tiles.favoriteButtonActive]}
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
    <View style={Architect_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Architect_tiles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ArchitectScreen;