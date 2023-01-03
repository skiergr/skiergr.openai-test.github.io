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
  const response = await fetch('https://api.openai.com/v1/text-davinci/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  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'
    },
    body: JSON.stringify({
      'text': question
    })
  });
  const data = await response.json();
  return data.text;
}
