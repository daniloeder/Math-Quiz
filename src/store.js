// src/store.js

import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            score: 0,
            scores: [],
            questions: [],
        };
    },
    mutations: {
        incrementScore(state) {
            state.score++;
        },
        addHighScore(state, { userName, score }) {
            state.scores.push({ id: Date.now(), userName, score });
            state.scores.sort((a, b) => b.score - a.score);
        },
        resetScore(state) {
            state.score = 0;
        },
    },
    actions: {

    },
    getters: {

    }
});

export default store;
