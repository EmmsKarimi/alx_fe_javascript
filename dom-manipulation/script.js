// Array of quote objects
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
    { text: "Your limitation—it’s only your imagination.", category: "Mindset" }
  ];
  
  // Select DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = ""; // Clear old content
  
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}"`;
  
    const quoteCategory = document.createElement("small");
    quoteCategory.textContent = `Category: ${quote.category}`;
  
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // ✅ Function to create the "Add Quote" form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
  
    // Attach event listener
    addButton.addEventListener("click", addQuote);
  
    // Append everything to form container
    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    // Finally, add form to body
    document.body.appendChild(formContainer);
  }
  
  // Function to add a new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      textInput.value = "";
      categoryInput.value = "";
      alert("New quote added!");
    } else {
      alert("Please enter both a quote and category.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Call functions when page loads
  showRandomQuote();
  createAddQuoteForm(); // ✅ dynamically adds the form
  