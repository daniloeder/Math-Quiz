<template>
  <div>
    <h2>Welcome, {{ userName }}!</h2>
    <div v-if="lives > 0 && questionNumber <= 10 && timeLeft > 0">
      <h2>Question {{ questionNumber }} of 10: {{ question.text }}</h2>
      <div>Time left: {{ timeLeft }}s</div>
      <div>Lives: {{ lives }}</div>
      <input v-model="answer" @keyup.enter="submitAnswer" type="number" />
      <button @click="submitAnswer">Submit</button>
    </div>
    <div v-if="feedback">{{ feedback }}</div>
    <div v-if="showCorrectAnswer">{{ showCorrectAnswer }}</div>
    <div v-if="questionNumber > 10 || lives <= 0">
      <p>Test finished.</p>
      <p>See results in <router-link :to="{ path: '/quiz-summary', query: { userName, correctAnswers, totalQuestions, score } }">Summary</router-link></p>
      <button @click="goToHighScores">High Scores</button>
      <button @click="goToSummary">Summary</button>
      <button @click="goToHome">Home</button>
    </div>
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
      correctAnswer: null,
      questionNumber: 1,
      totalQuestions: 0,
      correctAnswers: 0,
      timeLeft: 10,
      timerInterval: null,
      timeoutId: null,
      userName: '',
      lives: 3,
      submitting: false,
      showCorrectAnswer: '',
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
        this.addToHighScores(); // Add score when the quiz ends
        return;
      }
      const difficulty = this.$route.query.difficulty || 'easy';
      const newQuestion = generateQuestion(difficulty);
      this.question = newQuestion;
      this.answer = '';
      this.correctAnswer = newQuestion.answer;
      this.startTimer();
      this.totalQuestions++;
    },
    submitAnswer() {
      if (this.submitting || this.questionNumber > 10 || this.lives <= 0) return;
      this.submitting = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      const isCorrect = parseFloat(this.answer).toFixed(2) === this.correctAnswer.toFixed(2);

      if (isCorrect) {
        this.feedback = "Correct!";
        this.correctAnswers++;
      } else {
        this.feedback = "Incorrect.";
        this.lives--;
        if (this.lives <= 0) {
          this.feedback += " You've run out of lives!";
        }
        this.showCorrectAnswer = `The answer is ${this.correctAnswer % 1 === 0 ? this.correctAnswer.toFixed(0) : this.correctAnswer.toFixed(1)}.`;
      }

      this.timeoutId = setTimeout(() => {
        this.feedback = '';
        this.showCorrectAnswer = '';
        this.questionNumber++;
        this.generateNewQuestion();
        this.submitting = false;
      }, 2000);
    },
    addToHighScores() {
      if (this.correctAnswers > 0) {
        this.$store.commit('addHighScore', {
          userName: this.userName,
          score: this.correctAnswers
        });
      }
    },
    goToSummary() {
      this.$router.push({
        path: '/quiz-summary',
        query: {
          userName: this.userName,
          correctAnswers: this.correctAnswers.toString(),
          totalQuestions: this.totalQuestions.toString(),
          score: this.correctAnswers.toString()
        }
      });
    },
    goToHighScores() {
      this.$router.push('/scores');
    }
  }
};
</script>
