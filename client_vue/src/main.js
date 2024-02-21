import { createApp } from 'vue';
import { createPinia } from 'pinia';
const pinia = createPinia();

import './style.css'
import router from './router/index.js'
import App from './App.vue'

// bootstrap layout
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
// ant design
import { Button, List, Menu, Drawer } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

let app = createApp(App)
if (app) {
	app.use(Button);
	app.use(List);
	app.use(Menu);
	app.use(Drawer);
	app.use(router);
	app.use(pinia);
	// app.use(axios)

	app.mount('#app')
}

