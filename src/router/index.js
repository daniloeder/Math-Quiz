// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import QuizPage from '../components/QuizPage.vue';
import QuizSummary from '../components/QuizSummary.vue';
import HighScores from '../components/HighScores.vue';

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
        path: '/quiz-summary',
        name: 'QuizSummary',
        component: QuizSummary,
        props: route => ({
            userName: route.query.userName,
            correctAnswers: parseInt(route.query.correctAnswers, 10),
            totalQuestions: parseInt(route.query.totalQuestions, 10),
            score: parseInt(route.query.score, 10)
        })
    },
    {
        path: '/scores',
        name: 'Scores',
        component: HighScores 
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
