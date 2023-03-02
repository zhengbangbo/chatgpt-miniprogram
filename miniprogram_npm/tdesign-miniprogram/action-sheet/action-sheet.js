var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { chunk } from '../common/utils';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { ActionSheetTheme, show } from './show';
import props from './props';
const { prefix } = config;
const name = `${prefix}-action-sheet`;
let ActionSheet = class ActionSheet extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-cancel`];
        this.properties = Object.assign({}, props);
        this.data = {
            prefix,
            classPrefix: name,
            gridThemeItems: [],
            currentSwiperIndex: 0,
        };
        this.controlledProps = [
            {
                key: 'visible',
                event: 'visible-change',
            },
        ];
        this.methods = {
            onSwiperChange(e) {
                const { detail: { current }, } = e;
                this.setData({
                    currentSwiperIndex: current,
                });
            },
            splitGridThemeActions() {
                if (this.data.theme !== ActionSheetTheme.Grid)
                    return;
                this.setData({
                    gridThemeItems: chunk(this.data.items, this.data.count),
                });
            },
            /** 指令调用显示 */
            show(options) {
                this.setData(Object.assign(Object.assign(Object.assign({}, this.initialData), options), { visible: true }));
                this.splitGridThemeActions();
                this.autoClose = true;
                this._trigger('visible-change', { visible: true });
            },
            memoInitialData() {
                this.initialData = Object.assign(Object.assign({}, this.properties), this.data);
            },
            /** 指令调用隐藏 */
            close() {
                this._trigger('visible-change', { visible: false });
            },
            /** 默认点击遮罩关闭 */
            onPopupVisibleChange({ detail }) {
                if (!detail.visible) {
                    this._trigger('visible-change', { visible: false });
                }
                if (this.autoClose) {
                    this.setData({ visible: false });
                    this.autoClose = false;
                }
            },
            onSelect(event) {
                const { currentSwiperIndex, items, gridThemeItems, count, theme } = this.data;
                const { index } = event.currentTarget.dataset;
                const isSwiperMode = theme === ActionSheetTheme.Grid;
                const item = isSwiperMode ? gridThemeItems[currentSwiperIndex][index] : items[index];
                const realIndex = isSwiperMode ? index + currentSwiperIndex * count : index;
                if (item) {
                    this.triggerEvent('selected', { selected: item, index: realIndex });
                    this._trigger('visible-change', { visible: false });
                }
            },
            onCancel() {
                this.triggerEvent('cancel');
            },
        };
    }
    ready() {
        this.memoInitialData();
        this.splitGridThemeActions();
    }
};
ActionSheet.show = show;
ActionSheet = __decorate([
    wxComponent()
], ActionSheet);
export default ActionSheet;

//# sourceMappingURL=action-sheet.js.map
