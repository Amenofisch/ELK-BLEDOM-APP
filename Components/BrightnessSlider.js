import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View, ToastAndroid, Text } from 'react-native';
import config from './config.js';
import bulbIcon from '../assets/bulb-icon.png';


const BrightnessSlider = (props) => {
    const [sliderBrightness, setSliderBrightness] = useState(100);
    const [isLoading, setLoading] = useState(false);

    return (
        <View style={[{ paddingTop: 25 }]}>
            <Slider style={{ width: 200, height: 15 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setSliderBrightness(value)}
                onSlidingComplete={(value) => makeRequest(value)}
                value={sliderBrightness}
                disabled={isLoading}
            />
            <Text style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center' }}><>{Math.round(sliderBrightness)}</></Text>
        </View>
    );

    function makeRequest(value) {
        console.log(value);
        setLoading(true);
        fetch(config.baseUrl + config.brightnessPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: Math.round(value),
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

export default BrightnessSlider;