<template>
    <div>
      <h2>Quiz Summary for {{ userName }}</h2>
      <p>Questions Answered Correctly: {{ correctAnswers }}</p>
      <p>Total Questions: 10</p>
      <p>Score: {{ score }}</p>
      <router-link to="/">Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userName: String,
      correctAnswers: Number,
      score: Number
    }
  };
  </script>
  