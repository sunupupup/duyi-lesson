/**
 * 属性描述符
 */

const obj = {
  a: 1,
  b: 2,
};
/**
 * //enumerable、writable 默认是false
 * interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
 */
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: false, //表示这个值可不可以被重写
  enumerable: false, //表示这个key, 不会在Object.keys(obj)中枚举到, 并且也不会被打印出来
  configurable: false, //表示这个属性没法defineProperty中配置PropertyDescriptor了
});

console.log(obj);
obj.a = 123;
console.log(obj); //{ b: 2 }

console.log(Object.keys(obj));
console.log(obj.a); //1  直接console.log obj对象打印不出来，除非直接访问属性
