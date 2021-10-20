::: field 基础使用
:::

::: demo

<template>
  <lay-select>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: field 选择禁用
:::

::: demo

<template>
  <lay-select v-model="selected">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled="true"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected = ref('1')

    return {
      selected
    }
  }
}
</script>

:::

::: field select 属性
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| name      | 原生 name 属性 | --   | 
| v-model     | 选中值 | --  | 

::: field select-option 属性
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| label      | 标签 | --   | 
| value     | 值 | --  | 

::: field select-option 插槽
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| default      | 默认 | --   | 

::: field select 事件
:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| change      | 切换事件 | value   | 