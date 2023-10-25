<template>
  <div>
    <h2>Question {{ questionNumber }} of 10: {{ question.text }}</h2>
    <div v-if="timeLeft > 0">Time left: {{ timeLeft }}s</div>
    <input v-model="answer" @keyup.enter="submitAnswer" type="number" />
    <button @click="submitAnswer">Submit</button>
    <div v-if="feedback">{{ feedback }}</div>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {},
      answer: null,
      feedback: '',
      questionNumber: 1, // Start with the first question
      timeLeft: 10,
      timerInterval: null, // to store the interval ID
      timeoutId: null  // to store the timeout ID
    };
  },
  created() {
    this.startTimer();
    this.generateQuestion();
  },
  methods: {
    startTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timeLeft = 10;

      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timerInterval);
          this.submitAnswer();
        }
      }, 1000);
    },
    generateQuestion() {
      // Check if we've already completed 10 questions
      if (this.questionNumber > 10) {
        this.feedback = "Quiz completed!";
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        return; // Don't generate another question
      }

      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      this.question = {
        text: `What is ${num1} + ${num2}?`,
        answer: num1 + num2
      };
      this.answer = ""; // Clear the previous answer
      this.startTimer();
    },
    submitAnswer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId); // Clear the previous timeout
      }

      if (parseInt(this.answer) === this.question.answer) {
        this.feedback = "Correct!";
        this.$store.commit('incrementScore');
      } else {
        this.feedback = "Incorrect.";
      }

      this.timeoutId = setTimeout(() => {
        this.feedback = "";
        this.questionNumber++;
        this.generateQuestion();
      }, 2000);
    }
  }
};
</script>
