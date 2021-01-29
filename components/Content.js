import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
    useFonts
} from "@expo-google-fonts/manrope";



export default function Content(props) {
    let weather = props.value;
    let backgroundCard = '#ffd500';
    let pollutionLevel = ""
    if(weather.current.pollution.aqius <= 50 ){
        backgroundCard = '#a8e05f'
        pollutionLevel = "Good"
    }else if (weather.current.pollution.aqius <= 100){
        backgroundCard = '#fdd64b'
        pollutionLevel = "Moderate"
    }else if(weather.current.pollution.aqius <= 150 ){
        backgroundCard = '#ff9b57'
        pollutionLevel = "High"
    }else{
        backgroundCard = '#fe6a69'
        pollutionLevel = "Unhealthy"
    }
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
            <View style={styles.container}>
                <View style={{borderRadius: 30,
                    width: '80%',
                    height: 110,
                    opacity: 0.9,
                    backgroundColor: backgroundCard}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{marginLeft: 15, width: 100, height: 110}}>
                            <Text style={{
                                marginTop: 10,
                                textAlign: 'center',
                                fontSize: 14,
                                color: '#777',
                                fontFamily: 'Manrope_300Light'
                            }}>US AQI</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 42,
                                color: '#555',
                                fontFamily: 'Manrope_300Light'
                            }}>{weather.current.pollution.aqius}</Text>
                        </View>
                        <View
                            style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: 160, height: 110}}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 30,
                                color: '#555',
                                fontFamily: 'Manrope_300Light'
                            }}>{pollutionLevel}</Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
    },
})
