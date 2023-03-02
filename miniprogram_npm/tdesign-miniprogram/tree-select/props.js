/* eslint-disable */
const props = {
    /** 高度，默认单位为 px */
    height: {
        type: null,
        value: 336,
    },
    /** 用来定义 value / label 在 `options` 中对应的字段别名 */
    keys: {
        type: Object,
    },
    /** 是否多选 */
    multiple: {
        type: Boolean,
        value: false,
    },
    /** 选项 */
    options: {
        type: Array,
        value: [],
    },
    /** 选中值 */
    value: {
        type: null,
        value: null,
    },
    /** 选中值，非受控属性 */
    defaultValue: {
        type: null,
    },
};
export default props;

//# sourceMappingURL=props.js.map
