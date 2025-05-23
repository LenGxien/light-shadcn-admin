import { createApp } from 'vue';
import './assets/index.css';
import './styles/index.css';
import App from './App.vue';
import router from './router';
import pinia from './stores';

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
