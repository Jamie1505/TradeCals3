import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import Builder_tiles from '../../../styles/tilestyles/Builder_tiles'
import { BuilderParamList } from '../../../types/TradeCalsMainTypes';
import { BuilderItemTypes } from '../../../types/menuitemtypes';

// Type for the navigation prop
type BuilderScreenNavigationProp = NativeStackNavigationProp<BuilderParamList>;

const DATA: BuilderItemTypes[] = [
  {
    id: '1',
    title: 'Masonry',
    screen: 'BuilderMasonry',
    icon: require('../../../assets/buildericons/brick.png')
  },
  {
    id: '2',
    title: 'Carpentry',
    screen: 'BuilderCarpentry',
    icon: require('../../../assets/buildericons/carpentry.png')
  },
  {
    id: '3',
    title: 'Electical Work',
    screen: 'BuilderElectrical',
    icon: require('../../../assets/buildericons/electical.png')
  },
  {
    id: '4',
    title: 'Plumbing',
    screen: 'BuilderPlumbing',
    icon: require('../../../assets/buildericons/plumbing.png')
  },
  {
    id: '5',
    title: 'Roofing',
    screen: 'BuilderRoofing',
    icon: require('../../../assets/buildericons/roofing.png')
  },
  {
    id: '6',
    title: 'Painting and Decorating',
    screen: 'BuilderPandD',
    icon: require('../../../assets/buildericons/PandD.png')
  },
  {
    id: '7',
    title: 'Flooring',
    screen: 'BuilderFlooring',
    icon: require('../../../assets/buildericons/flooring.png')
  },
  {
    id: '8',
    title: 'Plastering',
    screen: 'BuilderPlastering',
    icon: require('../../../assets/buildericons/plastering.png')
  },
  {
    id: '9',
    title: 'Tiling',
    screen: 'BuilderTiling',
    icon: require('../../../assets/buildericons/tiling.png')
  },
  {
    id: '10',
    title: 'Grounds Work',
    screen: 'BuilderGroundsWork',
    icon: require('../../../assets/buildericons/groundswork.png')
  },
  {
    id: '11',
    title: 'Landscaping',
    screen: 'BuilderLandscaping',
    icon: require('../../../assets/buildericons/landscaping.png')
  },
];

const BuilderScreen: React.FC = () => {
  const navigation = useNavigation<BuilderScreenNavigationProp>();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoritePress = (screen: keyof BuilderParamList) => {
    const isFavorite = favorites.includes(screen);
    
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };

  const renderItem: ListRenderItem<BuilderItemTypes> = ({ item }) => {
    const isFavorite = favorites.includes(item.screen);

    return (
      <TouchableOpacity
        style={Builder_tiles.tile}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={Builder_tiles.icon} resizeMode="contain" />
        <View style={Builder_tiles.contentContainer}>
          <Text style={Builder_tiles.title}>{item.title}</Text>
          <TouchableOpacity
            style={[Builder_tiles.favoriteButton, isFavorite && Builder_tiles.favoriteButtonActive]}
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
    <View style={Builder_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Builder_tiles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BuilderScreen;