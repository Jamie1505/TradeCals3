import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MainScreenBackground } from "../../../styles/customstyles/CustomStyles";

const PremiumScreen= () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buy Premium</Text>
                <View style={styles.container1}>
            <Text style={styles.title}>Watch 30 secound ad for 6 hours of premium</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainScreenBackground,
    },
    container1: {
        flex: 1,
        backgroundColor: MainScreenBackground,
        marginTop: 10
    },
    title: {
            color: 'red',
            fontSize: 32,
            textAlign: 'center',
    },
});

export default PremiumScreen;