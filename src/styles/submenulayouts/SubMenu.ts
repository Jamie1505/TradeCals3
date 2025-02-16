import { StyleSheet } from 'react-native';

const Submenu = StyleSheet.create({
    Submenubuttons: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#0b5394',  // Change background color
        borderRadius: 10,  // Rounded corners
        paddingVertical: 15,
        paddingHorizontal: 15,
      },
      SubmenubuttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      },
      //////notes container
      Submenucontainer: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        paddingBottom: 10,
        //justifyContent: 'center',
        //padding: 20,
      },
});

export default Submenu;

