import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useFavorites } from '../../../hooks/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/TradeCalsMainTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import FaveStyle from '../../../styles/menus/FaveButton'
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;
type GridItem = keyof RootStackParamList | null;

const MAX_FAVORITES = 4;
interface ButtonConfig {
  icon: keyof typeof FontAwesome.glyphMap;
  iconFamily: typeof FontAwesome | typeof Entypo;
  color: string;
  size: number;
  title: string;
}

const BUTTON_CONFIGS: Record<keyof typeof STATIC_SCREENS[number], ButtonConfig> = {
  Calculator: {
    icon: 'calculator',
    iconFamily: FontAwesome,
    color: '#4CAF50',
    size: 24,
    title: 'Calculator'
  },
  Notepad: {
    icon: 'sticky-note-o',
    iconFamily: FontAwesome,
    color: '#2196F3',
    size: 24,
    title: 'Notepad'
  },
  Planner: {
    icon: 'calendar',
    iconFamily: FontAwesome,
    color: '#9C27B0',
    size: 24,
    title: 'Planner'
  },
  post: {
    icon: 'comment',
    iconFamily: FontAwesome,
    color: '#FF9800',
    size: 24,
    title: 'Post'
  }
} as const;

const STATIC_SCREENS = ['Calculator', 'Notepad', 'Planner', 'post'] as const;


const SCREEN_TITLES: Record<string, string> = {
  ArchitectArea: 'Area',
  ArchitectVolume: 'Volume',
  ArchitectStructural: 'Load',
  ArchitectEnergyEfficiency: 'Efficiency',
  ArchitectStructuralDesign: 'Design',
  ArchitectLighting: 'Lighting',
  BuilderMasonry: 'Masonry',
  BuilderCarpentry: 'Carpentry',
  BuilderElectrical: 'Electrical',
  BuilderPlumbing: 'Plumbing',
  BuilderRoofing: 'Roofing',
  BuilderPandD: 'P&D',
  BuilderFlooring: 'Flooring',
  BuilderPlastering: 'Plastering',
  BuilderTiling: 'Tiling',
  BuilderGroundsWork: 'Grounds',
  BuilderLandscaping: 'Landscaping',
  ElectricalOhmsLaw: 'Ohms',
  ElectricalBattery: 'Battery',
  ElectricalMotorGenerator: 'Motor',
  ElectricalPower: 'Power',
  ElectricalTransformer: 'Transformer',
  ElectricalCircuitAnalysis: 'Circuit',
  ElectricalAcCircuit: 'AC',
  MechanicalBasicCals: 'Basic',
  MechanicalMOT: 'MOT',
  MechanicalMyGarage: 'Garage',
  MechanicalLearn: 'Learn',
  StructuralBeamandColumm: 'Beam',
  StructuralFoundations: 'Foundations',
  StructuralLoad: 'Load',
  StructuralReinforcedConc: 'Concrete',
  StructuralSpans: 'Spans',
  StructuralTrussandFrame: 'Truss',
  Tables: 'Tables',
  Pdf: 'PDF'
};

interface ButtonProps {
  item: keyof RootStackParamList;
  onPress: () => void;
  onLongPress?: () => void;
  config?: ButtonConfig;
  isFavorite?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  item, 
  onPress, 
  onLongPress, 
  config, 
  isFavorite 
}) => {
  const buttonStyle = isFavorite ? FaveStyle.faveButton : [
    FaveStyle.normalButton, 
    { backgroundColor: config?.color || '#555' }
  ];
  
  const IconComponent = config?.iconFamily || Entypo;
  const iconProps = isFavorite 
    ? { name: "star-outlined" as const, size: 24, color: "yellow" }
    : { name: config?.icon || 'circle-o', size: config?.size || 24, color: "white" };

  return (
    <View style={buttonStyle}>
      <TouchableOpacity
        style={isFavorite ? FaveStyle.faveButtonContent : FaveStyle.normalButtonContent}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <IconComponent {...iconProps} />
        <Text style={FaveStyle.buttonText}>
          {SCREEN_TITLES[item] || config?.title || item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const EmptySlot: React.FC = () => (
  <View style={FaveStyle.emptySlot}>
    <Text style={FaveStyle.emptySlotText}>+</Text>
  </View>
);

const PopupScreen: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width, height } = useWindowDimensions();

  // Determine orientation
  const isPortrait = height > width;

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const renderItem = ({ item, index }: { item: GridItem; index: number }) => {
    if (!item) return <EmptySlot />;

    if (index < MAX_FAVORITES) {
      return (
        <Button
          item={item}
          onPress={() => handleNavigation(item)}
          onLongPress={() => removeFavorite(item)}
          isFavorite
        />
      );
    }

    return (
      
      <Button
        item={item}
        onPress={() => handleNavigation(item)}
        config={BUTTON_CONFIGS[item as keyof typeof BUTTON_CONFIGS]}
      />
    );
  };

  const gridData: GridItem[] = [
    ...favorites.slice(0, MAX_FAVORITES),
    ...Array(MAX_FAVORITES - favorites.length).fill(null),
    ...STATIC_SCREENS,
  ];

  return (
    <Animated.View style={[FaveStyle.formContainer, isPortrait ? FaveStyle.portrait : FaveStyle.landscape]}>
      <FlatList
        data={gridData}
        keyExtractor={(item, index) => item || `empty-${index}`}
        renderItem={renderItem}
        numColumns={4}
        contentContainerStyle={FaveStyle.gridContainer}
        scrollEnabled={false}
      />
    </Animated.View>
  );
};


export default PopupScreen;