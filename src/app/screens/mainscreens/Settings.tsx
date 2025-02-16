import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MainScreenBackground } from '../../../styles/customstyles/CustomStyles';

const SettingsScreen = () => {

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: MainScreenBackground }}>
      <Text style= {styles.layout}>Settings</Text>

          <TouchableOpacity style={styles.GreenStyle} onPress={() => {console.log('Green')}} />
          <TouchableOpacity style={styles.GreenishStyle} onPress={() => {console.log('Greenish')}} />
          <TouchableOpacity style={styles.RedStyle} onPress={() => {console.log('Red')}} />
          <TouchableOpacity style={styles.YellowStyle} onPress={() => {console.log('Yellow')}} />
          <TouchableOpacity style={styles.YellowishStyle} onPress={() => {console.log('Yellowish')}} />
      </View>
    );
  };

const styles = StyleSheet.create({
  layout: {
  fontSize: 28,
  color: 'red',
  alignSelf: 'center'
  },
  RedStyle: {
    backgroundColor: '#cc0000',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10
},
GreenishStyle: {
    backgroundColor: '#93c47d',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10
},
GreenStyle: {
    backgroundColor: '#38761d',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10
},
YellowStyle: {
    backgroundColor: '#f1c232',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10
},
YellowishStyle: {
    backgroundColor: '#ce7e00',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10
},
})

export default SettingsScreen;
