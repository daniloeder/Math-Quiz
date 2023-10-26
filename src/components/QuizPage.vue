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

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import generateQuestion from "@/utils/questionGenerator";

// Reactive Variables
const question = ref({});
const answer = ref(null);
const feedback = ref('');
const feedbackColor = ref('');  // Define feedbackColor
const correctAnswer = ref(null);
const questionNumber = ref(1);
const totalQuestions = ref(0);
const correctAnswers = ref(0);
const timeLeft = ref(10);
const timerInterval = ref(null);
const timeoutId = ref(null);
const userName = ref('');
const lives = ref(3);
const submitting = ref(false);
const showCorrectAnswer = ref('');
const route = useRoute();
const router = useRouter();
const store = useStore();

// Functions
const startTimer = () => {
  clearInterval(timerInterval.value);
  timeLeft.value = 10;
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval.value);
      submitAnswer();
    }
  }, 1000);
};

const generateNewQuestion = () => {
  if (questionNumber.value > 10 || lives.value <= 0) {
    addToHighScores();
    return;
  }
  const difficulty = route.query.difficulty || 'easy';
  const newQuestion = generateQuestion(difficulty);
  question.value = newQuestion;
  answer.value = '';
  correctAnswer.value = newQuestion.answer;
  startTimer();
  totalQuestions.value++;
};

const submitAnswer = () => {
  if (submitting.value || questionNumber.value > 10 || lives.value <= 0) return;
  submitting.value = true;

  clearTimeout(timeoutId.value);

  const isCorrect = parseFloat(answer.value).toFixed(2) === correctAnswer.value.toFixed(2);

  feedback.value = isCorrect ? 'Correct!' : 'Incorrect.';
  feedbackColor.value = isCorrect ? 'green' : 'red';

  if (isCorrect) {
    correctAnswers.value++;
  } else {
    lives.value--;
    if (lives.value <= 0) {
      feedback.value += " You've run out of lives!";
    }
    showCorrectAnswer.value = `The answer is ${correctAnswer.value % 1 === 0 ? correctAnswer.value.toFixed(0) : correctAnswer.value.toFixed(1)}.`;
  }

  timeoutId.value = setTimeout(() => {
    feedback.value = '';
    showCorrectAnswer.value = '';
    questionNumber.value++;
    generateNewQuestion();
    submitting.value = false;
  }, 2000);
};

const addToHighScores = () => {
  if (correctAnswers.value > 0) {
    store.commit('addHighScore', {
      userName: userName.value,
      score: correctAnswers.value
    });
  }
};

const goToSummary = () => {
  router.push({
    path: '/quiz-summary',
    query: {
      userName: userName.value,
      correctAnswers: correctAnswers.value.toString(),
      totalQuestions: totalQuestions.value.toString(),
      score: correctAnswers.value.toString()
    }
  });
};

const goToHighScores = () => {
  router.push('/scores');
};

const goToHome = () => {
  router.push('/');
};

// Lifecycle Hook
onMounted(() => {
  userName.value = route.query.userName || "Anonymous";
  startTimer();
  generateNewQuestion();
});

</script>
