// react
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, ToastAndroid} from 'react-native';

const Splash = (props) => {
  const [times, setTimes] = useState(2);
  const countRef = useRef();
  // 初始化
  useEffect(() => {
    countRef.current = times;
  }, [times]);

  useEffect(() => {
    // navigation
    const timmer = setInterval(() => {
      const current = countRef.current - 1;
      if (current >= 0) {
        setTimes(countRef.current - 1);
      } else {
        clearInterval(timmer);
        props.navigation.navigate('Main')
      }
    }, 1000);
    return () => {
      clearInterval(timmer);
    };
  }, []);

  return (
    <View style={style.container}>
      <Image
        style={style.image}
        source={require('@/assets/splash.jpg')}
        resizeMode="cover"
      />
      {/* <View style={style.time}>
        <Text style={{color: '#fff'}}>{times}</Text>
      </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  time: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    color: '#fff',
  },
});

export default Splash;
