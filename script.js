document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('question-form');
  const input = document.getElementById('question-input');
  const response = document.getElementById('response');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Send the question to the OpenAI API and display the response
    sendQuestionToOpenAI(input.value).then(function (answer) {
      response.textContent = 'Answer: ' + answer;
    });
  });
});

async function sendQuestionToOpenAI(question) {
  const apiKey = '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';
  const endpoint =
    'https://api.allorigins.win/raw?url=https://api.openai.com/v1/questions';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-002',
      prompt: question,
    }),
  });

  const json = await response.json();
  return json['data']['answers'][0]['text'];
}
