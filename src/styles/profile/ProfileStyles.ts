import {StyleSheet} from 'react-native';
import { MainScreenBackground } from '../customstyles/CustomStyles';

const profilestyles = StyleSheet.create({
  tabNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#191919',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
    container: {
      flex: 1,
      backgroundColor: MainScreenBackground,
    },
    profileHeader: {
      alignItems: 'center',
      padding: 20,
      margin: 10
    },
    imageContainer: {
      //marginBottom: 10,
    },
    profileImage: {
      width: 200,
      height: 200,
      margin: 10,
      borderRadius: 60,
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      padding: 15,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    aboutMeContainer: {
      marginVertical: 20,
      padding: 15,
    },
    aboutMeText: {
      fontSize: 16,
      lineHeight: 24,
      color: '#333',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
    },
    aboutMeInput: {
      minHeight: 120,
      textAlignVertical: 'top',
    },
    button: {
      width: '100%',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    errorText: {
      color: '#dc3545',
      textAlign: 'center',
      marginTop: 10,
      padding: 10,
    },
    tabIndicator: {
      backgroundColor: '#007bff',
      height: 3,
    },
    placeholder: {
      width: 160,
      height: 160,
      backgroundColor: '#f0f0f0',
      borderRadius: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderStyle: 'dashed',
    },
    placeholderText: {
      color: '#888',
      fontSize: 12,
      marginTop: 5,
      textAlign: 'center',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
});
  export default profilestyles;