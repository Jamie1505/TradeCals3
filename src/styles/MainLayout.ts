import {StyleSheet } from 'react-native';
import { MainScreenBackground } from './customstyles/CustomStyles';

const Mainlayout = StyleSheet.create({
  MainNav: {
    flex: 1,
    backgroundColor: MainScreenBackground
  },
  ProfileloggedOut: {
    backgroundColor: 'transparent',
    width: 31,
    height: 31,
    borderRadius: 100,
    right: -40,
  },
  ProfileloggedIn: {
    backgroundColor: 'green',
    width: 31,
    height: 31,
    borderRadius: 100,
    right: 40,
    top: 8,
    position: 'absolute'
  },
  Profileportrait: {
    top: 4
  },
  Profilelandscape: {
    top: 8
  },
  TabBarPortrait: {
    paddingTop: 5,
    position: 'absolute',
    backgroundColor: '#191919',
    height: 50,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#191919',
    zIndex: 500,
  },
  TabBarLandscape: {
    alignContent: 'center',
    backgroundColor: '#191919',
    height: 50,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#191919',
    zIndex: 500,
    width: 350,
    margin: -60
  }
});
export default Mainlayout;