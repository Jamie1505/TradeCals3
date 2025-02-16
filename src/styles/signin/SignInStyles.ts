import { StyleSheet } from "react-native";
import { MainScreenBackground } from "../customstyles/CustomStyles";

const signinstyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: MainScreenBackground,
    },
    content: {
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 15,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    button: {
      width: '100%',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    toggleText: {
      color: '#007bff',
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    successText: {
      color: 'green',
      marginTop: 10,
    },
  });

  export default signinstyles;