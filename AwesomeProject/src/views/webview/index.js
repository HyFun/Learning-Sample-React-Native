// react
import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

// redux
import {useSelector} from 'react-redux';

// 组件
import * as Progress from 'react-native-progress';

const Web = (props) => {
  // ------------------state-------------------
  const url = props.route.params.url || 'https://gank.io/';
  const statusbarHeight = useSelector((state) => {
    return state.headerbar.statusbarHeight;
  });
  const [progress, setProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  // ------------------init-------------------
  const refWebview = useRef();
  const refGoback = useRef(null);
  useEffect(() => {
    refGoback.current = canGoBack;
  }, [canGoBack]);

  useEffect(() => {
    const back = () => {
      if (refGoback.current) {
        refWebview.current.goBack();
      } else {
        props.navigation.goBack();
      }
    };
    BackHandler.addEventListener('hardwareBackPress', back);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', back);
    };
  }, []);

  // ------------------点击方法-------------------
  // ------------------监听方法-------------------
  const onLoadStart = ({nativeEvent}) => {
    setCanGoBack(nativeEvent.canGoBack);
  };
  const onLoadProgress = ({nativeEvent}) => {
    setProgress(nativeEvent.progress);
  };
  const onLoadEnd = ({nativeEvent}) => {};

  return (
    <>
      <View style={{height: statusbarHeight, backgroundColor: '#1D1F20'}} />
      {progress == 1 ? (
        <></>
      ) : (
        <Progress.Bar
          style={{position: 'absolute',left: 0,top:statusbarHeight,width:'100%',zIndex:10}}
          borderWidth={0}
          progress={progress}
          width={null}
          height={3}
          borderRadius={0}
        />
      )}
      <WebView
        ref={refWebview}
        originWhitelist={['*']}
        source={{uri: url}}
        cacheEnabled={false}
        onLoadStart={onLoadStart}
        onLoadProgress={onLoadProgress}
        onLoadEnd={onLoadEnd}
      />
    </>
  );
};

export default Web;
