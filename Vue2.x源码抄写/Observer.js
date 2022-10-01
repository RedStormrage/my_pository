// 创建一个watcher,notify()触发，watcher触发cb更新视图
class Watcher{
  constructor(vm,expr,cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb
    // 先把旧值保存起来
    this.oldValue = this.getOldValue()
  }
  getOldValue(){
    Dep.target = this // 这个地方创建一个观察者，因为当数据初始化的时候肯定会调用这个方法
    let oldValue = compileUtil.getVal(this.expr,this.vm)
    Dep.target = null // 记得要将之前的观察者删除出，否则数组中会出现非常多的观察者
    return oldValue
  }
  update(){
    let newValue = compileUtil.getVal(this.expr,this.vm)
    if(newValue !== this.oldValue){ // 如果获取到的data中的值和之前的this.oldValue不一样，说明值变更了，将其cb，更新视图
      this.cb(newValue) // 利用回调，通知视图更新
    }
  }
}
// 订阅器,两个作用: 1.通知watcher更新数据，2.添加watcher
class Dep{
  constructor(){
    this.subs = []
  }
  // 收集观察者
  addSub(watcher){
    this.subs.push(watcher)
  }
  // 通知观察者去更新
  notify(){
    this.subs.forEach(w=>w.update())
    // console.log('通知了观察者',this.subs)
  }
}
// 数据劫持
class Observer{
  constructor(data){
    this.observer(data)
  }
  observer(data){
    if(data && typeof data === 'object'){
      Object.keys(data).forEach((key)=>{
        this.defineReactive(data,key,data[key]);
      })
    }
  }
  defineReactive(obj,key,value){
    // 递归遍历
    this.observer(value) // 有可能还是个对象，故再一次遍历
    const dep = new Dep()
    // 数据劫持
    Object.defineProperty(obj,key,{
      enumerable: true, // 可遍历的
      configurable: true, // 可修改的
      // 初始化时
      get(){
        // 数据初始化时，往dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set:(newValue)=>{ // 这里用的箭头函数是要将this指向变更为Observer，否则获取不到
        this.observer(newValue) // 值发生变化后要再次对其进行劫持
        if(newValue !== value){
          value = newValue
        }
        // 更改完数据后通知dep
        dep.notify()
      }
    })
  }
}