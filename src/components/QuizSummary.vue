<template>
    <div class="summary-container flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 p-4 transition-all ease-in-out duration-500">
        
        <h2 
            class="summary-title text-4xl text-white font-bold mb-6 animate-slideInFromLeft"
        >
            Quiz Summary for {{ userName }}
        </h2>
        
        <div 
            class="summary-details bg-white p-6 rounded-lg shadow-lg w-96 mb-6 text-center transform scale-90 opacity-0 animate-fadeInScale"
        >
            <p class="mb-4"><strong class="text-blue-500">Questions Answered Correctly:</strong> {{ correctAnswers }}</p>
            <p class="mb-4"><strong class="text-pink-400">Questions Answered Incorrectly:</strong> {{ totalQuestions - correctAnswers }}</p>
            <p class="mb-4"><strong class="text-purple-500">Total Questions:</strong> {{ totalQuestions }}</p>
            <p><strong class="text-indigo-500">Score:</strong> {{ score }}</p>
        </div>
  
        <div class="summary-links flex space-x-4">
            <router-link 
                class="summary-link bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 animate-wiggle"
                to="/scores"
            >
                View High Scores
            </router-link>
            <router-link 
                class="summary-link bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition duration-300 animate-wiggle"
                to="/"
            >
                Back to Home
            </router-link>
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeInScale {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideInFromLeft {
    0% {
        opacity: 0;
        transform: translateX(-50%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes wiggle {
    10% {
        transform: rotate(-3deg);
    }
    20% {
        transform: rotate(3deg);
    }
    30% {
        transform: rotate(-3deg);
    }
    40% {
        transform: rotate(3deg);
    }
    50% {
        transform: rotate(0);
    }
}

.animate-fadeInScale {
    animation: fadeInScale 0.7s forwards;
}

.animate-slideInFromLeft {
    animation: slideInFromLeft 0.7s forwards;
}

.animate-wiggle:hover {
    animation: wiggle 0.5s;
}

</style>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const userName = ref('');
const correctAnswers = ref(0);
const totalQuestions = ref(0);
const score = ref(0);

onMounted(() => {
  userName.value = route.query.userName || 'Anonymous';
  correctAnswers.value = Number(route.query.correctAnswers) || 0;
  totalQuestions.value = Number(route.query.totalQuestions) || 0;
  score.value = Number(route.query.score) || 0;
});

</script>
