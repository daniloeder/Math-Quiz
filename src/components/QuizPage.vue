<template>
  <div
    class="quiz-container flex flex-col h-screen justify-center items-center bg-gradient-to-r from-yellow-300 via-orange-400 to-purple-500 p-4">

    <!-- User Welcome Text -->
    <h2
      class="welcome-title text-3xl text-white font-bold mb-6 transform transition-transform duration-500 hover:scale-105">
      {{ userName }}</h2>

    <!-- Questions and Input -->
    <div v-if="(lives > 0 && questionNumber <= 10) || feedback"
      class="question-container bg-white p-6 rounded-lg shadow-lg w-96 mb-4">
      <h2 class="question-title text-lg text-gray-500 mb-4">Question {{ questionNumber }} of 10:</h2>
      <h3 class="question-text text-xl font-semibold mb-4">{{ question.text }}</h3>
      <div class="time-left text-orange-600 mb-2 animate-pulse">Time left: {{ timeLeft }}s</div>
      <div class="lives text-purple-600 mb-4">
        <span v-for="i in lives" :key="i" class="mr-2">&#10084;</span>
      </div>
      <input v-model="answer" @keyup.enter="submitAnswer" type="number"
        class="answer-input w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400" />
      <button @click="submitAnswer"
        class="submit-button w-full bg-orange-600 text-white p-2 rounded transform transition-transform hover:scale-105">Submit</button>
    </div>

    <!-- Feedback -->
    <div class="feedback-placeholder">
      <div v-if="feedback || showCorrectAnswer" class="feedback-container text-center mb-4">
        <div v-if="feedback" class="feedback text-lg font-semibold" :style="{ color: feedbackColor }">{{ feedback }}</div>
        <div v-if="showCorrectAnswer" class="correct-answer text-lg" :style="{ color: 'red' }">{{ showCorrectAnswer }}
        </div>
      </div>
    </div>

    <!-- Quiz End Buttons -->
    <div v-if="(questionNumber > 10 || lives <= 0) && !feedback" class="quiz-end text-center">
      <p class="text-white text-xl mb-4">Test finished.</p>
      <p class="text-lg mb-2">See results in <router-link
          :to="{ path: '/quiz-summary', query: { userName, correctAnswers, totalQuestions, score } }"
          class="summary-link text-yellow-300 hover:underline">Summary</router-link></p>
      <button @click="goToHighScores"
        class="high-scores-button bg-purple-600 text-white p-2 rounded mx-2 hover:bg-purple-700 transform hover:rotate-3 transition duration-300">High
        Scores</button>
      <button @click="goToSummary"
        class="summary-button bg-orange-600 text-white p-2 rounded mx-2 hover:bg-orange-700 transform hover:rotate-3 transition duration-300">Summary</button>
      <button @click="goToHome"
        class="home-button bg-yellow-400 text-purple-600 p-2 rounded mx-2 hover:bg-yellow-500 transform hover:rotate-3 transition duration-300">Home</button>

    </div>

    <!-- Back Home Button -->
    <div v-if="lives > 0 && questionNumber <= 10" class="back-home-button-container mt-4">
      <router-link to="/"
        class="back-home-button bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">Back to
        Home</router-link>
    </div>
  </div>
</template>


<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes welcomePulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulse 1s infinite;
}

.animate-welcome {
  animation: welcomePulse 5s infinite;
}

.heart {
  display: inline-block;
  color: red;
  font-size: 1.5em;
  transition: opacity 0.3s;
}

.fade-out-heart {
  animation: fadeOut 0.5s forwards;
}

@keyframes fadeOut {
  100% {
    opacity: 0;
  }
}

.feedback-placeholder {
  min-height: 80px;
  width: 100%;
}
</style>

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
        this.addToHighScores();
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
        this.feedbackColor = "green";
        this.feedback = "Correct!";
        this.correctAnswers++;
      } else {
        this.feedbackColor = "red";
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
