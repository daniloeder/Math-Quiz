<template>
  <div 
    class="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 transition-all ease-in-out duration-500 transform scale-95 opacity-0 animate-fadeInScale"
  >
    <h1 class="text-4xl text-white font-bold mb-6 animate-bounce">Welcome to Math Quiz!</h1>
    
    <div 
      class="bg-white p-6 rounded-lg shadow-md w-96 transition-transform transform hover:scale-105"
    >
      <input 
        v-model="userName" 
        placeholder="Enter your name" 
        class="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 hover:scale-105 transition-transform"
      />

      <select 
        v-model="difficulty" 
        class="w-full p-2 mb-4 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 hover:scale-105 transition-transform"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button 
        @click="startQuiz" 
        class="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 hover:scale-105 transition-transform"
      >
        Start Quiz
      </button>
    </div>

    <router-link 
      to="/scores" 
      class="high-score-link mt-4 text-white hover:underline hover:text-yellow-300 transition duration-300 animate-float"
    >
      High Scores
    </router-link>
  </div>
</template>

<style scoped>
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-fadeInScale {
  animation: fadeInScale 0.6s forwards;
}

.animate-float {
  animation: float 1s infinite;
}
</style>

<script>
export default {
  data() {
    return {
      difficulty: 'easy',
      userName: ''
    };
  },
  methods: {
    startQuiz() {
      this.$router.push({
        path: '/quiz',
        query: { difficulty: this.difficulty, userName: this.userName }
      });
    }

  }
};
</script>
