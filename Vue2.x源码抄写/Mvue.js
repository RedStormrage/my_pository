// 更新视图
const compileUtil = {
  getVal(expr, vm){ // 此方法根据不同的表达式获取到data中的数据，所以要将表达式expr和vm传进来
    // 通过split 拆解的数组: [person, fav]
    return expr.split('.').reduce((data,currentVal)=>{
      return data[currentVal]
    },vm.$data)
  },

  setValue(expr, vm, inputVal){
    return expr.split('.').reduce((data,currentVal)=>{ // 因为输入框可能也会设置像person.name这样的值，所以要做拆分操作
      data[currentVal] = inputVal // 将input输入框的值赋值给data中的msg或者person.name
    }, vm.$data)
  },

  getContentVal(expr,vm){ // {{person.name}} 如果person.name的name变化了，可能出现将整个对象进行替换，所以，这里是拿到对象中的某个属性
    return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{// args打印的结果是['{{msg}}', 'msg', 0, '{{msg}}']
      console.log(args)
      return this.getVal(args[1],vm) // 此时拿到了data数据中的值
    })
  },

  text(node,expr,vm){ // node: 要操作的节点; expr: 拿到data数据中的msg; vm即实例对象

    let value
    if(!!~expr.indexOf('{{')){
      // {{person.name}} --- {{person.age}}
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{

        // 绑定观察者，对所有传进来的数据进行监听，将来数据发生变化，触发这里的回调进行update更新
        new Watcher(vm,args[1],(newValue)=>{
          this.updater.textUpdater(node,this.getContentVal(expr,vm))
        })
        return this.getVal(args[1],vm) // 此时拿到了data数据中的值
      })
    }else{
      // 通过指令取值万一出现了person.name 的情况，那么当前的代码就不严谨了，故此要定义一个方法
      value = this.getVal(expr,vm)
    }
    this.updater.textUpdater(node,value) // value是拿到data数据中的msg的值
  },

  html(node,expr,vm){
    const value = this.getVal(expr,vm)
    new Watcher(vm,expr,(newValue)=>{
      this.updater.htmlUpdater(node,newValue) // watcher内的cb一旦触发就会执行这里对视图进行更新，即数据变化，这里会更新视图
    })
    this.updater.htmlUpdater(node,value)
  },

  model(node,expr,vm){
    const value = this.getVal(expr,vm)
    // 绑定更新函数，数据驱动视图
    new Watcher(vm,expr,(newValue)=>{
      this.updater.modelUpdater(node,newValue)
    })
    // 视图=>数据=>视图
    node.addEventListener('input',(e)=>{
      // 这里设置了setValue方法，为的是找到对应的值，也就是expr(例: data.msg)设置值
      this.setValue(expr, vm, e.target.value)
    })

    this.updater.modelUpdater(node,value)
  },

  on(node,expr,vm,eventName){
    let fn = vm.$options.methods[expr]
    node.addEventListener(eventName,fn.bind(vm),false)
  },

  // 更新的对象
  updater:{
    modelUpdater(node, value){
      node.value = value
    },
    htmlUpdater(node, value){
      node.innerHTML = value
    },
    textUpdater(node, value){
      // 对元素的文本赋值
      node.textContent = value
    }
  }
} 


// 指令解析器
class Compile{
  constructor(el,vm){
    // 判断一下是否是元素节点,如果没有就通过querySelector去页面上获取
    this.el = this.isELementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1.获取文档碎片对象，放入内存中减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el)

    // 2.编译模板
    this.compile(fragment);

    // 3.追加子元素到根元素
    this.el.appendChild(fragment)
  }
  compile(fragment) {
    // 1.获取到每个子节点
    const childNode = fragment.childNodes;
    [...childNode].forEach(child=>{
      if(this.isELementNode(child)){
        // 到了这里即元素节点
        // 处理编译元素节点
        this.compileElement(child)
      }else{
        // 处理文本节点
        this.compileText(child)
      }

      // 如果子元素下面还有子元素，这里再去判断一下，并且再调用compile这个方法进行遍历
      if(child.childNodes && child.childNodes.length){
        this.compile(child)
      }
    })
  }

  // 编译元素节点
  compileElement(node){
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      // 举例 v-model="msg";   v-model就是name， msg就是value
      const {name, value} = attr;
      if(this.isDirective(name)){
        // 是一个指令，或者是v-model，v-text, v-on:click...
        const [,dirctive] = name.split('-') // html, model, text
        const [dirName, eventName] = dirctive.split(":"); // text, html, model, no
        compileUtil[dirName](node,value,this.vm,eventName)

        // 删除带有指令的属性
        node.removeAttribute('v-'+dirName)
      }else if(this.isEventName(name)){ // @click="handerclick"
        let [,eventName] = name.split('@')
        compileUtil['on'](node,value,this.vm,eventName)
      }
    });
  }

  // 判断是否是指令
  isDirective(name){
    return name.startsWith('v-')
  }

  // 编译文本节点
  compileText(node){
    // 解析插值语法 即: {{}}
    const content = node.textContent
    if(/\{\{.+?\}\}/.test(content)){
      compileUtil['text'](node,content,this.vm)
    }
  }

  // 事件名
  isEventName(attrName){
    return attrName.startsWith('@')
  }

  // 创建文档对象的方法
  node2Fragment(el){
    // 创建文档碎片对象
    const f = document.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild){
      f.appendChild(firstChild)
    }
    return f
  }

  // 判断是否是节点的方法
  isELementNode(node){
    // 如果nodeType等于1 即带面是元素节点
    return node.nodeType === 1
  }
}
class Mvue{
  constructor(options){
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if(this.$el){
      // 1.实现一个数据的观察者, 观察数据将data传进去
      new Observer(this.$data)
      // 2.实现一个指令的解析器,所以要把元素以及实例对象传进去
      new Compile(this.$el,this)
      this.proxyData(this.$data)
    }
  }
  proxyData(data){
    for(const key in data){
      Object.defineProperty(this,key,{
        get(){
          return data[key]
        },
        set(newValue){
          data[key] = newValue
        }
      })
    }
  }
}