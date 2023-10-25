<template>
    <div>
        <h2>Quiz Summary for {{ userName }}</h2>
        <p><strong>Questions Answered Correctly:</strong> {{ correctAnswers }}</p>
        <p><strong>Questions Answered Incorrectly:</strong> {{ totalQuestions-correctAnswers }}</p>
        <p><strong>Total Questions:</strong> {{ totalQuestions }}</p>
        <p><strong>Score:</strong> {{ score }}</p>

        <router-link to="/">Back to Home</router-link>
    </div>
</template>
  
<script>
export default {
    props: ['userName', 'correctAnswers', 'totalQuestions', 'score']
};
</script>
  