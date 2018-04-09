import Vue from 'vue';

Vue.directive('click-outside', {
  bind (el, binding) {
    const handler = (e) => {
      if (!el.contains(e.target)) {
        binding.value(e);
      }
    };
    el.clickOutSideHandler = handler;
    document.addEventListener('click', el.clickOutSideHandler);
  },
  unbind (el) {
    document.removeEventListener('click', el.clickOutSideHandler);
    el.clickOutSideHandler = null;
  }
});
