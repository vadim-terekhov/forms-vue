<template>
  <div class="wrapper-select">
    <label :for="config.id">{{ config.label }}</label><br>
    <select :id="config.id" :class="config.class"
      :value="value"
      @input="$emit('input',$event.target.value)"
    >
      <option disabled selected value="">{{ config.textDefault }}</option>
      <option
        v-for="item in data"
        :key="item.id"
      >{{ item[`${config.option}`] }}</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'MySelect',
  props: {
    config: Object,
    value: String,
    data: Array,
  }
}
</script>

<style scoped>
.wrapper-select{
  width: 100%;
  margin-right: 5px;
}
.wrapper-select:last-child{
  margin-right: 0px;
}
</style>