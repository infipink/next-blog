---
title: '前端面试题'
date: '2022-07-20'
---

### 一、涉及到循环

###### 1、如何跳出forEach的循环？

除了抛出异常意外，没有办法中止或跳出forEach循环。

补充：foreach不会改变原数组。不过`forEach` 不会直接改变调用它的对象，但是那个对象可能会被 `callback` 函数改变。

###### 2、结合项目说一说map的作用？

map会返回一个新数组，`map `不修改调用它的原数组本身（当然可以在 `callback` 执行时改变原数组）

### 二、涉及webPack

###### 1、webpack热更新原理？

在项目中使用HRM（模块热替换功能），一般有两种方法：1、手动添加部分代码；2、借助现成的工具，如react-hot-loader、vue-loader等。

在本地开发环境下，浏览器是客户端，webpack-dev-server（WDS）相当于我们的服务端。HRM的核心就是拉取更新后的资源（实际上是做了个chunk diff来对比，更新需要更新的部分）。

首先就是浏览器上面时候去拉取这些更新。这里的WDS与浏览器之间维护了一个websocket，当本地的资源发生了变换的时候，WDS会向浏览器推送更新事件，并带上这次构建的hash，让客户端与上一次资源进行比对。比对完之后，客户端就会知道新的构建结果和当前的是否有差别，有了差别就会向WDS发起一个请求来获取更改文件的列表。通常这个请求的名字为[hash].hot-update.json。客户端知道了要更新的内容后，会借助这个信息继续向WDS获取该chunk的增量更新。获取到更新后，客户端该怎么操作，就不是WDS做的了。开发者可以根据滋生场景进行之后的处理。

###### 2、chunk是什么？

字面意思就是代码块。在webPack中可以理解成被抽象和包装过后的一些模块。

webPack会从入口文件开始检索，并将具有以来关系的模块生成一棵依赖树，最终得到chunk，由这个chunk得到的打包产物一般称之为bundle。

###### 3、tree-shaking的了解程度？

```

```

###### 4、自己构造一个前端脚手架

```

```

###### 5、webpack-dev-server如何处理跨域

```

```

###### 6、优化打包速度

```

```

### 三、涉及VUE

###### 1、vue实例挂载过程

在源码中又个Vue的构造函数

```js
//src\core\instance\index.js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

在Vue实例中存在_init()函数来进行初始化，函数具体代码如下

```js
// src\core\instance\init.js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    // 合并属性，判断初始化的是否是组件，这里合并主要是 mixins 或 extends 的方法
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else { // 合并vue属性
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 初始化proxy拦截器
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化组件生命周期标志位
    initLifecycle(vm)
    // 初始化组件事件侦听
    initEvents(vm)
    // 初始化渲染方法
    initRender(vm)
    // 调用beforCreate方法，次数数据初始化尚未完成，故无法访问data、props属性
    callHook(vm, 'beforeCreate')
    // 初始化依赖注入内容，在初始化data、props之前
    initInjections(vm) // resolve injections before data/props
    // 初始化props/data/method/watch/methods
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    // 调用created方法
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
    // 挂载元素
    if (vm.$options.el) {
      //调用挂载方法$mount
      vm.$mount(vm.$options.el)
    }
  }

```

([面试官：Vue实例挂载的过程中发生了什么? · Issue #5 · febobo/web-interview (github.com)](https://github.com/febobo/web-interview/issues/5)

###### 2、Proxy API替代definePropery API的作用

1️⃣definePropery的局限性在于它只针对单例属性做监听。Vue2.x中对data中的属性做了遍历+递归，为每个属性设置了getter、setter。这也就是为什么vue只对data中预定义过的属性做出响应的原因

2️⃣Vue中使用下标的方式直接修改属性的值或添加一个预先不存在的对象是无法做到setter监听的，这是definePropery的局限性

3️⃣Proxy的监听是针对一个对象的，那么对这个对象的所用操作都会进入监听，这就完全可以代理所有属性，会带来很大的性能提升和更优的代码

4️⃣Proxy可以理解成在目标对象之前架设一层拦截，外界对该对象的访问都必须通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

5️⃣<span style="color: hotpink">响应式是惰性。</span>在Vue2.x中，对于一个深度嵌套的对象，要劫持它内部深层次的变化，就要递归整个对象，执行Objece.definePropery把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。在Vue3.0中，使用Proxy API并不能监听到对象内部层次的属性变化，因此它的处理方式是在getter中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式才能变成响应式，简单的可以说是按需实现响应式，减少性能消耗。

###### 3、手写发布订阅模式

```js
//简易版发布订阅
{
  const map = {}
  
  const listen = (key, fn) => {
    if(!map[key]) {
      map[key] = []
    }
    map[key].push(fn)
  }
  
  const trigger = (key, data) => {
    map[key].forEach(item => item(data));
  }
  
  //test
  listen("event1", () => {console.log("enent1")})
  listen("event2", () => {console.log("event2")})
  
  trigger("event1") //event1
  trigger("event2")//event2
}
```

###### 4、生命周期

有组件实例创建之初（beforeCreate）➡️组件实例已完全创建（created）➡️组件挂载之前（beforeMount）➡️组件挂载到实例之后（mounted）➡️组件数据更新之前（beforeUpdate）➡️组件实例更新之后（updated）➡️组件实例销毁之前（beforeDestory）➡️组件实例销毁之后（destroyed）

在缓存组件（keep-alive）内，有actived（keep-alive缓存的组件激活时），有deactivated（keep-alive缓存饿组件停用时调用）

[生命周期图](https://camo.githubusercontent.com/5e02ee73fbeeafcfd77cf0b49db102aa03e1fdcb251a96877dcbb8ddd878d902/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f34343131343738302d336163612d313165622d383566362d3666616337376330633962332e706e67)

###### 5、关于双向绑定

从MVVM的角度去理解双向绑定

Modal（数据层）：应用的数据及业务逻辑

View（View）：应用的展示效果，各类UI组件

ViewModal（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

ViewModal：主要负责数*据变化后更新视图，视图变化后更新数据*，这得益于Obverser（监听器），Compiler（解析器）

解析器会对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数。

监听器会监听所有数据的属性。

双向绑定的具体过程：new Vue()初始化的时候，对data函数返回的数据进行响应化处理，该过程由Observer来完成➡️初始化的同时对模版执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，该过程由Compiler来完成➡️同时定义一个更新函数和Watcher，在之后数据变化时Watcher会调用对应的更新函数➡️由于data里的某个key可能在视图中出现多次，故每个key都需要一个依赖收集器Dep来管理多个Watcher➡️等到之后data中的数据一发生变化，dep就会去告诉所有Watcher去执行更新函数

[流程绑定图](https://camo.githubusercontent.com/c5cf751d6ce2c551e3a6b63279215c50c3348093263084f28b1132bdb509a342/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f65353336393835302d336163392d313165622d383566362d3666616337376330633962332e706e67)

### 四、涉及浏览器兼容

### 五、涉及浏览器性能

###### 1、浏览器缓存如何提升性能

###### 2、大型文件上传优化方案

```

```



### 六、JS常见问题

###### 1、解构赋值是深拷贝还是浅拷贝？

```js
const foo = {
    name: "jack",
    gender: "F",
    addr: {prov: "zj", city: "js"}
};
let {name, gender, addr} = foo;
name = "rose";
gender = "M";
addr.prov = "ah";
addr.city = "hn";
console.log(name, gender, addr); //rose, M, {prov: "ah", city: "hn"}
console.log(foo); //{name: "jack", gender: "F",addr: {prov: "ah", city: "hn"}}
```

对于属性是深拷贝，对于对象引用是浅拷贝（会改变被引用对象值）。

###### 2、深拷贝实现方法

```js
//way1
let cloneObj = JSON.parse(JSON.stringify(obj));

//way2
function deepClone(obj) {
    if(obj && typeof obj === "object") {
        let objClone = Array.isArray(obj) ? [] : {};
        for (key in obj) {
            //判断子元素是否为对象，是的话，递归复制
            if (obj[key] && typeof obj[key] === "objecct") {
                objClone[key] = deepClone(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    retuen objClone;
}
```

###### 3、作用域的本质是什么？闭包和作用域的关系是什么？

```
作用域是变量绑定的有效范围，js中的作用域是静态作用域。
闭包是对作用域的一种延伸。

```

###### 4、let、const、var三者的本质区别？

```js
//在js里没有块级作用域。
for(var i = 0; i < 8; i++) {
  var a = "tutu"
}
console.log(a) //"tutu"
//let的声明的变量具有块级作用域。同时let在全局作用域声明的的变量并不是全局对象的属性（即无法使用window.来获取）。
//const是来声明常量的（定义原始类型，改变量不可修改；定义引用类型，是指当前变量的指针不可修改）
```

###### 5、数组的本质是什么？运用了什么设计模式？数组和对象的关系是什么？

```js
js中数组并不一定是连续内存（可以理解为并不是严格意义上的数组），数组是否分配连续内存取决于数组成员的类型，如果是单一类型会分配连续内存，如果包含了各种各样的类型，会通过哈希映射的方式创建（对于读取操作，哈希表的效率并不高，而修改删除的效率比较高），则是非连续类型。
为了进一步优化功能的实现，Javascript中出现了ArrayBuffer，它可以创建连续的内存。

```

###### 6、箭头函数解决了什么问题？

```
参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
箭头函数作用：更简短的函数并且不绑定this。
在箭头函数未出现之前，每一个新函数会根据它是如何调用来定义这个函数的this值。
箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。所以箭头函数不能使用new操作符构建。
```

###### 7、关于this

```

```

###### 8、原型和原型链

```
原型模式是js语言的核心模式，可以说js的所有都来源于同一个始祖对象Object（存在例外）。
```

###### 9、Object.create的理解

```js
if(typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if(typeof proto !== "object" && typeof proto !== "function") {
      throw new Error('Object prototype may only be an Object: ' + proto)
    } else if(proto === null) {
      throw new Error("不支持null作为首个参数")
    }
    if(typeof propertiesObject !== "undefined") throw new Error("参数错误")
    function F() {}
    F.prototype = proto
    return new F()
  }
}

//观察下面代码
let a = {name: "aa"}
let b = Object.create(a)
console.log(b) //{}
console.log(b.name) //"aa"
b.name = "bb"
console.log(a.name) //"aa"
```

###### 10、清晰认知call，apply，bind

```

```

###### 11、函数柯里化

```js
柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性。
实现思路：通过传入函数，将函数体的参数进行分割。
//https://github.com/mqyqingfeng/Blog/issues/42
var curry = (fn) =>
  (judge = (...args) =>
    args.length >= fn.length ? fn(...args) : (...arg) => judge(...args,...arg));
```



### 七、git使用常见问题

https://www.docs4dev.com/tools/learnGitBranching/?locale=zh_CN

```
常用操作：
查看分支： git branch -a
切换远程分支： git checkout -b dev origin/dev
删除远程分支：git push origin --delete <branchName>
```



###### 1、提交遇到问题

避免对代码的pre-commit hook：在commit的后面加上 ”--no-verify“

push的时候一定记得先pull，出现问题就看 git status

###### 2、git远程新建了分支，本地看不到解决方法

切换到主干，重新拉下代码

```
git checkout master
git pull
git branch -a
```

###### 3、git合并分支操作

```
git merge
```

###### 4、git新建远程分支

```
https://www.jianshu.com/p/1d30cad61570
```



### 八、关于node

###### 1、查看包安装指令

npm list -g 查看全局安装了那些包

npm ls 包名称 -g 查看是否安装了某个包

### 九、开发注意点

###### 1、涉及到溢出字段的地方要及时处理

```css
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

###### 2、使用flex布局的时候，配合min-width || min-height

```css
.my-flex {
  display: flex;
}
.flex-one {
  flex: 1;
}
.flex-other {
  min-width: 80px
}
```

###### 3、图片加载失败处理

onerror事件

```js
imgError() {
  let img = event.srcElement
  img.src = "缺省图地址"
  img.onerror  = null
}
```

###### 4、一些不常用的浏览器事件

```js
//监听页面可见不可见事件---可以用于浏览器息屏之后重新进入的更新
document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        console.log("页面不可见");
      }
      if (document.visibilityState === "visible") {
        console.log("页面可见");
      }
    });
```



### 十、网络协议

###### 1、http的加密方式

###### 2、证书签名如何防止被篡改

###### 3、webSocket和ajax的区别

```js
ajax是短链接，是异步js和xml，是一种创建交互式网页应用的网页开发技术。适用于非实时数据交互场景。需要客户端发起请求。
webSocket是长连接，是h5的一种新协议，实现了浏览器和服务器的全双工通信，本质是先通过http/https协议进行握手后创建一个TCP连接，服务端与客户端通过此TCP协议进行实时通信。适用于实时交互场景。服务端和客户端可以进行相互推送。

```

###### 4、如何防范xss、csrf
