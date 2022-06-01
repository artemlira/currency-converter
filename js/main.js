'use strict';

class CurrencyConverter {
   constructor({ wrapper, optins, main }) {
      this.wrapper = document.querySelector(wrapper);
      this.optins = this.wrapper.querySelector(optins);
      this.main = this.wrapper.querySelector(main);
      this.globalCurrency = {};
      this.firstCurrency;
      this.secondCurrency;
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
            let json = JSON.parse(request.responseText);
            json.forEach((v) => {
               this.globalCurrency[v.ccy] = v;
            })
         }
      });
      request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send();
   }

   calc() {
      let sum = 0;
      let firstValue = this.main.querySelector('.currency__1').querySelector('input').value;
      this.main.querySelector('.copy_1').querySelector('input').value = firstValue;
      console.dir(this.main.querySelector('.copy_2').querySelector('option').value);
      if (this.firstCurrency == 'UAH') {
         sum = firstValue / this.globalCurrency[this.secondCurrency].sale;
      } else if (this.secondCurrency == 'UAH') {
         sum = firstValue * this.globalCurrency[this.firstCurrency].buy;
      } else {
         sum = (firstValue * this.globalCurrency[this.firstCurrency].buy) / this.globalCurrency[this.secondCurrency].sale;
      }
      this.main.querySelector('.original').querySelector('input').value = sum.toFixed(2);
      this.main.querySelector('.copy_2').querySelector('input').value = sum.toFixed(2);
   }

   eventsFirstButton() {
      this.firstCurrency = this.main.querySelector('.currency__1').querySelector('option').value;
      this.firstCurrency = this.main.querySelector('.copy_2').querySelector('option').value;
      this.main.querySelector('.currency__1').querySelector('select').addEventListener('change', (even) => {
         let target = even.target;
         this.firstCurrency = target.value;
      });
   }

   eventsSecondButton() {
      this.secondCurrency = this.main.querySelector('.currency__2').querySelector('option').value;
      this.secondCurrency = this.main.querySelector('.copy_1').querySelector('option').value;
      this.main.querySelector('.currency__2').querySelector('select').addEventListener('change', (even) => {
         let target = even.target;
         this.secondCurrency = target.value;
      });
   }

   showResult() {
      this.main.addEventListener('click', (even) => {
         let target = even.target;
         if (target.closest('.btn_1')) {
            this.calc();
         }
      })
   }

   reverse() {
      this.main.addEventListener('click', (even) => {
         let target = even.target;
         if (target.closest('.btn_2')) {
            console.dir(this.main.querySelector('.copy_1').querySelector('option').value);
            this.main.querySelector('.copy_2').classList.toggle('reverse');
            this.main.querySelector('.copy_1').classList.toggle('reverse');
            this.main.querySelector('.currency__1').classList.toggle('reverse2');
            this.main.querySelector('.currency__2').classList.toggle('reverse2');
         }
      });
   }




   init() {
      console.dir(this.globalCurrency);
      this.addTodayDate();
      this.gettingData();
      this.eventsFirstButton();
      this.eventsSecondButton();
      this.reverse();
      this.showResult();
   }
}

let obj = {
   wrapper: '.wrapper',
   optins: 'option',
   main: '.main',
}

const calc = new CurrencyConverter(obj);
calc.init();