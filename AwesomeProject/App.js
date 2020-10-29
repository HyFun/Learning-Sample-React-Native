// react
import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';

// redux
import {Provider, useDispatch} from 'react-redux';
import store from '@/store/index';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import RouteConfig from '@/router/config';
// const AppNavigatorRoot  = createStackNavigator(RouteConfig, StackNavigatorConfig);
// const Navigator = createAppContainer(AppRoot)
const routerView = []
RouteConfig.forEach((item,index)=>{
  routerView.push(<Stack.Screen key={index} name={item.name} component={item.component} options={{headerShown:false}}/>)
})

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // 获取状态栏高度
    const statusbarHeight = StatusBar.currentHeight;
    dispatch({type: 'SET_HEADERBAR_HEIGHT', value: statusbarHeight});
  }, []);
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          {routerView}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
