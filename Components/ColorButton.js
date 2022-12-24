import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View, ToastAndroid } from 'react-native';
import config from './config.js';
import * as Haptics from 'expo-haptics';

const ColorButton = (props) => {
    const [colorhex, setColorhex] = useState(props.color.colorhex);
    const [colorname, setColorname] = useState(props.color.colorname);
    const [isLoading, setLoading] = useState(false);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator style={styles.button} size="large" />
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={[styles.button, { backgroundColor: colorname === 'orange' ? '#ffa500' : colorhex }]} onPress={() => { makeRequest(colorname), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}>
                <Text style={[styles.buttonText, { color: ['hellblau', 'grün', 'weiß', 'gelb'].includes(colorname) ? '#000' : '#fff' },]}>{colorname}</Text>
            </TouchableOpacity>
        );
    }

    function makeRequest(color) {
        setLoading(true);
        fetch(config.baseUrl + config.colorPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: color,
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    ToastAndroid.show('Fehler beim Senden der Anfrage', ToastAndroid.SHORT);
                }
            })
            .finally(() => setLoading(false));
    }
}

const styles = StyleSheet.create({
    button: {
        width: 75,
        height: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    }
});

export default ColorButton;