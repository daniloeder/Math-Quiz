<template>
  <div class="score-container flex flex-col h-screen justify-center items-center bg-black p-4 text-white">

    <h2 
        class="welcome-title text-5xl font-extrabold mb-8 animate-slideDown"
    >
        High Scores
    </h2>

    <div class="score-list bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
      <ul>
        <li 
            v-for="(score, index) in highScores" 
            :key="score.id" 
            class="py-2 px-4 hover:bg-gray-700 rounded mt-2 animate-fadeInFromLeft"
            :style="`animation-delay: ${index * 100}ms`"
        >
          <span class="font-bold text-xl">{{ index + 1 }}.</span> {{ score.userName }} - <span class="text-green-400">{{ score.score }}/10</span>
        </li>
      </ul>
    </div>

    <router-link 
        class="return-link bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300 animate-pulse" 
        to="/"
    >
        Back to Home
    </router-link>

  </div>
</template>

<style scoped>
@keyframes slideDown {
    0% {
        opacity: 0;
        transform: translateY(-50%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInFromLeft {
    0% {
        opacity: 0;
        transform: translateX(-50%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(0.95);
    }
}

.animate-slideDown {
    animation: slideDown 0.7s forwards;
}

.animate-fadeInFromLeft {
    animation: fadeInFromLeft 0.7s forwards;
}

.animate-pulse {
    animation: pulse 1.5s infinite;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['scores']),
    highScores() {
      // Return the top 10 scores or all scores if less than 10
      return this.scores.slice(0, 10);
    },
  },
};
</script>
