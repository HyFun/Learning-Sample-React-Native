export default {
    // 设置状态栏高度
    SET_HEADERBAR_HEIGHT(state,value) {
        state.headerbar.statusbarHeight = value
        state.headerbar.headerHeight = 60
        state.headerbar.headerbarHeight = value + 60
        return state
    }
}