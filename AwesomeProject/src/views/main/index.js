import React, {useMemo, useState} from 'react';

import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
  Back
} from 'react-native';

import {useSelector} from 'react-redux'

import HeaderBar from '@/components/headerbar/index';

const Main = () => {
  // ------------------data属性---------------------
  const [offsetTop, setOffsetTop] = useState(0);
  const headerbar = useSelector((state)=>{
      return state.headerbar
  })

  // ----------------计算属性------------
  const headerbarOpacity = useMemo(() => {
    let opacity = 0;
    if (offsetTop >= 260) {
      opacity = 1;
    } else if (offsetTop <= 0) {
      opacity = 0;
    } else {
      opacity = offsetTop / 260;
    }
    return opacity;
  }, [offsetTop]);



  //-----------------事件方法-------------------
  /**
   * 点击header返回按钮  也是Android返回键按钮
   */
  const clickBack = () =>{
    return true
  }
  //-----------------事件监听方法-------------------
  const onScrollViewScroll = (e) => {
    setOffsetTop(e.nativeEvent.contentOffset.y);
  };
  return (
    <View>
      <HeaderBar title="我爱一条柴" backgroundOpacity={headerbarOpacity} fixed={true} backEvent={clickBack}/>
      <ScrollView onScroll={onScrollViewScroll}>
        <View style={style.header_container}>
            <Image style={style.header_img} source={require('@/assets/main/main_header_bg.png')} resizeMode="cover"/>
            <View style={{...style.header_baner_container,top: headerbar.headerbarHeight}}>
                <View style={{...style.header_baner,height: 300-headerbar.headerbarHeight-10}}></View>
            </View>
        </View>
        <Text style={style.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
    header_container: {
        position: 'relative'
    },
    header_img: {
        width: '100%',
        height: 300
    },
    header_baner_container: {
        position: 'absolute',
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_baner: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
  text: {
    fontSize: 42,
  },
});

export default Main;
