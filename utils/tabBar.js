export function setTabSelected(that, selectedValue) {
    if (typeof that.getTabBar === 'function' &&
        that.getTabBar()) {
        that.getTabBar().setData({
          selectedValue
        })
      }
  }