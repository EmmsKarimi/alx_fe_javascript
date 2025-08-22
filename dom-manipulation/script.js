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
  const categoryFilter = document.getElementById("categoryFilter");
  const notification = document.getElementById("notification");
  notification.id = "notification";
  document.body.appendChild(notification);
  
  // ------------------ STORAGE ------------------
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // ------------------ SHOW QUOTE ------------------
  function showRandomQuote() {
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";
    let filteredQuotes = quotes;
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = `<p>No quotes found for this category.</p>`;
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  }
  
  // ------------------ ADD QUOTE FORM ------------------
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
  
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      const newQuote = { text: newText, category: newCategory };
      quotes.push(newQuote);
      saveQuotes();
      syncQuotesToServer(newQuote); // ✅ also push to server
      textInput.value = "";
      categoryInput.value = "";
      alert("New quote added!");
      populateCategories();
    } else {
      alert("Please enter both a quote and category.");
    }
  }

  // --- Server Sync ---
// Function to post a new quote to the mock server
async function postQuoteToServer(quote) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
      });
  
      const data = await response.json();
      console.log("✅ Quote synced to server:", data);
    } catch (error) {
      console.error("❌ Error syncing quote:", error);
    }
  }
  
  
  // ------------------ IMPORT / EXPORT ------------------
  function exportToJsonFile() {
    const jsonStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      populateCategories();
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ------------------ CATEGORY FILTER ------------------
  function populateCategories() {
    if (!categoryFilter) return;
  
    categoryFilter.innerHTML = "";
    const categories = [...new Set(quotes.map(q => q.category))];
  
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Categories";
    categoryFilter.appendChild(allOption);
  
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected filter
    const lastFilter = localStorage.getItem("selectedCategory");
    if (lastFilter) categoryFilter.value = lastFilter;
  
    categoryFilter.addEventListener("change", () => {
      localStorage.setItem("selectedCategory", categoryFilter.value);
      showRandomQuote();
    });
  }
  
  function filterQuote() {
    const selectedCategory = categoryFilter.value;
    let filteredQuotes = selectedCategory === "all"
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
  
  // ------------------ SERVER SYNC ------------------
  const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
  
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(SERVER_URL);
      const serverQuotes = await response.json();
  
      const mappedQuotes = serverQuotes.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      resolveConflicts(mappedQuotes);
    } catch (error) {
      console.error("Error fetching from server:", error);
    }
  }
  
  async function syncQuotesToServer(quote) {
    try {
      await fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      console.log("Quote synced to server:", quote);
    } catch (error) {
      console.error("Error syncing to server:", error);
    }
  }
  
  function resolveConflicts(serverQuotes) {
    // Conflict resolution strategy: Server wins
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    showRandomQuote();
    showNotification("Quotes updated from server (server data took precedence).");
  }
  
  function showNotification(message) {
    notification.innerText = message;
    setTimeout(() => (notification.innerText = ""), 5000);
  }
  
  // ------------------ EVENT LISTENERS ------------------
  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
  
  // ------------------ INIT ------------------
  createAddQuoteForm();
  populateCategories();
  
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
  } else {
    showRandomQuote();
  }
  
  // Periodically fetch server updates (every 30s)
  setInterval(fetchQuotesFromServer, 30000);
  