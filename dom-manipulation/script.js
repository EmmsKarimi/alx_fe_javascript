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
  


  // ------------------ QUOTES ------------------
// Load quotes from localStorage, or start fresh
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
    { text: "Your limitation—it’s only your imagination.", category: "Mindset" }
  ];
  
  // ------------------ DOM ELEMENTS ------------------
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  
  // ------------------ FUNCTIONS ------------------
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Save last viewed quote to sessionStorage
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  
    quoteDisplay.innerHTML = "";
  
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}"`;
  
    const quoteCategory = document.createElement("small");
    quoteCategory.textContent = `Category: ${quote.category}`;
  
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Dynamically create Add Quote form
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
  
    addButton.addEventListener("click", addQuote);
  
    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Add a new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes(); // persist in localStorage
      textInput.value = "";
      categoryInput.value = "";
      alert("New quote added!");
    } else {
      alert("Please enter both a quote and category.");
    }
  }
  
  // Export quotes as JSON file
  function exportToJsonFile() {
    const jsonStr = JSON.stringify(quotes, null, 2); // pretty format
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
  
      // Merge new quotes into existing
      quotes.push(...importedQuotes);
      saveQuotes();
  
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ------------------ EVENT LISTENERS ------------------
  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
  
  // ------------------ INIT ------------------
  createAddQuoteForm();
  
  // Show last viewed quote if available (from sessionStorage)
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
  } else {
    showRandomQuote();
  }

  // ------------------ CATEGORY FILTER ------------------

// Populate category dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = ""; // clear old options
  
    // Extract unique categories from quotes
    const categories = [...new Set(quotes.map(q => q.category))];
  
    // Default "All" option
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Categories";
    categoryFilter.appendChild(allOption);
  
    // Add each category as option
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Show random quote (with optional category filter)
  function showRandomQuote() {
    const categoryFilter = document.getElementById("categoryFilter");
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  
    let filteredQuotes = quotes;
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  }
  
  // ------------------ FILTER FUNCTION ------------------
function filterQuote() {
    const selectedCategory = document.getElementById("categoryFilter").value;
  
    // If "All" is selected, show a random quote from all
    let filteredQuotes = selectedCategory === "All"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
  
      quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
    } else {
      quoteDisplay.innerHTML = `<p>No quotes found for this category.</p>`;
    }
  }
  