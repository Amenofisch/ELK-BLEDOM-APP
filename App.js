import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import CustomButton from './Button.js';

export default function App() {

    const [colors, setColors] = useState([]);

    // fetch all colors from the server
    useEffect(() => {
        fetch('http://pi.amenofisch.dev/color')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setColors(json);
            })
            .catch((error) => console.error(error))
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ELK-BLEDOM</Text>
                <Text style={styles.subtitle}>by Amenofisch</Text>
                <Text style={styles.subtitle}>Version 1.0.0</Text>
            </View>
            <View style={styles.buttonContainer}>
                {colors.map((color, idx) => (
                    <CustomButton key={idx} color={color} />
                ))}
            </View>
            <StatusBar style="auto" hidden={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7f8c8d',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 14,
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    }
});
