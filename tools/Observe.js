var Observe = (function () {
  var __messages = {}
  return {
    // 订阅者注册信息接口
    subscribe: function (type, fn) {
      // 判断是否有订阅者在列队 数组 中
      if (typeof __messages[type] === 'undefined') { //如果没有
        __messages[type] = [fn]
      } else { // 如果已经存在相同类型的消息
        __messages[type].push(fn)
      }
    },
    // 发布消息接口
    fire: function (type, args) {
      if (!__messages[type]) {
        return;
      }
      var events = {
        type: type,
        args: args
      }
      var i = 0
      var len = __messages[type].length
      for (; i < len; i++) {
        __messages[type][i].call(this, events) // 执行当前相同type的订阅消息
      }
    },
    // 移除信息接口
    remove: function (type, fn) {
      if (__messages[type] instanceof Array) {
        var i = __messages[type].length
        for (; i >= 0; i--) {
          __messages[type][i] === fn && __messages[type].splice(i, 1) // 从当前消息列队删除订阅
        }
      }
    }
  }
})();
export default Observe

// // 订阅消息
// Observe.subscribe('test',function(e){
//   console.log(e);
// })
// var fn = function(e){
//   console.log(e);
// }
// Observe.subscribe('test1',fn)

// // 发布 ‘test’ 消息
// Observe.fire('test',{msg:'这是传递的参数'});
// Observe.fire('test1',{msg:'这是传递的参数1'});
// // 移除这则订阅消息
// Observe.remove('test1',fn);
// Observe.fire('test1',{msg:'这是传递的参数1'}); // 发布消息后也不会输出
