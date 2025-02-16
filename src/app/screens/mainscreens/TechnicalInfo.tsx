  import React from 'react';
  import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { useFavorites } from '../../../hooks/FavoritesContext';
  import { Fontisto, Ionicons } from '@expo/vector-icons';
  import TechnicalInfo_tiles from '../../../styles/tilestyles/TechnicalInfo_tiles';
  import { OtherScreensParamList } from '../../../types/TradeCalsMainTypes';
  import { TechnicalinfoItemTypes } from '../../../types/menuitemtypes';

  // Type for the navigation prop
  type TechnicalInfoNavigationProp = NativeStackNavigationProp<OtherScreensParamList>;
  
  const DATA: TechnicalinfoItemTypes[] = [
    {
      id: '1',
      title: 'PDFs',
      screen: 'Pdf',
      icon: require('../../../assets/structuralicons/column.png')
    },
    {
      id: '2',
      title: 'Tables',
      screen: 'Tables',
      icon: require('../../../assets/structuralicons/foundation.png')
    },
  ];
  
  const TechnicalInfoScreen: React.FC = () => {
    const navigation = useNavigation<TechnicalInfoNavigationProp>();
    const { addFavorite, removeFavorite, favorites } = useFavorites();
  
    const handleFavoritePress = (screen: keyof OtherScreensParamList) => {
      const isFavorite = favorites.includes(screen);
      
      if (!isFavorite) {
        addFavorite(screen);
      } else {
        removeFavorite(screen);
      }
    };
  
    const renderItem: ListRenderItem<TechnicalinfoItemTypes> = ({ item }) => {
      const isFavorite = favorites.includes(item.screen);
  
      return (
        <TouchableOpacity
          style={TechnicalInfo_tiles.tile}
          onPress={() => navigation.navigate(item.screen)}
          activeOpacity={0.7}
        >
          <Image source={item.icon} style={TechnicalInfo_tiles.icon} resizeMode="contain" />
          <View style={TechnicalInfo_tiles.contentContainer}>
            <Text style={TechnicalInfo_tiles.title}>{item.title}</Text>
            <TouchableOpacity
              style={[TechnicalInfo_tiles.favoriteButton, isFavorite && TechnicalInfo_tiles.favoriteButtonActive]}
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
      <View style={TechnicalInfo_tiles.wrapper}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={TechnicalInfo_tiles.container}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  export default TechnicalInfoScreen;