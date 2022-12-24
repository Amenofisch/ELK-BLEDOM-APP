import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import PowerButton from './Components/PowerButton';
import ColorButton from './Components/ColorButton';
import config from './Components/config.js';
import BrightnessSlider from './Components/BrightnessSlider';


export default function App() {

    const [colors, setColors] = useState([]);

    // fetch all colors from the server
    useEffect(() => {
        fetch(config.baseUrl + config.colorPath)
            .then((response) => response.json())
            .then((json) => {
                setColors(json);
            })
            .catch((error) => console.error(error))
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ELK-BLEDOM</Text>
                <Text style={styles.subtitle}>by Amenofisch</Text>
                <Text style={styles.subtitle}>Version 1.1.0</Text>
                <View style={styles.controls}>
                    <PowerButton color="#e74c3c" value={false} />
                    <BrightnessSlider />
                    <PowerButton color="#2ecc71" value={true} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    {colors.map((color, idx) => (
                        <ColorButton key={idx} color={color} />
                    ))}
                </View>
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
    controls: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
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
        textAlign: 'center',
    },
    subtitle: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    content: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    buttonContainer: {
        flex: 3,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
});
