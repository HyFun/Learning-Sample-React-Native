import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';

const HeaderBar = (props) => {
  // ----------------初始化-----------------
  // 高度
  const headerbar = useSelector((state) => {
    return state.headerbar;
  });
  useEffect(() => {
    // 返回按钮监听事件
    BackHandler.addEventListener('hardwareBackPress', clickBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', clickBack);
    };
  }, []);
  // ----------------配置-----------------
  const config = {
    fixed: props.fixed ? true : false,
    opacity: props.opacity === undefined ? 1 : props.opacity,
    backShow: props.backShow || false,
    backIcon: props.backIcon || '',
    backEvent: props.backEvent || (() => false),
    backgroundColor: props.backgroundColor || [25, 29, 66],
    backgroundOpacity:
      props.backgroundOpacity === undefined ? 1 : props.backgroundOpacity,
    color: props.color || '#fff',
    title: props.title || '',
    subTitle: props.subTitle || '',
    menu: props.menu || [],
  };
  // ----------------页面-----------------
  // 返回按钮
  let viewBack = undefined;
  if (config.backShow) {
    if (config.backIcon) {
      viewBack = (
        <TouchableOpacity onPress={clickBack}>
          <View style={{...style.leftMenu}}>{config.backIcon}</View>
        </TouchableOpacity>
      );
    } else {
      viewBack = (
        <TouchableOpacity onPress={clickBack}>
          <View style={{...style.leftMenu}}>
            <Icon name="arrow-back-ios" size={20} color={config.color} />
          </View>
        </TouchableOpacity>
      );
    }
  }

  // 标题
  const viewTitle = [];
  if (config.title) {
    viewTitle.push(
      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        key="title"
        style={{...style.title, color: config.color}}>
        {config.title}
      </Text>,
    );
  }
  if (config.subTitle) {
    viewTitle.push(
      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        key="subtitle"
        style={{...style.subTitle, color: config.color}}>
        {config.subTitle}
      </Text>,
    );
  }

  // 右侧菜单
  const viewMenu = [];
  config.menu.forEach((item, index) => {
    viewMenu.push(
      <TouchableOpacity
        key={index}
        onPress={(e) => {
          item.event(e);
        }}>
        <View style={style.rightMenuItem}>{item.icon}</View>
      </TouchableOpacity>,
    );
  });

  // ----------------事件-----------------
  /**
   * 点击返回按钮的点击事件
   */
  const clickBack = (e) => {
    if (config.backEvent && typeof config.backEvent === 'function') {
      const result = config.backEvent(e);
      return result;
    }
    return false;
  };

  return (
    <View
      style={{
        ...style.container,
        backgroundColor: `rgba(${config.backgroundColor},${config.backgroundOpacity})`,
        opacity: config.opacity,
        position: config.fixed ? 'absolute' : 'relative',
      }}>
      <View style={{height: headerbar.statusbarHeight}} />
      <View style={{...style.status, height: headerbar.headerHeight}}>
        {/* 左侧返回按钮 */}
        {viewBack}
        {/* 标题 */}
        <View style={style.titleBox}>{viewTitle}</View>
        {/* 右侧菜单按钮 */}
        <View style={{...style.rightMenu}}>{viewMenu}</View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'relative',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 99,
  },
  status: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 60,
    position: 'relative',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftMenu: {
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {},
  rightMenu: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  rightMenuItem: {
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  }
});

export default HeaderBar;
