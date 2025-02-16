import {Dimensions, StyleSheet} from 'react-native';
import { MainScreenBackground, ArchitectSubTilecolor } from '../customstyles/CustomStyles';
const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = (SCREEN_WIDTH / 4) - 20;

const FaveStyle = StyleSheet.create({
  portrait: {
  },
  landscape: {
    //form size
    alignSelf: 'center',
    width: 340
  },
  formContainer: {
    position: 'absolute',
    backgroundColor: '#000019',
    padding: 10,
    margin: 10,
    bottom: 60,
    borderRadius: 20,
    zIndex: 10
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  faveButton: {
    width: BUTTON_WIDTH,
    height: 60,
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#ff4c4c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  faveButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  emptySlot: {
    width: BUTTON_WIDTH,
    height: 60,
    margin: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#AAAAAA',
  },
  emptySlotText: {
    fontSize: 36,
    color: '#AAAAAA',
  },
  normalButton: {
    margin: 5,
    width: BUTTON_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
    borderRadius: 10,
  },
  normalButtonContent: {
    alignItems: 'center',
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: MainScreenBackground,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: ArchitectSubTilecolor,
      borderRadius: 30,
      padding: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    favoriteButtonActive: {
      backgroundColor: ArchitectSubTilecolor, // Active state background color
    },
  });
  export default FaveStyle;