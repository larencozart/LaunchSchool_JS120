/* eslint-disable no-unused-vars */
// Practice Problems - Factory Functions

// 2.  Rewrite the following code to use object-literal syntax
//     to generate the returned object:

function makeObj() {
  return {
    propA : 10,
    propB : 20,
  };
}

// 3. In this problem and the remaining problems, we'll build
//    a simple invoice processing program. To get you started,
//    here's the code to process a single invoice:


// To process multiple invoices, we need a factory method that we can
// use to create invoices. The requirements for the factory function
// are as follows:

// 1. It returns an invoice object, with phone and internet properties,
//    and a total method.
// 2. The default value for the phone service is 3000, and the internet
//    service is 5500 (in cents, of course!).
// 3. The function takes an object argument whose attributes override
//    the default values.

// eslint-disable-next-line max-lines-per-function
function createInvoice(obj) {
  return {
    phone : obj && obj.hasOwnProperty('phone') ? obj.phone : 3000,
    internet : obj && obj.hasOwnProperty('internet') ? obj.internet : 5500,
    paymentAmounts: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) { // takes one payment obj
      this.paymentAmounts.push(payment.total());
    },

    addPayments(payments) { // takes an array of payments objs
      payments.forEach(payment => {
        this.paymentAmounts.push(payment.total());
      });
    },

    amountDue() {
      return this.total() -
             this.paymentAmounts.reduce((sum, amount) => sum + amount, 0);
    }
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoices);
console.log(invoiceTotal(invoices)); // 31000

// 4. Now we can build a factory function to create payments.
//    The function can take an object argument in one of 3 forms:

// 1. Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
// 2. Payment for both services, e.g., { internet: 2000, phone: 1000 }.
// 3. Payment with just an amount property, e.g., { amount: 2000 }.
// 4. The function should return an object that has the amount paid for
//    each service and a total method that returns the payment total.
//    If the amount property is not present in the argument, it should
//    return the sum of the phone and internet service charges; if
//    the amount property is present, return the value of that property.

// Your function should work with the following code:

function createPayment(services) {
  return {
    phone : services && services.hasOwnProperty('phone') ? services.phone : 0,
    internet : services && services.hasOwnProperty('internet') ? services.internet : 0,
    amount : services && services.hasOwnProperty('amount') ? services.amount : undefined,

    total() {
      return this.amount || this.phone + this.internet;
    }
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(payments);
console.log(paymentTotal(payments));      // => 24000


// 5. Update the createInvoice function so that it can
//    add payment(s) to invoices. Use the following code as a guideline:

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0