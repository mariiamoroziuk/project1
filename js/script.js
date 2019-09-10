const createFormButton=document.getElementById('header__button');
const form=document.getElementById('form');
const inputs=document.getElementById('inputs');
const selectDoctor=document.getElementById('doctor');
const container = document.getElementsByClassName('container')[0];
const noItems = document.getElementsByClassName('no-items')[0];
const submit = document.getElementById('submit');
let arreyOfData=[];

const inputMaxLength = 100;
const textareaMaxLength = 400;
let doctor='';

createFormButton.onclick= function(){
    form.style.display='block';
    noItems.innerHTML='';
};

function createTeg(parent, teg, name, type, maxlength, text){
    let someTeg = document.createElement(teg);
    someTeg.type = type;
    someTeg.placeholder=name;
    someTeg.name = name;
    someTeg.maxLength=maxlength|| inputMaxLength;
    someTeg.innerText=text||'';
    parent.appendChild(someTeg);
}

function cleanInputs(){
    inputs.innerHTML = ""
}

function getValue(elementName){
    return (document.getElementsByName(elementName)[0]).value;
}

selectDoctor.onchange=function (event) {
    cleanInputs();

    doctor =event.target.value;
    createTeg(inputs,"input", "visitor", "text", );
    createTeg(inputs, "input", "date", "text", );
    createTeg(inputs, "input", "target", "text", );

    if (doctor==='dentist') {
        createTeg(inputs,"input", "lastDate", "text", );
    }
    if (doctor==='therapist') {
        createTeg(inputs,"input", "age", "text", );
    }
    if (doctor==='cardiologist') {
        createTeg(inputs,"input", "pressure", "text", );
        createTeg(inputs,"input", "bodyMassIndex", "text", );
        createTeg(inputs,"input", "disease", "text", );
    }

    createTeg(inputs,"textarea", "comments"," ", textareaMaxLength);

};
submit.onclick = function(){
    arreyOfData.push(createVisitData());
    container.innerHTML='';
    arreyOfData.forEach(function (object) {
        if(object.doctor==='therapist'){
            let cart = new Therapist(object.visitor, object.doctor, object.target, object.date, object.comments, object.age);
            cart.createCart();
        }
        if(object.doctor==='dentist'){
            let cart = new Dentist(object.visitor, object.doctor, object.target, object.date, object.comments, object.lastDate);
            cart.createCart();
        }
        if(object.doctor==='cardiologist'){
            let cart = new Cardiologist(object.visitor, object.doctor, object.target, object.date, object.comments, object. pressure, object.bodyMassIndex, object.disease);
            cart.createCart();
        }
    })
};

function createVisitData() {
    let obj={};
    obj.visitor = getValue('visitor');
    obj.doctor = doctor;
    obj.target = getValue('target');
    obj.date = getValue('date');
    obj.comments = getValue('comments');
    if(doctor==='dentist'){
        obj.lastDate = getValue('lastDate');}
    if(doctor==='cardiologist'){
        obj.pressure=getValue('pressure');
        obj.bodyMassIndex=getValue('bodyMassIndex');
        obj.disease=getValue('disease');}
    if(doctor==='therapist'){
        obj.age = getValue('age');}
    return obj
}

function removeObject(arr, doctor) {
    return arr.filter(function (obj) {
        return obj.doctor!==doctor
    })
}