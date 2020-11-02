import React from 'react';
import {ActivityIndicator, View} from 'react-native';
const Loading = () => {
    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <ActivityIndicator size={'small'} color="#2c63ff"/>
        </View>
    );
};
export default Loading;
