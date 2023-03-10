import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import config from './Components/config.js';
import PowerButton from './Components/PowerButton.js';
import BrightnessSlider from './Components/BrightnessSlider.js';
import ColorPickerElement from './Components/ColorPickerElement.js';
import ColorButton from './Components/ColorButton.js';

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
        <SafeAreaProvider>
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
                        <ColorPickerElement />
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
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
        margin: 10,
        paddingVertical: 10,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
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
        backgroundColor: '#2c3e50',
        borderRadius: 20,
        margin: 10,
        maxHeight: 425,
    }
});
