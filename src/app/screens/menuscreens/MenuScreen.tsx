import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageSourcePropType,
  ListRenderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Main_Menu_tiles from '../../../styles/tilestyles/Main_Menu_tiles';
import { MainMenuParamList } from '../../../types/TradeCalsMainTypes';
import { MenuItemType } from '../../../types/menuitemtypes';
import { Tilecolor1, Tilecolor2, Tilecolor3 } from '../../../styles/customstyles/CustomStyles';
import { Ionicons } from '@expo/vector-icons';

// Type for the navigation prop
type MenuScreenNavigationProp = NativeStackNavigationProp<MainMenuParamList>;

const DATA: MenuItemType[] = [
  {
    id: '1',
    title: 'Questions',
    screen: 'post',
    icon: require('../../../assets/menu/question.png'),
    backgroundColor: Tilecolor1,
  },
  {
    id: '2',
    title: 'Architect',
    screen: 'SignupProfile',
    icon: require('../../../assets/menu/architect.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '3',
    title: 'Building',
    screen: 'Builder',
    icon: require('../../../assets/menu/builder.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '4',
    title: 'Electrical Engineering',
    screen: 'ElectricalEngineering',
    icon: require('../../../assets/menu/electric.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '5',
    title: 'Mechanics',
    screen: 'Mechanics',
    icon: require('../../../assets/menu/mechanics.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '6',
    title: 'Structural Engineering',
    screen: 'Structural',
    icon: require('../../../assets/architecticons/weight.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '7',
    title: 'Technical Information',
    screen: 'TechnicalInfo',
    icon: require('../../../assets/menu/information.png'),
    backgroundColor: Tilecolor2,
  },
  {
    id: '8',
    title: 'Contracts',
    screen: 'Contract',
    icon: require('../../../assets/tools/contract.png'),
    backgroundColor: Tilecolor3,
  },
  {
    id: '9',
    title: 'Costing',
    screen: 'Costing',
    icon: require('../../../assets/tools/accounting.png'),
    backgroundColor: Tilecolor3,
  },
  {
    id: '10',
    title: 'Invoice',
    screen: 'Invoice',
    icon: require('../../../assets/tools/invoicing.png'),
    backgroundColor: Tilecolor3,
  },
  {
    id: '11',
    title: 'Learn',
    screen: 'Learn',
    icon: require('../../../assets/tools/learn.png'),
    backgroundColor: Tilecolor3,
  },
  {
    id: '12',
    title: 'Planner',
    screen: 'Planner',
    icon: require('../../../assets/tools/topic.png'),
    backgroundColor: Tilecolor3,
  },
];

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  const renderItem: ListRenderItem<MenuItemType> = ({ item }) => {
    
    return (
      
      <View style={{flex: 1}}>
      <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: item.backgroundColor,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.7}
      >
        <Image source={item.icon} style={Main_Menu_tiles.icon} resizeMode="contain" />
        <View style={Main_Menu_tiles.contentContainer}>
          <Text style={Main_Menu_tiles.title}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={32} color="#323232" />
      </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Main_Menu_tiles.wrapper}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Main_Menu_tiles.wrappercontainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuScreen;