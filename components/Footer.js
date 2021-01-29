import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
    useFonts
} from "@expo-google-fonts/manrope";


export default function Footer(props){
    let weather = props.value;
    let [fontsLoaded] = useFonts({
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    });
    if (!fontsLoaded) {
        return <Text>Is Loading</Text>
    } else {
        return (
            <View style={styles.main}>
                <Text style={styles.heading}>Additional information</Text>
                <View style={styles.container}>
                    <Text style={styles.additionalInfo}>Wind: {weather.current.weather.ws}m/s</Text>
                    <Text style={styles.additionalInfo}>Humidity: {weather.current.weather.hu}%</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.additionalInfo}>Atm pressure: {weather.current.weather.pr}hPa</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent: 'flex-end',
        marginBottom:30,
    },
    container: {
        marginHorizontal: 30,
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    heading: {
        marginLeft: 30,
        margin: 10,
        fontSize: 22,
        textAlign: 'left',
        fontFamily: 'Manrope_500Medium',
        color: "#fff"
    },
    additionalInfo: {
        fontSize: 16,
        color: "#ccc",
        fontFamily: 'Manrope_300Light',
    },

})
