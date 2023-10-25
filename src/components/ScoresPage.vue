<template>
  <div>
    <h2>High Scores</h2>
    <ul>
      <li v-for="score in scores" :key="score.id">{{ score.points }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    scores() {
      return this.$store.state.scores;
    }
  }
};
</script>
