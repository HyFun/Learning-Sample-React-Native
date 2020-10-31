import React, { useState } from 'react'
import { TouchableHighlight, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const LoadMore = (props) => {
    const status = props.status || LoadMore.StatusDefault
    const getData = props.onLoadMore || (()=>{})

    let view = undefined
    if (status === LoadMore.StatusDefault) {
        view = (
            <TouchableOpacity onPress={()=>{getData()}}>
                <Text style={{ ...style.text }}>点击加载更多</Text>
            </TouchableOpacity>
        )
    } else if (status === LoadMore.StatusLoading) {
        view = (<Text style={{ ...style.text }}>正在加载中...</Text>)
    } else if (status === LoadMore.StatusLoadEnd) {
        view = (<Text style={{ ...style.text }}>已经没有更多数据了</Text>)
    } else if (status === LoadMore.StatusLoadFailed) {
        view = (<TouchableOpacity onPress={()=>{getData()}}>
            <Text style={{ ...style.text }}>加载失败,点我重试</Text>
        </TouchableOpacity>)
    }

    return (
        <View style={props.style || {}}>
            {view}
        </View>
    )
}

LoadMore.StatusDefault = 'StatusDefault'
LoadMore.StatusLoading = 'StatusLoading'
LoadMore.StatusLoadEnd = 'StatusLoadEnd'
LoadMore.StatusLoadFailed = 'StatusLoadFailed'

const style = StyleSheet.create({
    text: {
        color: '#737373',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    styleDefault: {

    }
})

export default LoadMore

