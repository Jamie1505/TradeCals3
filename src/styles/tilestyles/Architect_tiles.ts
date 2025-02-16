import {StyleSheet} from 'react-native'
import { ArchitectSubTilecolor, MainScreenBackground } from '../customstyles/CustomStyles';

const Architect_tiles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: MainScreenBackground,
    },
    container: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 60,
      backgroundColor: MainScreenBackground,
    },
    wrappercontainer: {
      padding: 20,
      paddingBottom: 65,
      paddingTop: 17,
      backgroundColor: MainScreenBackground,
    },
    tile: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginVertical: 8,
      backgroundColor: ArchitectSubTilecolor,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
      flex: 1,
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: ArchitectSubTilecolor,
    },
    favoriteButtonActive: {
      backgroundColor: ArchitectSubTilecolor,
    }
  });
  
  export default Architect_tiles;