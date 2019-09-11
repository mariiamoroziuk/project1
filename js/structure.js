class Visit {
    constructor(visitor, doctor, target, date, comments) {
        this.visitor  = visitor;
        this.doctor   = doctor;
        this.target   = target || '';
        this.date     = date || '';
        this.comments = comments || '';
    }

    createCart(){
        let cart = document.createElement('div');
        let close = document.createElement('button');
        close.data = this;
        close.innerText = 'x';
        close.onclick = function(event) {
            arreyOfData = removeObject(arreyOfData, this.data.doctor, this.data.visitor, this.data.date, this.data.target);
            localStorage.setItem('arreyOfData', JSON.stringify(arreyOfData));
            let element = event.target;
            let parent = element.parentElement;
            container.removeChild(parent);
        };
        cart.appendChild(close);
        createTeg(cart,"div", "visitor", '','', this.visitor );
        createTeg(cart,"div", "doctor", '','', this.doctor );

        let show = document.createElement('button');
        show.innerText = 'SHOW MORE';
        show.onclick = function(event) {
            let element=event.target;
            element.style.display="none";
            element.nextElementSibling.style.display="block";

        };
        cart.appendChild(show);

        let hidden = document.createElement('div');
        hidden.style.display="none";
        createTeg(hidden,"div", "target",   '','', this.target );
        createTeg(hidden,"div", "date",     '','', this.date );
        createTeg(hidden,"div", "comments", '','', this.comments );
        cart.appendChild(hidden);

        container.appendChild(cart);
    }
}


class Dentist extends Visit {
    constructor(visitor, doctor, target, date, comments, lastDate) {
        super(visitor, doctor, target, date, comments);
        this.lastDate = lastDate|| '';
    }
    createCart() {
        super.createCart();
    }
}

class Therapist extends Visit {
    constructor(visitor, doctor, target, date, comments, age) {
        super(visitor, doctor, target, date, comments);
        this.age = age || '';
    }
    createCart() {
        super.createCart();
    }
}

class Cardiologist extends Visit {
    constructor(visitor, doctor, target, date, comments, pressure, bodyMassIndex, disease) {
        super(visitor, doctor, target, date, comments);
        this.pressure = pressure||'';
        this.bodyMassIndex = bodyMassIndex||'';
        this.disease = disease||'';
    }
    createCart() {
        super.createCart();
    }
}