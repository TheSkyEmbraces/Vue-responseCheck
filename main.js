import Vue from 'vue';
import responseCheck from './responseCheck';

new Vue({
    render: createElement => createElement(responseCheck)
}).$mount('#root');