document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('question-form');
  const input = document.getElementById('question-input');
  const response = document.getElementById('response');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Send the question to the OpenAI API and display the response
    sendQuestionToOpenAI(input.value).then(function(answer) {
      response.textContent = 'Answer: ' + answer;
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
        "temperature": 0.5
    })
  });
  const json = await response.json();
  return json['data']['answers'][0]['text'];
}