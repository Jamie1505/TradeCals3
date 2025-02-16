import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import ElectricalEngineering_tiles from '../../../styles/tilestyles/ElectricalEngineering_tiles'
import { ElectricalParamList } from '../../../types/TradeCalsMainTypes';
import { ElectricalItemTypes } from '../../../types/menuitemtypes';

// Type for the navigation prop
type ElectricalEngineeringScreenNavigationProp = NativeStackNavigationProp<ElectricalParamList>;

const DATA: ElectricalItemTypes[] = [
  {
    id: '1',
    title: 'Ohms Law',
    screen: 'ElectricalOhmsLaw',
    icon: require('../../../assets/electricalicons/ohm.png')
  },
  {
    id: '2',
    title: 'Battery',
    screen: 'ElectricalBattery',
    icon: require('../../../assets/electricalicons/battery.png')
  },
  {
    id: '3',
    title: 'Motor & Generator',
    screen: 'ElectricalMotorGenerator',
    icon: require('../../../assets/electricalicons/motor.png')
  },
  {
    id: '4',
    title: 'Power',
    screen: 'ElectricalPower',
    icon: require('../../../assets/electricalicons/power.png')
  },
  {
    id: '5',
    title: 'Transformer',
    screen: 'ElectricalTransformer',
    icon: require('../../../assets/electricalicons/transformer.png')
  },
  {
    id: '6',
    title: 'Circuit Analysis',
    screen: 'ElectricalCircuitAnalysis',
    icon: require('../../../assets/electricalicons/circuit.png')
  },
  {
    id: '7',
    title: 'AC Circuit',
    screen: 'ElectricalAcCircuit',
    icon: require('../../../assets/electricalicons/ac.png')
  }
];

const ElectricalEngineeringScreen: React.FC = () => {
  const navigation = useNavigation<ElectricalEngineeringScreenNavigationProp>();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoritePress = (screen: keyof ElectricalParamList) => {
    const isFavorite = favorites.includes(screen);
    
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };

  const renderItem: ListRenderItem<ElectricalItemTypes> = ({ item }) => {
    const isFavorite = favorites.includes(item.screen);

    return (
      <TouchableOpacity
        style={ElectricalEngineering_tiles.tile}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={ElectricalEngineering_tiles.icon} resizeMode="contain" />
        <View style={ElectricalEngineering_tiles.contentContainer}>
          <Text style={ElectricalEngineering_tiles.title}>{item.title}</Text>
          <TouchableOpacity
            style={[ElectricalEngineering_tiles.favoriteButton, isFavorite && ElectricalEngineering_tiles.favoriteButtonActive]}
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
    <View style={ElectricalEngineering_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={ElectricalEngineering_tiles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default ElectricalEngineeringScreen;