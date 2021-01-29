import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native'
import {
    useFonts,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';


export default function Header(props){
        let weather = props.value;
        let imgSource = require('../assets/sunny.png')
        if(weather.current.weather.ic === '01d'){
            imgSource = require('../assets/sunny.png')
        }else if(weather.current.weather.ic === '01n'){
            imgSource = require('../assets/night.png')
        }else if(weather.current.weather.ic === '02d'){
            imgSource = require('../assets/sunnyclouds.png')
        }else if(weather.current.weather.ic === '03d' || weather.current.weather.ic === '04d'){
            imgSource = require('../assets/clouds.png')
        }else if(weather.current.weather.ic === '09d'){
            imgSource = require('../assets/rain.png')
        }else if(weather.current.weather.ic === '10n'){
            imgSource = require('../assets/nightrain.png')
        }else if(weather.current.weather.ic === '01n'){
            imgSource = require('../assets/night.png')
        }else {
            imgSource = require('../assets/sunnyclouds.png')
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
                <View>
                    <Text style={styles.text}>Local Air Quality</Text>
                    <Image style={styles.weatherImg} source={imgSource}/>
                    <Text style={styles.celsius}>{weather.current.weather.tp} &#8451;</Text>
                    <Text style={styles.city}>{weather.city}, {weather.country}</Text>

                </View>

            )
        }
    // }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Manrope_300Light',
        marginTop: 50,
        margin:5,
        fontSize: 24,
        textAlign: 'center',
        color: "#fff",

    },
    celsius: {
        fontSize: 48,
        fontFamily: 'Manrope_600SemiBold',
        fontWeight: '800',
        textAlign: 'center',
        color: "#fff",
        marginTop: 10,
    },
    city: {
        fontSize: 22,
        textAlign: 'center',
        color: "#ccc",
        fontFamily: 'Manrope_300Light',
    },
    weatherImg: {
        marginTop: 5,
        width: 90,
        height: 90,
        alignSelf: 'center'

    }
})
