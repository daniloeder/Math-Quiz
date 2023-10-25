// src/store.js

import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            score: 0,
            scores: [],
            questions: []
        };
    },
    mutations: {
        incrementScore(state) {
            state.score++;
        },
        addHighScore(state, score) {
            state.scores.push({id: Date.now(), points: score});
        },
        resetScore(state) {
            state.score = 0;
        }
    },
    actions: {
        
    },
    getters: {
        
    }
});

export default store;
