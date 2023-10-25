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
      questionNumber: 1,
      timeLeft: 10,
      timerInterval: null,
      timeoutId: null,
      difficulty: this.$route.query.difficulty || 'easy', // set difficulty based on route query or default to 'easy'
      difficultyMapping: {
        easy: 10,
        medium: 20,
        hard: 50
      }
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

      const maxNum = this.difficultyMapping[this.difficulty];
      let num1 = Math.floor(Math.random() * maxNum) + 1;
      let num2 = Math.floor(Math.random() * maxNum) + 1;

      // Select operation based on question number
      const operations = ["+", "-", "*", "/"];
      const operation = operations[(this.questionNumber - 1) % operations.length];

      switch (operation) {
        case "+":
          this.question = {
            text: `What is ${num1} + ${num2}?`,
            answer: num1 + num2
          };
          break;
        case "-":
          if (num2 > num1) {
            [num1, num2] = [num2, num1]; // swap to ensure positive result
          }
          this.question = {
            text: `What is ${num1} - ${num2}?`,
            answer: num1 - num2
          };
          break;
        case "*":
          this.question = {
            text: `What is ${num1} * ${num2}?`,
            answer: num1 * num2
          };
          break;
        case "/":
          while (num1 % num2 !== 0) {
            num2 = Math.floor(Math.random() * maxNum) + 1;
          }
          this.question = {
            text: `What is ${num1} / ${num2}?`,
            answer: num1 / num2
          };
          break;
      }

      this.answer = ""; // Clear the previous answer
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
        this.generateQuestion();
      }, 2000);
    }
  }
};
</script>
