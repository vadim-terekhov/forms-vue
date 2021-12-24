function ValidationField(data,err,fieldErr,text,regExp){
    if (!regExp.test(data) && data !== ''){
        err[fieldErr] = text;
    }else{
        delete err[fieldErr];
    }
}
export default function Validate(context){
    //Серия паспорта - 4 цифры
    const FOUR_DIGITAL = /^[0-9]{4}$/;
    ValidationField(context.formData.serialPassport,context.Errors,'serialPassport','Серия паспорта должна быть 4 цифры',FOUR_DIGITAL);
    //Номер паспорта - 6 цифр для гражданства Россия и любое значение для других гражданств
    const SIX_DIGITAL = /^[0-9]{6}$/;
    ValidationField(context.formData.numberPassport,context.Errors,'numberPassport','Номер паспорта должна быть 6 цифр',SIX_DIGITAL);
    //Фамилия, Имя, Отчество, Предыдущая Фамилия, Предыдущее Имя- только русские буквы
    const ONLY_RUS_LETTERS = /^[А-Яа-я]+$/;
    ValidationField(context.formData.surName,context.Errors,'surName','Фамилия только русскими буквами',ONLY_RUS_LETTERS);
    ValidationField(context.formData.firstName,context.Errors,'firstName','Имя только русскими буквами',ONLY_RUS_LETTERS);
    ValidationField(context.formData.middleName,context.Errors,'middleName','Отчество только русскими буквами',ONLY_RUS_LETTERS);

    ValidationField(context.formData.oldSurName,context.Errors,'oldSurName','Фамилия (предыдущая) только русскими буквами',ONLY_RUS_LETTERS);
    ValidationField(context.formData.oldFirstName,context.Errors,'oldFirstName','Имя (предыдущее) только русскими буквами',ONLY_RUS_LETTERS);

    //E-mail - валидный почтовый адрес
    const VALID_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ValidationField(context.formData.email,context.Errors,'email','Email должен быть корректным',VALID_EMAIL);
    //Фамилия на латинице и Имя на латинице - только английские буквы
    const ONLY_ENG_LETTERS = /^[A-Za-z]+$/;
    ValidationField(context.formData.inoSurName,context.Errors,'inoSurName','Фамилия только латинскими буквами при выборе иностранного гражданства',ONLY_ENG_LETTERS);
    ValidationField(context.formData.inoFirstName,context.Errors,'inoFirstName','Имя только латинскими буквами при выборе иностранного гражданства',ONLY_ENG_LETTERS);
    //Дата Рождения - валидная дата, не позже сегодняшнего числа
    const currentDate = new Date();
    const curentDateYear = currentDate.getFullYear();
    const curentDateMonth = currentDate.getMonth() + 1;
    const curentDateNumber = currentDate.getDate();
    if (context.formData.dataBirth !== ''){
        const [y,m,d] = context.formData.dataBirth.split('-');
        if (+y > curentDateYear){
            context.Errors.dataBirth = 'Дата должна быть меньше текущей';
        }else if (+m > curentDateMonth){
            context.Errors.dataBirth = 'Дата должна быть меньше текущей'
        }else if (+d > curentDateNumber){
            context.Errors.dataBirth = 'Дата должна быть меньше текущей'
        }else{
            delete context.Errors.dataBirth;
        }
    }
}