import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useFavorites } from '../../../../hooks/FavoritesContext';
import Fontisto from '@expo/vector-icons/Fontisto';
import FaveStyle from '../../../../styles/menus/FaveButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import invoiceLayout from '../../../../styles/tools/InvoiceLayout';

const InvoiceScreen = () => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [isDrawVisible, setIsDrawVisible] = useState(false);
  const slideDrawAnim = useSharedValue(250);

  // Check if the screen is a favorite
  const isFavorite = favorites.includes('Invoice');

  const toggleRightDraw = useCallback (() => {
    setIsDrawVisible((prev) => {
      const nextState = !prev;
    slideDrawAnim.value = withTiming(nextState ? 0 : 250, {
      duration: 250,
      easing: Easing.ease,
  });
  return nextState;
    });
  }, [slideDrawAnim]);

  const toggleRightDrawBack = useCallback (() => {
    setIsDrawVisible((prev) => {
      const nextState = !prev;
    slideDrawAnim.value = withTiming(nextState ? 0 : 400, {
      duration: 400,
    easing: Easing.ease,
    });
  return nextState;
    });
  }, [slideDrawAnim]);

  // Toggle favorite functionality
  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite('Invoice');
    } else {
      addFavorite('Invoice');
    }
  };
 
  return (
    <View style={FaveStyle.container}>
      <View style={invoiceLayout.Header}>
      <TouchableOpacity
      style={[ invoiceLayout.headerButton]}
      onPress={toggleRightDraw}
      >
        <MaterialIcons name="menu" size={24} color="white" />
      </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[FaveStyle.addButton, isFavorite && FaveStyle.favoriteButtonActive]}
        onPress={handleFavoritePress}
      >
        <Fontisto 
          name={isFavorite ? "heart" : "heart-alt"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => { toggleRightDrawBack(); }}>
      <Animated.View
      style={[ invoiceLayout.drawBackContainer, { transform: [{ translateX: slideDrawAnim}] }]}
      ></Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[ invoiceLayout.drawContainer, { transform: [{ translateX: slideDrawAnim}] }]} >
        <Text style={ invoiceLayout.drawMenuText}>Menu</Text>

        <TouchableOpacity style={ invoiceLayout.AddIcon}
            onPress={() => {console.log('Add Icon')}}
            >
          <Text style={invoiceLayout.ButtonText}>Add icon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ invoiceLayout.AddCustomerDetails}
            onPress={() => {console.log('Add Details')}}
            >
          <Text style={invoiceLayout.ButtonText}>Add Customer Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ invoiceLayout.AddCompanyDetails}
            onPress={() => {console.log('Add Details')}}
            >
          <Text style={invoiceLayout.ButtonText}>Add Company Details</Text>
        </TouchableOpacity>

        <View style= {invoiceLayout.ColorButtons}>
          <TouchableOpacity style={invoiceLayout.GreenStyle}
            onPress={() => {console.log('Green')}}
            >
          </TouchableOpacity>
          <TouchableOpacity style={invoiceLayout.GreenishStyle}
            onPress={() => {console.log('Greenish')}}
            >
          </TouchableOpacity>
          <TouchableOpacity style={invoiceLayout.RedStyle}
            onPress={() => {console.log('Red')}}
            >
          </TouchableOpacity>
          <TouchableOpacity style={invoiceLayout.YellowStyle}
            onPress={() => {console.log('Yellow')}}
            >
          </TouchableOpacity>
          <TouchableOpacity style={invoiceLayout.YellowishStyle}
            onPress={() => {console.log('Yellowish')}}
            >
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={ invoiceLayout.Download}
            onPress={() => {console.log('Download')}}
            >
          <Text style={invoiceLayout.ButtonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ invoiceLayout.Print}
            onPress={() => {console.log('Print')}}
            >
          <Text style={invoiceLayout.ButtonText}>Print</Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default InvoiceScreen;