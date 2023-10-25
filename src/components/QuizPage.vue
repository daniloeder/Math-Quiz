<template>
  <div>
    <h2>{{ question.text }}</h2>
    <input v-model="answer" type="number" />
    <button @click="submitAnswer">Submit</button>
    <div v-if="feedback">{{ feedback }}</div>
  </div>
</template>

<script>
// import { ref, computed } from "vue";

export default {
  data() {
    return {
      question: {},
      answer: null,
      feedback: ''
    };
  },
  created() {
    this.generateQuestion();
  },
  methods: {
    generateQuestion() {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      this.question = {
        text: `What is ${num1} + ${num2}?`,
        answer: num1 + num2
      };
    },
    submitAnswer() {
      if (parseInt(this.answer) === this.question.answer) {
        this.feedback = "Correct!";
        this.$store.commit('incrementScore');
        setTimeout(() => {
          this.feedback = "";
          this.generateQuestion();
        }, 2000);
      } else {
        this.feedback = "Incorrect. Try again.";
      }
    }
  }
};
</script>
