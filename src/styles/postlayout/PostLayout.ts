import { StyleSheet } from 'react-native';
import { MainScreenBackground } from '../customstyles/CustomStyles';

const postlayout = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: MainScreenBackground,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },

    hiddenPicker: {
      opacity: 0,  // Completely transparent
      position: 'absolute',  // Keeps it out of visible space
      width: 1,  // Small width to avoid layout impact
      height: 1,
    },
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingLeft: 10,
      color: 'white'
    },
    picker: {
      height: 40,
      width: '50%',
    },
    list: {
      marginTop: 0,
    },
    questionContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      
    },
    questionText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 5,
      marginTop: 5,
      padding: 10,
      borderTopWidth: 1.5,
      borderBottomWidth: 1.5
    },
    statText: {
      fontSize: 14,
      color: 'gray',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    iconButton: {
      padding: 8,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeButton: {
      backgroundColor: '#0b5394',
    },

    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
    },

    countText: {
      marginLeft: 5,
      fontSize: 16,
    },

    replyItem: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#0b5394',
      marginVertical: 2,
      borderRadius: 5,
      color: 'white',
    },
    repliesList: {
      marginTop: 10,
    },
    toggleButton: {
      backgroundColor: '#0b5394',
      padding: 10,
      borderRadius: 30,
      position: 'absolute',
      bottom: 16,
      right: 16,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      position: 'absolute',
      left: 16,
      right: 16,
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: '#737373',
      zIndex: 10,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      //textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 5,
      paddingHorizontal: 8,
      borderRadius: 5,
    },
    submitButton: {
      backgroundColor: '#0b5394',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    submitReplyButton: {
      backgroundColor: '#0b5394',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    submitReplyButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    wordcount: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 5,
    },
    LeftDraw: {
zIndex: 1,
    },

    DrawContainer: {
      position: 'absolute',
      right: 0,
      padding: 10,
      width: 250,
      height: '105%',
      backgroundColor: 'rgba(0, 0, 0, 0.95)', 
      zIndex: 1,
    },
    DrawTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 10,
      color: "white"
      //textAlign: 'center',
    },
    DrawButtons: {
      zIndex: 1,
      marginTop: 10,
      marginHorizontal: 10,
      backgroundColor: '#0b5394',  // Change background color
      borderRadius: 10,  // Rounded corners
      paddingVertical: 15,
      paddingHorizontal: 15,
      
    },
    DrawButtonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      zIndex: 1,
    },
    DrawNotch: {
      position: 'absolute',
      width: 20, // Width of the notch
      height: '80%', // Height of the notch
      backgroundColor: 'rgba(0, 0, 0, 0)', // Color and transparency
      top: '10%', // Vertically center the notch
      left: -20, // Position the notch outside the drawer
      zIndex: 1,
      //borderTopLeftRadius: 15, // Rounded edges for a nice effect
      //borderBottomLeftRadius: 15,
    },







    Signin:{
        backgroundColor: '#0b5394',
        padding: 10,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '44%',

    },

    SigninText:{
      color: 'white',
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },


    Signout:{
      backgroundColor: '#0b5394',
      padding: 10,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10,
      borderRadius: 5,
      width: '43%',
      alignItems: 'center',
      
  },

  SignoutText:{
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }

  });
  export default postlayout;