/*
 * Script for the Stock Assistant demo.
 * Provides a simple chat interface that generates placeholder stock responses
 * without calling any external services. This is purely for demonstration
 * purposes and should not be used as a real source of financial information.
 */

document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.getElementById('messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // Predefined stock data to showcase responses. In a real application this
  // would be fetched from an API.
  const stockData = {
    AAPL: {
      price: 175.12,
      outlook: 'steady growth with consistent earnings',
      company: 'Apple Inc.'
    },
    TSLA: {
      price: 210.73,
      outlook: 'volatile but long‑term potential remains high',
      company: 'Tesla, Inc.'
    },
    MSFT: {
      price: 329.65,
      outlook: 'strong fundamentals and diversified revenue streams',
      company: 'Microsoft Corporation'
    },
    GOOGL: {
      price: 131.29,
      outlook: 'solid performance with continued advertising dominance',
      company: 'Alphabet Inc.'
    }
  };

  /**
   * Append a message to the chat container.
   * @param {string} text The message text.
   * @param {'user'|'assistant'} role Who is sending the message.
   */
  function appendMessage(text, role) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', role);
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    const img = document.createElement('img');
    img.src = role === 'user' ? 'user-avatar.png' : 'assistant-avatar.png';
    img.alt = role;
    avatar.appendChild(img);
    const bubble = document.createElement('div');
    bubble.classList.add('message');
    bubble.textContent = text;
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    // Scroll to bottom when new messages are added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Very naive symbol extractor. Looks for uppercase tickers (2‑5 letters)
   * within the input string. Returns the first match.
   * @param {string} text
   * @returns {string|null}
   */
  function extractSymbol(text) {
    // match uppercase letters and digits between 2 and 5 characters
    const match = text.match(/\b([A-Z]{2,5})\b/);
    return match ? match[1] : null;
  }

  /**
   * Generate a placeholder response based on the user input. If a known
   * symbol is detected, returns a canned response from stockData. Otherwise
   * acknowledges the question generically.
   * @param {string} message
   * @returns {string}
   */
  function generateResponse(message) {
    const symbol = extractSymbol(message);
    if (symbol && stockData[symbol]) {
      const data = stockData[symbol];
      return `Here’s a quick overview for ${symbol} (${data.company}): the latest price is $${data.price.toFixed(2)} per share and the general outlook is ${data.outlook}. Remember, this is only a basic summary and not investment advice.`;
    }
    // greet the user if they say hello
    if (/\bhello\b|hi|hey/i.test(message)) {
      return 'Hello! Ask me about a stock by its ticker symbol (e.g. AAPL or TSLA) and I’ll share a brief overview.';
    }
    // default generic response
    return 'I’m not sure how to help with that. Please ask about a stock by its ticker symbol (e.g. “What is the outlook for AAPL?”).';
  }

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    userInput.value = '';
    // delay assistant reply to mimic thinking
    setTimeout(() => {
      const reply = generateResponse(text);
      appendMessage(reply, 'assistant');
    }, 600);
  }

  // Send message on button click
  sendBtn.addEventListener('click', sendMessage);
  // Also send on Enter key
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});