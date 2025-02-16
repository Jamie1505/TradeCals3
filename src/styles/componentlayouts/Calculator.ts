import { StyleSheet } from 'react-native';
import { MainScreenBackground } from '../customstyles/CustomStyles';

const Calculayout = StyleSheet.create({
    containerCal: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: MainScreenBackground,
      paddingBottom: 50,
    },
    scrollViewContainerCal: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    resultContainerCal: {
      backgroundColor: '#282c34',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: 'flex-end',
    },
    resultCal: {
      color: '#fff',
      fontSize: 36,
      textAlign: 'right',
    },
    buttonContainerCal: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    buttonCal: {
      width: '20%',
      padding: 20,
      margin: 5,
      backgroundColor: '#4caf50',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonTextCal: {
      fontSize: 24,
      color: '#fff',
    },
    historyContainerCal: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    historyTitleCal: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white'
    },
    historyItemCal: {
      fontSize: 16,
      color: '#333',
    },
    noHistoryCal: {
      fontSize: 16,
      color: '#999',
    },
    clearHistoryButtonCal: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#ff5c5c', // Red color for clear history button
      borderRadius: 5,
      alignItems: 'center',
    },
    clearHistoryButtonTextCal: {
      color: '#fff', // White text color
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Calculayout;

