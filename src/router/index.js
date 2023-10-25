// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import QuizPage from '../components/QuizPage.vue';
import ScoresPage from '../components/ScoresPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizPage
  },
  {
    path: '/scores',
    name: 'Scores',
    component: ScoresPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
