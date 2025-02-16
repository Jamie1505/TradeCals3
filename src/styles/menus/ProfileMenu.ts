import { StyleSheet } from "react-native";

export const ProfileMenuStyle = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
    Profileimagecontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Profileimageplaceholder: {
      width: 60,
      height: 60,
      marginTop: 0,
      marginBottom: 10,
      borderRadius: 100,
      backgroundColor: '#e0e0e0', // Placeholder background color
      justifyContent: 'center',
      alignItems: 'center',
    },
    ProfileimageplaceholderText: {
      color: '#888',
      textAlign: 'center',
    },
    Profileimage: {
      width: 60,
      height: 60,
      marginTop: 0,
      marginBottom: 10,
      borderRadius: 100,
    },
    formContainer: {
      position: 'absolute',
      backgroundColor: '#000019',
      padding: 10,
      margin: 10,
      bottom: 60,
      borderRadius: 20,
      zIndex: 10,
      
    },
    formContainerportrait: {
      width: '60%',
      right: 10
    },
    formContainerlandscape: {
      width: '50%',
      height: '70%',
      alignSelf: 'center',
    },
    Profilebutton: {
      backgroundColor: '#25945d', // Nice green color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 15,
      elevation: 5, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    SignIn: {
      backgroundColor: '#25945d', // Nice green color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 15,
      elevation: 5, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    Premium: {
      backgroundColor: '#25945d', // Nice green color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 15,
      elevation: 5, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    Settingsbutton: {
      backgroundColor: '#25945d', // Nice green color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 15,
      elevation: 5, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });