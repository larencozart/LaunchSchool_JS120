// function bar() {
//   console.log('good morning');
// }

// global.inner = {
//   bar() {
//     console.log('good afternoon');
//   },
// };
// // property on global obj 'inner' initialized
// // set value of object that has one method 'bar'
// // inner : { bar : () => console.log('good afternoon')};

// let obj = {
//   // obj : { inner : {bar : () => console.log(), foo : () => bar()},
//   //         bar : () => function,
//   //         foo : () => function }
//   inner: {
//     bar() {
//       console.log('good night');
//     },

//     foo() {
//       bar();
//       // which bar is this... does not call bar with `this` key word
//       // not the bar above within inner...
//       // will ref bar on global object
//     },
//   },
//   // property on obj object 'inner'
//   // this prop has value of an obj with 2 methods, 'bar' and 'foo'

//   bar() {
//     console.log('wake up');
//   },
//   // method on obj object 'bar'

//   foo() {
//     this.inner.bar(); // references inner prop, and method within that prop
//     inner.bar(); // reference global inner prop and method within that prop
//     bar(); // will reference bar on global object
//   }
// };

// obj.foo();
// // three log attempts:
// // 1. 'good night'
// // 2. 'good afternoon'
// // 3. 'good morning'

function bar() {
  console.log('good morning');
}

global.inner = {
  bar() {
    console.log('good afternoon');
  },
};

let obj = {
  inner: {
    bar() {
      console.log('good night');
    },

    foo() {
      bar();
    },
  },

  bar() {
    console.log('wake up');
  },

  foo() {
    this.inner.bar();
    inner.bar();
    bar();
  }
};

let foo = function() {
  console.log('go to sleep');
}

function go(foo) {
  foo();
}
// defines a function `go` that takes a parameter `foo`
// that is a function, then calls that function being passed

go(obj.foo);
// calls the function within the object 'obj', not the
// function on line 83
// however, the `this` context is lost from with the foo
// method in obj - reset to global obj
// logs:
// 1. ref to inner's bar method on global obj: good afternoon
// 2. another ref to inner on global: good afternoon
// 3. ref to gloabl bar: good morning