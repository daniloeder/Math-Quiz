<template>
  <div>
    <h1>Welcome to Math Quiz!</h1>
    <button @click="startQuiz">Start Quiz</button>
    <router-link to="/scores">High Scores</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    startQuiz() {
      this.$router.push('/quiz');
    }
  }
};
</script>
