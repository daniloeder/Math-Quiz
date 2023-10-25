<template>
  <div>
    <h1>Welcome to Math Quiz!</h1>
    <input v-model="userName" placeholder="Enter your name" />
    <!-- Added a dropdown to select difficulty -->
    <select v-model="difficulty">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button @click="startQuiz">Start Quiz</button>
    <router-link to="/scores">High Scores</router-link>
  </div>
</template>

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
