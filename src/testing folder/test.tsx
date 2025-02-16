import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Settings = () => {
    return (
        <View style={{flex:1, padding: 20}}>
            <Text style={{fontSize: 20}}>Hello World</Text>
            <TouchableOpacity 
            style={{width: 100, height: 50}}
            onPress={() => console.log('Press Me')}
            >
                <Text>Press Me</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Settings