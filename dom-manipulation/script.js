// Array of quote objects
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
    { text: "Your limitation—it’s only your imagination.", category: "Mindset" }
  ];
  
  // Select DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuote");
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Clear old content before adding new one
    quoteDisplay.innerHTML = "";
  
    // Create elements dynamically
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}"`;
  
    const quoteCategory = document.createElement("small");
    quoteCategory.textContent = `Category: ${quote.category}`;
  
    // Append to display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Function to add a new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      // Add new quote to the array
      quotes.push({ text: newText, category: newCategory });
  
      // Clear inputs
      textInput.value = "";
      categoryInput.value = "";
  
      alert("New quote added!");
    } else {
      alert("Please enter both a quote and category.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  
  // Show one quote when page loads
  showRandomQuote();
  