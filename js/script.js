document.addEventListener('DOMContentLoaded', onReady);

const createFormButton=document.getElementById('header__button');
const form=document.getElementById('form');
const deleteButton=document.getElementById('delete');
const inputs=document.getElementById('inputs');
const selectDoctor=document.getElementById('doctor');
const container = document.getElementsByClassName('container')[0];
const noItems = document.getElementsByClassName('no-items')[0];
const submit = document.getElementById('submit');
let arreyOfData=[];
document.addEventListener('DOMContentLoaded', function () {
    if(JSON.parse(localStorage.getItem('arreyOfData'))){
        arreyOfData=JSON.parse(localStorage.getItem('arreyOfData'));
        if (arreyOfData.length > 0) {
            noItems.innerHTML='';
            showAllCarts();
        }

    }
});

function onReady() {
    document.addEventListener('click', function(event) {
        if (!form.contains(event.target))
            closeDoctorW();
    });

    createFormButton.addEventListener('click', (e) => {
        e.stopPropagation();
        noItems.innerHTML='';
        form.style.display='block';
    });

    let isDragging = false;
    document.addEventListener('mousedown', function(event) {

        if (event.target.closest('.delCart') )  return; // check if was clicked "delete card"

        let dragElement = event.target.closest('.draggable');

        if (!dragElement) return;

        event.preventDefault();

        dragElement.ondragstart = function() {
            return false;
        };

        let coords, shiftX, shiftY;

        startDrag(dragElement, event.clientX, event.clientY);

        function onMouseUp(event) {
            finishDrag();
        }

        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }

        // on drag start:
        //   remember the initial shift
        //   move the element position:fixed and a direct child of body
        function startDrag(element, clientX, clientY) {
            if(isDragging) {
                return;
            }

            isDragging = true;

            document.addEventListener('mousemove', onMouseMove);
            element.addEventListener('mouseup', onMouseUp);

            shiftX = clientX - element.getBoundingClientRect().left;
            shiftY = clientY - element.getBoundingClientRect().top;

            element.style.position = 'fixed';

            moveAt(clientX, clientY);
        }

        // switch to absolute coordinates at the end, to fix the element in the document
        function finishDrag() {
            if(!isDragging) {
                return;
            }

            isDragging = false;

            dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
            dragElement.style.position = 'absolute';

            document.removeEventListener('mousemove', onMouseMove);
            dragElement.removeEventListener('mouseup', onMouseUp);
        }

        function moveAt(clientX, clientY) {
            // new window-relative coordinates
            let newX = clientX - shiftX;
            let newY = clientY - shiftY;

            // check if the new coordinates are below the bottom window edge
            let newBottom = newY + dragElement.offsetHeight; // new bottom

            // below the window? let's scroll the page
            if (newBottom > document.documentElement.clientHeight) {
                // window-relative coordinate of document end
                let docBottom = document.documentElement.getBoundingClientRect().bottom;

                // scroll the document down by 10px has a problem
                // it can scroll beyond the end of the document
                // Math.min(how much left to the end, 10)
                let scrollY = Math.min(docBottom - newBottom, 1);

                // calculations are imprecise, there may be rounding errors that lead to scrolling up
                // that should be impossible, fix that here
                if (scrollY < 0) scrollY = 0;

                window.scrollBy(0, scrollY);

                // a swift mouse move make put the cursor beyond the document end
                // if that happens -
                // limit the new Y by the maximally possible (right at the bottom of the document)
                newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
            }

            // check if the new coordinates are above the top window edge (similar logic)
            if (newY < 0) {
                // scroll up
                let scrollY = Math.min(-newY, 1);
                if (scrollY < 0) scrollY = 0; // check precision errors

                window.scrollBy(0, -scrollY);
                // a swift mouse move can put the cursor beyond the document start
                newY = Math.max(newY, 0); // newY may not be below 0
            }


            // limit the new X within the window boundaries
            // there's no scroll here so it's simple
            if (newX < 0) newX = 0;
            if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
                newX = document.documentElement.clientWidth - dragElement.offsetWidth;
            }

            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }

    });
}

let closeDoctorW = function closeDoctor() {
    form.style.display = "none";
    console.log('selectedDoctor ');
};

const inputMaxLength = 100;
const textareaMaxLength = 400;
let doctor='';

createFormButton.onclick= function(){
    form.style.display='block';

    noItems.innerHTML='';
};

function closeForm() {
    inputs.innerHTML='';
    form.style.display='none';
}

deleteButton.onclick=function(){
    closeForm()
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

function showAllCarts() {
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

        console.log(arreyOfData);
    });
    closeDoctorW();
}

submit.onclick = function(){
    arreyOfData.push(createVisitData());
    localStorage.setItem('arreyOfData', JSON.stringify(arreyOfData));
    container.innerHTML='';
    showAllCarts();
    closeForm();

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

function removeObject(arr, doctor, visitor, date, target) {
    return arr.filter(function (obj) {

        return obj.doctor!==doctor||obj.visitor!==visitor||obj.date!==date||obj.target!==target
    })
}



