export default function generateQuestion(difficulty) {
  const operations = ['+', '-', '*', '/'];
  const maxValues = {
    easy: 10,
    medium: 50,
    hard: 100
  };

  let num1 = Math.floor(Math.random() * maxValues[difficulty]);
  let num2 = Math.floor(Math.random() * maxValues[difficulty]);

  const operation = operations[Math.floor(Math.random() * operations.length)];

  let text, answer;

  switch (operation) {
    case '+':
      text = `What is ${num1} + ${num2}?`;
      answer = num1 + num2;
      break;
    case '-':
      if (num2 > num1) {
        [num1, num2] = [num2, num1]; // Swap the numbers to avoid negative answers
      }
      text = `What is ${num1} - ${num2}?`;
      answer = num1 - num2;
      break;
    case '*':
      text = `What is ${num1} x ${num2}?`;
      answer = num1 * num2;
      break;
    case '/':
      num2 = num2 || 1; // Avoid division by zero
      text = `What is ${num1} / ${num2}?`;
      answer = num1 / num2;
      break;
  }

  return { text, answer };
}
