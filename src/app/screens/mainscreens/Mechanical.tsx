import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import Mechanical_tiles from '../../../styles/tilestyles/Mechanical_tiles';
import { MechanicParamList } from '../../../types/TradeCalsMainTypes';
import { MechanicalItemTypes } from '../../../types/menuitemtypes';

// Type for the navigation prop
type MechanicsScreenNavigationProp = NativeStackNavigationProp<MechanicParamList>;

const DATA: MechanicalItemTypes[] = [
  {
    id: '1',
    title: 'Basic Cals',
    screen: 'MechanicalBasicCals',
    icon: require('../../../assets/architecticons/area.png')
  },
  {
    id: '2',
    title: 'MOT Checker',
    screen: 'MechanicalMOT',
    icon: require('../../../assets/architecticons/volume.png')
  },
  {
    id: '3',
    title: 'Garage',
    screen: 'MechanicalMyGarage',
    icon: require('../../../assets/architecticons/weight.png')
  },
  {
    id: '4',
    title: 'Learn',
    screen: 'MechanicalLearn',
    icon: require('../../../assets/architecticons/efficiency.png')
  },
];

const MechanicsScreen: React.FC = () => {
  const navigation = useNavigation<MechanicsScreenNavigationProp>();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoritePress = (screen: keyof MechanicParamList) => {
    const isFavorite = favorites.includes(screen);
    
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };

  const renderItem: ListRenderItem<MechanicalItemTypes> = ({ item }) => {
    const isFavorite = favorites.includes(item.screen);

    return (
      <TouchableOpacity
        style={Mechanical_tiles.tile}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={Mechanical_tiles.icon} resizeMode="contain" />
        <View style={Mechanical_tiles.contentContainer}>
          <Text style={Mechanical_tiles.title}>{item.title}</Text>
          <TouchableOpacity
            style={[Mechanical_tiles.favoriteButton, isFavorite && Mechanical_tiles.favoriteButtonActive]}
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
    <View style={Mechanical_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Mechanical_tiles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MechanicsScreen;