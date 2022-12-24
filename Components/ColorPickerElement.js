import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View, ToastAndroid } from 'react-native';
import config from './config.js';
import * as Haptics from 'expo-haptics';
import ColorPicker from 'react-native-wheel-color-picker';


const ColorPickerElement = () => {
    const [isLoading, setLoading] = useState(false);
    const [color, setColor] = useState('#ffffff');

    return (
        <ColorPicker
            style={{ height: 400, width: 400 }}
            thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
            swatches={true}
            initalColor={color}
            sliderHidden={false}
            onColorChange={color => setColor(color)}
            onColorChangeComplete={c => makeRequest(c.replace('#', ''))}
        />
    );

    function makeRequest(color) {
        setLoading(true);
        fetch(config.baseUrl + config.colorPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: color,
                mode: "custom"
            }),
        }).finally(() => setLoading(false));
    }
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 250,
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

export default ColorPickerElement;