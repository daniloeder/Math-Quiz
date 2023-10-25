<template>
  <div>
    <h2>High Scores</h2>
    <ul>
      <li v-for="(score, index) in highScores" :key="score.id">
        {{ index + 1 }}. {{ score.userName }} - {{ score.score }}/10
      </li>
    </ul>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

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
