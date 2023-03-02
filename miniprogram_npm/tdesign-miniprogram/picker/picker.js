var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-picker`;
let Picker = class Picker extends SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = props;
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-confirm`, `${prefix}-class-cancel`, `${prefix}-class-title`];
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../picker-item/picker-item': {
                type: 'child',
                linked() {
                    this.updateChildren();
                },
            },
        };
        this.observers = {
            value() {
                this.updateChildren();
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.methods = {
            updateChildren() {
                const { value } = this.properties;
                this.$children.forEach((child, index) => {
                    child.setData({
                        value: (value === null || value === void 0 ? void 0 : value[index]) || '',
                        siblingCount: this.$children.length,
                    });
                    child.update();
                });
            },
            getSelectedValue() {
                const value = this.$children.map((item) => item._selectedValue);
                const label = this.$children.map((item) => item._selectedLabel);
                return [value, label];
            },
            getColumnIndexes() {
                const columns = this.$children.map((pickerColumn, columnIndex) => {
                    return {
                        column: columnIndex,
                        index: pickerColumn._selectedIndex,
                    };
                });
                return columns;
            },
            onConfirm() {
                const [value, label] = this.getSelectedValue();
                const columns = this.getColumnIndexes();
                this.close();
                this.triggerEvent('change', { value, label, columns });
                this.triggerEvent('confirm', { value, label, columns });
            },
            triggerColumnChange({ column, index }) {
                const [value, label] = this.getSelectedValue();
                this.triggerEvent('pick', { value, label, column, index });
            },
            onCancel() {
                this.close();
                this.triggerEvent('cancel');
            },
            onPopupChange(e) {
                const { visible } = e.detail;
                this.close();
                this.triggerEvent('visible-change', { visible });
            },
            close() {
                if (this.data.autoClose) {
                    this.setData({ visible: false });
                }
            },
        };
    }
    ready() {
        this.$children.map((column, index) => (column.columnIndex = index));
    }
};
Picker = __decorate([
    wxComponent()
], Picker);
export default Picker;

//# sourceMappingURL=picker.js.map
