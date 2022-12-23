import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text } from 'react-native';

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={[
            styles.button, { backgroundColor: props.color.colorhex}
        ]} onPress={() => {makeRequest(props.color.colorname)}}>
        <Text style={[{color: props.color.colorname == 'weiß' ? '#000' : '#fff'}, styles.buttonText]}>{props.color.colorname}</Text>
        </TouchableOpacity>
    );
}

function makeRequest(color) {
    fetch('http://192.168.0.176:5000/color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            color: color,
        }),
    })
    .then((response) => console.log(response))  
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
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CustomButton;