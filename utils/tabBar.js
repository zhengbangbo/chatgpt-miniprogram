export function setTabSelected(that, selectedValue) {
    if (typeof that.getTabBar === 'function' &&
        that.getTabBar()) {
        that.getTabBar().setData({
            selectedValue
        })
    }
}

export function hideTabBarDebounce(that) {
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
        debounce(
            that.getTabBar().setData({
                isHidden: true
            })
            , 2000)
        debounce(
            that.setData({
                showTabBarFlag: false
            }), 2000)
    }
}

export function showTabBarDebounce(that) {
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
        debounce(
            that.getTabBar().setData({
                isHidden: false
            }), 2000)
        debounce(
            that.setData({
                showTabBarFlag: true
            }), 2000)
    }
}

function debounce(event, wait) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer); // 清除setTimeout，使其回调函数不执行
        timer = setTimeout(() => {
            event.apply(this, args)
        }, wait)
    }
}