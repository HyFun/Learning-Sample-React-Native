// react
import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
  ImageBackground, TouchableOpacity, TouchableHighlight
} from 'react-native';

// redux
import { useSelector } from 'react-redux';

// 组件
import HeaderBar from '@/components/headerbar/index';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadMore from './LoadMore'

// 工具
import service from '@/http/service';

const Main = (props) => {
  // ------------------data属性---------------------
  // scrollview 距离顶部
  const [offsetTop, setOffsetTop] = useState(0);
  const headerbar = useSelector((state) => {
    return state.headerbar;
  });
  const headerbarMenu = [
    {
      icon: <Icon name="home" size={22} color={'#fff'} />,
      event: (e) => {
        props.navigation.push('Web', { url: 'https://gank.io/' });
      },
    },
  ];

  // ---获取的数据
  const [pageIndex, setPageIndex] = useState(1)
  // 加载更多的状态
  const [loadMoreStatus, setLoadMoreStatus] = useState(LoadMore.StatusDefault)
  // 是否正在加载数据
  const [loading, setLoading] = useState(true)
  // 下拉刷新
  const [refreshing, setRefresh] = useState(false);
  // banner
  const [dataBanner, setBanner] = useState([]);
  // 文章分类
  const [dataArticle, setArticle] = useState([]);
  // 妹纸列表
  const [dataGirls, setGirls] = useState([]);

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
  // ----------------生命周期------------
  useEffect(() => {
    // 获取所有数据
    setLoading(true)
    getAllData();
  }, []);

  //-----------------事件方法-------------------
  /**
   * 点击header返回按钮  也是Android返回键按钮
   */
  const clickBack = () => {
    return true;
  };
  //-----------------事件监听方法-------------------
  /**
   * 页面scrollview滑动的监听
   */
  const onScrollViewScroll = (e) => {
    setOffsetTop(e.nativeEvent.contentOffset.y);
  };

  //-----------------获取数据方法-------------------
  const pageSize = 10;
  /**
   * 获取所有数据
   */
  const getAllData = () => {
    setPageIndex(1)
    Promise.all([
      service.getBanner(),
      service.getArticleClass(),
      service.getGirlList(pageIndex, pageSize),
    ])
      .then((res) => {
        setBanner(res[0]);
        setArticle(res[1]);
        // 判断妹纸列表是否还有下一页
        if (res[2].length >= pageSize) {
          // 说明还有更多
          setLoadMoreStatus(LoadMore.StatusDefault)
          setPageIndex(pageIndex + 1)
        } else {
          // 说明没有了
          setLoadMoreStatus(LoadMore.StatusLoadEnd)
        }
        setGirls(res[2]);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false)
        setRefresh(false)
      });
  };
  /**
   * 获取banner
   */

  /**
   * 获取分类
   */

  /**
   * 获取妹纸列表
   */
  const getGirlsData = () => {
    setLoadMoreStatus(LoadMore.StatusLoading)
    service.getGirlList(pageIndex, pageSize)
      .then(res => {
        const girls = [...dataGirls, ...res]
        setGirls(girls)
        if (res.length >= pageSize) {
          setPageIndex(pageIndex + 1)
          setLoadMoreStatus(LoadMore.StatusDefault)
        } else {
          setLoadMoreStatus(LoadMore.StatusLoadEnd)
        }
      })
      .catch(error => {
        setLoadMoreStatus(LoadMore.StatusLoadFailed)
      })
  }

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <HeaderBar
        title="干货集中营"
        backgroundOpacity={headerbarOpacity}
        fixed={true}
        backEvent={clickBack}
        menu={headerbarMenu}
      />
      <ScrollView
        onScroll={onScrollViewScroll}
        // 是否显示滚动条
        showsVerticalScrollIndicator={false}
        // 下拉刷新
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getAllData}
            progressViewOffset={headerbar.statusbarHeight}
            colors={['#0c4bff']}
          />
        }
      >
        <View style={style.header_container}>
          <Image
            style={style.header_img}
            source={require('@/assets/main/main_header_bg.png')}
            resizeMode="cover"
          />
          <View
            style={{
              ...style.header_baner_container,
              top: headerbar.headerbarHeight,
            }}>
            <View
              style={{
                ...style.header_baner,
                height: 300 - headerbar.headerbarHeight - 10,
              }}>
              <Swiper
                key={dataBanner.length}
                height={300 - headerbar.headerbarHeight - 10}
                horizontal={true}
                loop={true}
                autoplay={true}
                autoplayTimeout={4}
                showsButtons={false}
                showsPagination={false}
                removeClippedSubviews={false}>
                {
                  dataBanner.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}>
                        <ImageBackground
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/assets/img_default.png')}
                          resizeMode="cover">
                          <Image
                            source={{ uri: item.image }}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                          />
                        </ImageBackground>
                        <Text
                          style={{
                            position: 'absolute',
                            left: 10,
                            bottom: 10,
                            color: '#fff',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  })
                }
              </Swiper>
            </View>
          </View>
        </View>
        <View style={style.main_container}>
          <View style={style.main_title_wrap}>
            <Text style={style.main_title}>文章分类</Text>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            {
              dataArticle.map((item, index) => {
                return (
                  <TouchableHighlight key={item._id} style={{ width: '50%' }}>
                    <View
                      style={{ marginTop: 10, marginLeft: index % 2 === 0 ? 0 : 5, marginRight: index % 2 === 0 ? 5 : 0, borderRadius: 10, overflow: 'hidden' }}
                    >
                      <Image
                        source={{ uri: item.coverImageUrl }}
                        resizeMode="cover"
                        style={{ width: '100%', height: 90 }}
                      />
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </View>

        <View style={style.main_container}>
          <View style={style.main_title_wrap}>
            <Text style={style.main_title}>妹纸</Text>
          </View>
          <View
            style={{ marginTop: 10 }}>
            {
              dataGirls.map((item, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    style={{ padding: 10, marginBottom: 10, backgroundColor: '#f5f5f5', borderRadius: 5 }}>
                    <View>
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 5, backgroundColor: '#2c63ff', color: '#fff', marginRight: 10, fontSize: 14 }}>妹纸</Text>
                        <Text style={{ fontSize: 18 }}>妹子图{item.title}</Text>
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 16 }} numberOfLines={2}>{item.desc}</Text>
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <ImageBackground source={require('@/assets/img_default.png')} style={{ width: '100%', height: 200 }}>
                          <Image source={{ uri: item.url }} style={{ width: '100%', height: '100%' }} resizeMode={'cover'} />
                        </ImageBackground>
                      </View>
                      {/* <View style={{ marginTop: 5 }}>
                        <Text style={{ textAlign: 'right' }}>{item.publishedAt.substring(0, 10)}</Text>
                      </View> */}
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
          <LoadMore status={loadMoreStatus} onLoadMore={getGirlsData} />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  header_container: {
    position: 'relative',
  },
  header_img: {
    width: '100%',
    height: 300,
  },
  header_baner_container: {
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_baner: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  main_container: {
    padding: 16
  },
  main_title_wrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  main_title: {
    width: 0,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Main;
