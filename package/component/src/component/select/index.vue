<script lang="ts">
export default {
  name: "LaySelect",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  provide,
  computed,
  ref,
  Ref,
  useSlots,
  onMounted,
  VNode,
  Component,
  watch,
  nextTick,
  onUnmounted,
  h,
} from "vue";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LaySelectOption, {
  LaySelectOptionProps,
} from "../selectOption/index.vue";
import { SelectSize } from "./interface";

export interface SelectProps {
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  showEmpty?: boolean;
  emptyMessage?: string;
  modelValue?: any;
  multiple?: boolean;
  items?: LaySelectOptionProps[];
  size?: SelectSize;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  allowClear?: boolean;
  showSearch?: boolean;
}

export interface SelectEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "search", value: string): void;
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: null,
  placeholder: "请选择",
  showEmpty: true,
  emptyMessage: "请选择",
  searchPlaceholder: "请搜索",
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  disabled: false,
  multiple: false,
  allowClear: false,
  showSearch: false,
  size: "md",
});

const slots = useSlots();
const selectRef = ref();
const searchValue = ref("");
const singleValue = ref("");
const multipleValue = ref([]);
const emits = defineEmits<SelectEmits>();
const openState: Ref<boolean> = ref(false);
const options = ref<any>([]);
var timer: any;

const getOption = (nodes: VNode[]) => {
  nodes
    ?.filter((item: VNode) => {
      return item.children != "v-if";
    })
    ?.map((item: VNode) => {
      let component = item.type as Component;
      if (component.name === LaySelectOption.name) {
        if (item.children) {
          // @ts-ignore
          item.props.label = item.children.default()[0].children;
        }
        options.value.push(item.props);
      } else {
        getOption(item.children as VNode[]);
      }
    });
};

const intOption = () => {
  if (slots.default) {
    getOption(slots.default());
  }
  Object.assign(options.value, props.items);
};

const handleRemove = (value: any) => {
  if (Array.isArray(selectedValue.value)) {
    selectedValue.value = selectedValue.value.filter((item) => item != value);
  }
};

onMounted(() => {
  intOption();
  timer = setInterval(intOption, 500);

  watch(
    [selectedValue, options],
    () => {
      if (multiple.value) {
        multipleValue.value = selectedValue.value?.map((value: any) => {
          return options.value.find((item: any) => {
            item.disabled == "" || item.disabled == true
              ? (item.closable = false)
              : (item.closable = true);
            return item.value === value;
          });
        });
      } else {
        searchValue.value = "";
        singleValue.value = options.value.find((item: any) => {
          return item.value === selectedValue.value;
        })?.label;
      }
    },
    { immediate: true, deep: true }
  );
});

onUnmounted(() => {
  clearInterval(timer);
});

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const multiple = computed(() => {
  return props.multiple;
});

const handleSearch = (value: string) => {
  emits("search", value);
  searchValue.value = value;
};

const handleClear = () => {
  if (multiple.value) {
    selectedValue.value = [];
  } else {
    selectedValue.value = "";
  }
};

provide("selectRef", selectRef);
provide("openState", openState);
provide("selectedValue", selectedValue);
provide("searchValue", searchValue);
provide("multiple", multiple);
</script>

<template>
  <div class="layui-select">
    <lay-dropdown
      ref="selectRef"
      :disabled="disabled"
      :update-at-scroll="true"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-tag-input
        v-if="multiple"
        v-model="multipleValue"
        :allow-clear="allowClear"
        :placeholder="placeholder"
        :collapseTagsTooltip="collapseTagsTooltip"
        :minCollapsedNum="minCollapsedNum"
        :disabledInput="true"
        :size="size"
        :class="{ 'layui-unselect': true }"
        @clear="handleClear"
        @remove="handleRemove"
      >
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-tag-input>
      <lay-input
        v-else
        v-model="singleValue"
        :placeholder="placeholder"
        :allow-clear="allowClear"
        :readonly="!showSearch"
        :class="{ 'layui-unselect': !showSearch }"
        :size="size"
        @Input="handleSearch"
        @clear="handleClear"
      >
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-input>
      <template #content>
        <dl class="layui-select-content">
          <div class="layui-select-search" v-if="multiple && showSearch">
            <lay-input
              v-model="searchValue"
              :placeholder="searchPlaceholder"
              prefix-icon="layui-icon-search"
              size="sm"
            ></lay-input>
          </div>
          <lay-select-option
            v-if="showEmpty && !multiple"
            :label="emptyMessage"
            value=""
          ></lay-select-option>
          <template v-if="items">
            <lay-select-option
              v-for="(item, index) in items"
              v-bind="item"
              :key="index"
            ></lay-select-option>
          </template>
          <slot></slot>
        </dl>
      </template>
    </lay-dropdown>
  </div>
</template>
