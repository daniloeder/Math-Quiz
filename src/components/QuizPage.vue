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
import generateQuestion from "@/utils/questionGenerator";

export default {
  data() {
    return {
      question: {},
      answer: null,
      feedback: '',
      questionNumber: 1,
      timeLeft: 10,
      timerInterval: null,
      timeoutId: null
    };
  },
  created() {
    this.startTimer();
    this.generateNewQuestion();
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
    generateNewQuestion() {
      if (this.questionNumber > 10) {
        this.feedback = "Quiz completed!";
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        return;
      }

      const difficulty = this.$route.query.difficulty || 'easy';
      this.question = generateQuestion(difficulty);
      this.answer = "";
      this.startTimer();
    },
    submitAnswer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
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
        this.generateNewQuestion();
      }, 2000);
    }
  }
};
</script>
