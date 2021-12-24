<template>
  <div class="wrapper-radio">
    <h5 class="wrapper-radio-title">
      <slot></slot>
    </h5>

    <template 
      v-for="(item, idx) in config"
    >
      <label :for="item.id" :key="`${idx}+${item.id}`">{{ item.label }}</label>
      <input 
        :key="`${idx}+${item.name}`"
        :type="item.type"
        :id="item.id"
        :name="item.name"
        :checked="item.checked"
        class="wrapper-radio-gender"
        :value="item.value"
        @input="$emit('input',$event.target.value)"
      >
    </template>

  </div>
</template>

<script>
export default {
  name: 'MyRadio',
  props:{
    config: Array,
    value: String
  },
}
</script>

<style scoped>
.wrapper-radio-title{
  margin: 10px 0px
}
.wrapper-radio-gender{
  margin-right: 20px;
}
.wrapper-radio-gender:last-child{
  margin-right: 0px;
}
</style>