// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './directives';
import Message from './components/Message';
import Confirm from './components/Confirm';

let MessageBox = Vue.extend(Message);
let ConfirmBox = Vue.extend(Confirm);
let instance;

ConfirmBox.prototype.closeConfirm = function () {
  var vm = this;
  var promise = new Promise(function (resolve, reject) {
    resolve();
    // vm.$destory();
    vm.showConfirm = false;
    // console.log(vm.showConfirm);
  })
  return promise;
}

var message = function (options, type) {
  if (typeof options === 'string') {
    options = { message: options };
  };
  instance = new MessageBox({ data: options });
  instance.vm = instance.$mount();
  if (typeof type === 'string') {
    instance.vm.$el.className = `message ${type}`;
  }
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
}

var confirm = function (options) {
  if (typeof options === 'string') options = { message: options };
  instance = new ConfirmBox({ data: options });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
}

Vue.prototype.$message = message;
Vue.prototype.$confirm = confirm;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
