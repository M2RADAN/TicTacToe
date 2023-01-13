import { createApp } from "vue";
import "./style/style.css";
import "./style/normalize.css";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Game from "./pages/Game/Game.vue";
import Main from "./pages/Main/Main.vue";


const routes = [
	{ path: "/game", component: Game },
	{ path: "/", component: Main },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
