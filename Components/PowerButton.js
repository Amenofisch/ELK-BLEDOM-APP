import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View, ToastAndroid } from 'react-native';
import config from './config.js';
import * as Haptics from 'expo-haptics';


const PowerButton = (props) => {
    const [isLoading, setLoading] = useState(false);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator style={styles.button} size="large" />
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]} onPress={() => { makeRequest(props.value), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}>
                <Text style={styles.buttonText}>{props.value ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
        );
    }

    function makeRequest(value) {
        setLoading(true);
        fetch(config.baseUrl + config.powerPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: value,
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
        width: 80,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    }
});

export default PowerButton;