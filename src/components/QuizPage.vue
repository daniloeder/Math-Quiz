<template>
  <div>
    <h2>Welcome, {{ userName }}!</h2>
    <h2>Question {{ questionNumber }} of 10: {{ question.text }}</h2>
    <div v-if="timeLeft > 0">Time left: {{ timeLeft }}s</div>
    <div>Lives: {{ lives }}</div>
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
      feedback: "",
      questionNumber: 1,
      totalQuestions: 0, // Initialize totalQuestions
      timeLeft: 10,
      timerInterval: null,
      timeoutId: null,
      userName: "",
      lives: 3,
      submitting: false
    };
  },
  created() {
    this.userName = this.$route.query.userName || "Anonymous";
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
      if (this.questionNumber > 10 || this.lives <= 0) {
        // Redirecting to the QuizSummary page with necessary data
        this.$router.push({
          path: "/quiz-summary",
          query: {
            userName: this.userName,
            correctAnswers: this.$store.state.score.toString(),
            totalQuestions: this.totalQuestions.toString(), // Updated here
            score: this.$store.state.score.toString(),
          },
        });
        return;
      }
      const difficulty = this.$route.query.difficulty || "easy";
      this.question = generateQuestion(difficulty);
      this.answer = "";
      this.startTimer();
      this.totalQuestions++;
    },
    submitAnswer() {
      if (this.submitting) return; // Prevent multiple rapid submits

      this.submitting = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      const isCorrect =
        parseFloat(this.answer).toFixed(2) === this.question.answer.toFixed(2);

      if (isCorrect) {
        this.feedback = "Correct!";
        this.$store.commit("incrementScore");
        this.questionNumber++; // Increment question number only when correct
      } else {
        this.feedback = "Incorrect.";
        this.lives--;
        if (this.lives <= 0) {
          this.feedback += " You've run out of lives!";
        }
      }

      if (this.questionNumber > 10 || this.lives <= 0) {
        // Redirect to QuizSummary when the quiz ends
        this.$router.push({
          path: "/quiz-summary",
          query: {
            userName: this.userName,
            correctAnswers: this.$store.state.score.toString(),
            totalQuestions: this.totalQuestions.toString(),
            score: this.$store.state.score.toString(),
          },
        });
        return;
      }

      this.timeoutId = setTimeout(() => {
        this.feedback = "";
        this.generateNewQuestion();
        this.submitting = false; // Re-enable submitting for the next question
      }, 2000);
    },
  },
  watch: {
    // Watch for changes in route to reset the timer
    $route() {
      if (this.$route.name === "Quiz") {
        this.startTimer();
      }
    },
  },
};
</script>

<style scoped>

</style>
