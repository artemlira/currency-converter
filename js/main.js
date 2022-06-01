'use strict';

class CurrencyConverter {
   constructor({ wrapper, optins, main }) {
      this.wrapper = document.querySelector(wrapper);
      this.optins = this.wrapper.querySelector(optins);
      this.main = this.wrapper.querySelector(main);
      this.object = {};
   }

   addTodayDate() {
      let date = new Date();
      let day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
      let month = +date.getMonth() + 1;
      month = month > 10 ? month : '0' + month;
      this.wrapper.querySelector('.date').innerHTML = day + '.' + month + '.' + date.getFullYear();
   }

   choicePayment() {
      this.wrapper.addEventListener('input', (even) => {
         let target = even.target;
         if (target.matches('.type__payment')) {

         }
      });
   }

   gettingData() {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
         if (request.readyState === 4 && request.status === 200) {
            this.object = JSON.parse(request.responseText);
            // console.dir(this.object);
            this.calc();
         }
      });
      request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
      // request.setRequestHeader('Content-type', 'application/json');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send();
   }

   calc() {
      this.main.addEventListener('input', (even) => {
         let target = even.target;
         if (target.closest('.currency__1')) {
            let firstValue = this.main.querySelector('.currency__1').querySelector('input').value;
            console.dir(firstValue);
         }
      });
      this.main.querySelector('select').addEventListener('change', (even) => {
         let t = even.target.value;
         console.dir(t);
      });
   }

   init() {
      console.dir(this);
      this.addTodayDate();
      // this.choicePayment();
      this.gettingData();
      // this.calc();
   }
}

let obj = {
   wrapper: '.wrapper',
   optins: 'option',
   main: '.main',
}

const calc = new CurrencyConverter(obj);
calc.init();