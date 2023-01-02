document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('question-form');
    const input = document.getElementById('question-input');
    const response = document.getElementById('response');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      try {
        // Send the question to the OpenAI API and display the response
        const answer = await sendQuestionToOpenAI(input.value);
        response.textContent = 'Answer: ' + answer;
      } catch (error) {
        response.textContent = 'Error: ' + error.message;
      }
    });
  });
  
  async function sendQuestionToOpenAI(question) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const endpoint = 'https://api.openai.com/v1/questions';
    const apiKey = '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';
  
    const response = await fetch(proxyUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        'model': 'text-davinci-002',
        'prompt': question
      })
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const json = await response.json();
    return json['data']['answers'][0]['text'];
  }
  