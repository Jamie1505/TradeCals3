import { Text, View, StyleSheet } from "react-native";
import { MainScreenBackground } from "../../../styles/customstyles/CustomStyles";

const HelpandFeedbackScreen= () => {
    console.log('HelpandFeedbackScreen');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help and Feedback</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 10,
        backgroundColor: MainScreenBackground
    },
    title: {
            color: 'red',
            fontSize: 32,
            textAlign: 'center',
    },
});

export default HelpandFeedbackScreen;