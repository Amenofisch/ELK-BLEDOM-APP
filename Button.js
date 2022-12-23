import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View, ToastAndroid } from 'react-native';


const CustomButton = (props) => {

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
            <TouchableOpacity style={[styles.button, { backgroundColor: colorhex }]} onPress={() => { makeRequest(colorname) }}>
                <Text style={[styles.buttonText, { color: ['hellblau', 'grün', 'weiß', 'gelb'].includes(colorname) ? '#000' : '#fff' }]}>{colorname}</Text>
            </TouchableOpacity>
        );
    }

    function makeRequest(color) {
        setLoading(true);
        fetch('http://192.168.0.176:5000/color', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: color,
            }),
        })
            .then((response) => { 
                if(response.status !== 200) {
                    ToastAndroid.show('Fehler beim Senden der Anfrage', ToastAndroid.SHORT);
                }
             })
            .finally(() => setLoading(false));
    }
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default CustomButton;