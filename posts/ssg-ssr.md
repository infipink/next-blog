---
title: 'call-apply-bind学习'
date: '2022-07-29'
---

##### 手写call

``````js
Function.prototype._call = function(ctx) {
  // ctx传入是非对象转换成对象，是nul或undefined转换成window
  ctx = ctx ? Object(ctx) : window
  // 获取上下文执行环境
 	ctx.fn = this
  // 处理参数
  let args = [...arguments].slice(1)
  // 执行函数并获取函数返回
  let res = ctx.fn(...args)
  // 删除fn属性
  delete ctx.fn
  // 返回结果
  return result
}
``````

##### 手写apply（和call的区别在于参数的传入稍微改造下就行）

``````js
Function.prototype._apply = function(ctx, arr) {
  // ctx传入是非对象转换成对象，是nul或undefined转换成window
  ctx = ctx ? Object(ctx) : window
  // 获取上下文执行环境
 	ctx.fn = this
  // 执行函数并获取函数返回
  let res = !arr ? ctx.fn() : fn(...arr)
  // 删除fn属性
  delete ctx.fn
  // 返回结果
  return result
}
``````

##### 手写bind

``````js
Function.prototype._bind = function(ctx) {
	if(typeof this !== 'function') {
    throw new TypeError("必须在函数中才能使用_bind方法！")
 	}
  let fn = this
  let args = Array.prototype.slice.call(arguments, 1);
  
  let fB = function () {}
  let fBind = function () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this instanceof fB ? this : ctx, args.concat(bindArgs));
  }
  
  fB.prototype = this.prototype;
  fBind.prototype = new fB();
  
  return fBind
}
``````

