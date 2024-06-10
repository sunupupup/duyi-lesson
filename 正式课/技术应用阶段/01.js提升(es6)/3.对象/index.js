const a = {
  name: 'ant',
};
console.log(Object.getOwnPropertyDescriptor(a, 'name'));
// { value: 'ant', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptors(a));

console.log(Object.is({ a: 1 }, { a: 1 }));

const set = new Set();
set.add({ a: 1 });
set.add({ a: 1 });

console.log(set);
