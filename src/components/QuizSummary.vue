<template>
    <div>
        <h2>Quiz Summary for {{ userName }}</h2>
        <p><strong>Questions Answered Correctly:</strong> {{ correctAnswers }}</p>
        <p><strong>Questions Answered Incorrectly:</strong> {{ totalQuestions - correctAnswers }}</p>
        <p><strong>Total Questions:</strong> {{ totalQuestions }}</p>
        <p><strong>Score:</strong> {{ score }}</p>

        <!-- Add a button to go to the High Scores page -->
        <router-link to="/scores">View High Scores</router-link>

        <!-- Back to Home link -->
        <router-link to="/">Back to Home</router-link>
    </div>
</template>
  
<script>
export default {
  props: ['userName', 'correctAnswers', 'totalQuestions', 'score'],
  methods: {
    addToHighScores() {
      // Dispatch an action to add the user's score to the store
      this.$store.commit('addHighScore', {
        userName: this.userName,
        score: this.score,
      });
    },
  },
};
</script>
