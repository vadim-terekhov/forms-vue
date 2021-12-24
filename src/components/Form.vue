<template>
  <div class="wrapper-form">
    <template
      v-if="hasChange"
    >
      <ul 
        class="errors"
        v-if="ErrorsArr.length > 0"
      >
        <li
          v-for="(error, idx) in ErrorsArr"
          :key="`${idx}-${error.slice(0,3)}`"
        >{{ error }}</li>
      </ul>
      <p
        class="success"
        v-else
      >Какие поля вы заполняли или меняли, Вы их заполнили правильно</p>
    </template>
    <form class="form"  @submit.prevent="formSubmit">
      <h4>Личные данные</h4>
      <fieldset class="personal-data">
        <div class="row">
          <my-input v-model.trim="formData.surName" :config="configFieldsInputs.configSurName" :classProp="'input-all'" :error="Errors.surName" />
          <my-input v-model.trim="formData.firstName" :config="configFieldsInputs.configFirstName" :classProp="'input-all'" :error="Errors.firstName" />
          <my-input v-model.trim="formData.middleName" :config="configFieldsInputs.configMiddleName" :classProp="'input-all'" :error="Errors.middleName" />
        </div>
        <my-input v-model.trim="formData.dataBirth" :config="configFieldsInputs.configDataBirth" :classProp="'input-all'" :error="Errors.dataBirth" />
        <my-input v-model.trim="formData.email" :config="configFieldsInputs.configEmail" :classProp="'input-all'" :error="Errors.email" />
        <my-radio 
          :config="configFieldsRadio.configGender"
          v-model.trim="formData.gender"
        >Пол</my-radio>
      </fieldset>
      
      <h4>Паспортные данные</h4>
      <fieldset class="passport-data">
        <my-custom-select @clickItem="changeHandler" @input="changeHandler" :classProp="['input-all']"/>
        <div class="wrapper-russian-passport row" v-if="(formData.citizenshipCustom === 'Russia') ? true : false">
          <my-input v-model.trim="formData.serialPassport" :config="configFieldsInputs.configSerialNumber" :classProp="'input-all'" :error="Errors.serialPassport" />
          <my-input v-model.trim="formData.numberPassport" :config="configFieldsInputs.configNumberPassport" :classProp="'input-all'" :error="Errors.numberPassport" />
          <my-input v-model.trim="formData.dataIssuePassport" :config="configFieldsInputs.configDataIssuePassport" :classProp="'input-all'" />
        </div>
        <div class="wrapper-ino-passport" v-if="isNationality">
          <div class="row">
            <my-input v-model.trim="formData.inoSurName" :config="configFieldsInputs.configInoSurName" :classProp="'input-all'" :error="Errors.inoSurName" />
            <my-input v-model.trim="formData.inoFirstName" :config="configFieldsInputs.configInoFirstName" :classProp="'input-all'" :error="Errors.inoFirstName" />
          </div>
          <div class="row">
            <my-input v-model.trim="formData.inoNumberPassport" :config="configFieldsInputs.configInoNumberPassport" :classProp="'input-all'" />
            <my-select 
              v-model.trim="formData.inoCountryIssue"
              :config="configFieldsSelect.configInoCountryIssue"
              :data="nationality"
            />
            <my-select 
              v-model.trim="formData.inoTypePassport"
              :config="configFieldsSelect.configInoTypePassport"
              :data="typePassport"
            />
          </div>
        </div>

        <my-radio 
          :config="configFieldsRadio.configchangeSurname"
          v-model.trim="formData.changeSurname"
        >Меняли ли фамилию или имя?</my-radio>

        <div
          v-show="(formData.changeSurname === 'yes') ? true : false"
          class="row"
        >
          <my-input v-model.trim="formData.oldSurName" :config="configFieldsInputs.configOldSurName" :classProp="'input-all'" :error="Errors.oldSurName" />
          <my-input v-model.trim="formData.oldFirstName" :config="configFieldsInputs.configOldFirstName" :classProp="'input-all'" :error="Errors.oldFirstName" />
        </div>

      </fieldset>
      <button class="send">Отправить</button>
    </form>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput.vue';
import MyRadio from '@/components/MyRadio.vue';
import MyCustomSelect from '@/components/MyCustomSelect.vue';
import MySelect from '@/components/MySelect.vue';

import nationality from '@/assets/data/citizenships.json';
import typePassport from "@/assets/data/passport-types.json";
import { configFieldsInputs } from '@/components/ConfigForMyInput.js';

import { configFieldsRadio } from '@/components/ConfigForMyRadio.js';
import { configFieldsSelect } from '@/components/ConfigForMySelect.js';
import formData from '@/components/FormData.js'
import Validate from '@/helpers/validation.js';
export default {
  components: {
    MyInput,
    MyRadio,
    MyCustomSelect,
    MySelect,
  },
  data() {
    return {
      formData,
      nationality,
      typePassport,
      Errors: {},
      ErrorsArr: [],
      hasChange: false,
      configFieldsInputs,
      configFieldsRadio,
      configFieldsSelect,
    };
  },
  computed:{
    isNationality(){
      return this.nationality.find(i => 
        i.nationality === this.formData.citizenshipCustom && i.nationality !== 'Russia'
      );
    }
  },
  methods: {
    hasChangeField(){
      let flag = false;
      for(let [key,data] of Object.entries(this.formData)){
        if (key === 'gender'){
          if (data !== 'male'){
            flag = true;
            break;
          }
        }else if (key === 'changeSurname'){
          if (data !== 'no'){
            flag = true;
            break;
          }
        }else if (data !== ''){
          flag = true;
          break;
        }
      }
      return flag;
    },
    changeHandler(citizenship){
      this.formData.citizenshipCustom = citizenship;
      if (this.isNationality === undefined){
        this.formData.inoFirstName = '';
        this.formData.inoSurName = '';
        this.formData.inoNumberPassport = '';
        this.formData.inoCountryIssue = '';
        this.formData.inoTypePassport = '';
      }
      if(this.formData.citizenshipCustom !== 'Russia'){
        this.formData.serialPassport ='';
        this.formData.numberPassport ='';
        this.formData.dataIssuePassport = '';
      }

    },
    formSubmit(){
      if (this.hasChangeField()){
        this.hasChange = true;
      }else{
        this.hasChange = false;
      }
      Validate(this);
      /*---------------------------------------------------------------------------- */
      this.ErrorsArr = Object.keys(this.Errors).map(item => this.Errors[item]);
      if (this.ErrorsArr.length === 0 && this.hasChange === true){
        console.log(JSON.stringify(this.formData));
      }
    }
  },
};
</script>

<style>
.wrapper-form{
  width: 60%;
  margin: 0 auto;
}
.form {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.input-all{
  height: 30px;
  width: 100%;
}
.input-all:focus{
  outline: none;
}
.row{
  display: flex;
  margin-top: 20px;
  width: 100%;
}
.send{
  margin-top: 20px;
  background-color: green;
  color: beige;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 10px;
  transition: all .5s;
}
.send:hover{
  cursor: pointer;
  transform: scale(1.1);
}
.errors{
  color: red;
  font-weight: bold;
}
.success{
  color: green;
  font-weight: bold;
}
</style>
