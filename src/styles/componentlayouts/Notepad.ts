import { StyleSheet } from 'react-native';
import { MainScreenBackground } from '../customstyles/CustomStyles';

const layout = StyleSheet.create({
    containernote: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
        backgroundColor: MainScreenBackground,
    },
    title1: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white",
        alignSelf: "center", 
    },
    noteTitle1: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
    },
    addButtonnote: {
        backgroundColor: "#0b5394",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 8,
    },
    addButtonTextnote: {
        color: "white",
        fontSize: 16,
    },
    clearButtonnote: {
        backgroundColor: "#0b5394",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 8,
    },
    clearButtonTextnote: {
        color: "white",
        fontSize: 16,
    },
    modalContainernote: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    historyButtonContainernote: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    inputnote: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    contentInputnote: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        height: 300,
        textAlignVertical: "top",
    },
    buttonContainernote: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
});

export default layout;
