document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('question-form');
  const placeInput = document.getElementById('place-input');
  const lengthInput = document.getElementById('length-input');
  const budgetInput = document.getElementById('budget-input');
  const response = document.getElementById('response');

  const valueone = placeInput.value;
  const prompt = `plan a vacation to ${valueone} for ${lengthInput.value}. Say the hotels and and activities to do each day. Make sure to be specific and add as much detail as possible for the activities and each day's plan.`

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Send the question to the OpenAI API and display the response
    sendQuestionToOpenAI(prompt).then(function(answer) {
      response.textContent = 'Propmt: ' + prompt + 'Answer: ' + answer;
    });
  });
});

async function sendQuestionToOpenAI(question) {
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/completions';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": question,
      "max_tokens": 64,
      "temperature": 1
})
  });
  const json = await response.json();
  console.log(json);
  return json.choices[0].text;
}