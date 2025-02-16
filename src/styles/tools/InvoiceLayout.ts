import { StyleSheet } from "react-native";

export const invoiceLayout = StyleSheet.create ({
    Header: {
        width: '100%',
        height: 40,
        backgroundColor: '#111',
        top: 0,
        position: 'absolute'
    },
    headerButton: {
        right: -0,
        position: 'absolute',
        marginTop: 5,
        marginRight: 17,
        zIndex: 1
    },
    drawContainer: {
        position: 'absolute',
        right: 0,
        padding: 10,
        width: 250,
        height: '105%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)', 
    },
    drawBackContainer: {
        position: 'absolute',
        right: 0,
        padding: 10,
        width: '100%',
        height: '105%',
        backgroundColor: 'rgba(0, 0, 0, 0)', 
    },
    drawMenuText: {
        alignSelf: 'center',
        color: 'white',
        position: 'absolute',
        margin: 30,
        fontSize: 26
    },
    AddIcon: {
        width: '100%',
        height: 50,
        backgroundColor: '#0b5394',
        marginTop: 80,
        borderRadius: 20,
        alignContent: 'center'
    },
    AddCustomerDetails: {
        width: '100%',
        height: 50,
        backgroundColor: '#0b5394',
        marginTop: 10,
        borderRadius: 20,
        alignContent: 'center'
    },
    AddCompanyDetails: {
        width: '100%',
        height: 50,
        backgroundColor: '#0b5394',
        marginTop: 10,
        borderRadius: 20,
        alignContent: 'center'
    },
    Download: {
        width: '47%',
        height: 50,
        backgroundColor: '#0b5394',
        marginTop: 10,
        borderRadius: 20,
        alignContent: 'center'
    },
    Print: {
        width: '47%',
        height: 50,
        backgroundColor: '#0b5394',
        marginTop: 10,
        margin: 10,
        borderRadius: 20,
        alignContent: 'center'
    },
    ButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 1,
        marginTop: 12
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
    ColorButtons: {
        marginTop: 10,
        marginRight: 68,
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        left: 56
    },
    pdfViewer: {
        flex: 1,
        marginTop: 16,
    },
    pdfContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
   });

   export default invoiceLayout;