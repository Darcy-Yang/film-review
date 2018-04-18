// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './directives';
import Message from './components/Message';

let MessageBox = Vue.extend(Message);
let instance;

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

Vue.prototype.$message = message;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
