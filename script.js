// Dummy products data
const products = [
    { id: 1, name: "Resistor 1k Ohm", price: 500, image: "resistor.png" },
    { id: 2, name: "Arduino Uno", price: 350000, image: "arduinoUno.jpg" },
    { id: 3, name: "Capacitor 10uF", price: 1000, image: "kapasitor.jpg" },
    { id: 4, name: "LED 5mm", price: 200, image: "led.jpg" },
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Navbar toggle for mobile menu
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.getElementById("mobile-menu").classList.toggle("show");
    });
  }
  
  // Cart sidebar toggle
  const cartToggle = document.getElementById("cart-toggle");
  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      document.getElementById("cart-sidebar").classList.toggle("translate-x-0");
    });
  }
  
  // Close cart sidebar
  const cartClose = document.getElementById("cart-close");
  if (cartClose) {
    cartClose.addEventListener("click", () => {
      document.getElementById("cart-sidebar").classList.remove("translate-x-0");
    });
  }
  
  // Render products
  function renderProducts() {
    const productsContainer = document.getElementById("products");
    if (productsContainer) {
      productsContainer.innerHTML = products
        .map(
          (product) => `
            <div class="product-card bg-white rounded-lg shadow-md p-4">
              <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded">
              <h3 class="text-lg font-semibold mt-2">${product.name}</h3>
              <p class="text-gray-600">Rp ${product.price.toLocaleString()}</p>
              <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">Tambah ke Keranjang</button>
            </div>
          `
        )
        .join("");
    } else {
      console.warn("Element with id 'products' not found.");
    }
  }
  
  // Render cart items
  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    if (cartItems && cartCount) {
      cartItems.innerHTML = cart.length
        ? cart
            .map(
              (item) => `
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-semibold">${item.name}</p>
                    <p>Rp ${item.price.toLocaleString()}</p>
                  </div>
                  <button onclick="removeFromCart(${item.id})" class="text-red-500">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              `
            )
            .join("")
        : "<p class='text-center'>Keranjang kosong</p>";
      cartCount.textContent = cart.length;
    }
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
  
  // Chatbot functionality (only for index.html)
  const chatbotToggle = document.getElementById("chatbot-toggle");
  if (chatbotToggle) {
    chatbotToggle.addEventListener("click", () => {
      document.getElementById("chatbot").classList.toggle("hidden");
    });
  
    document.getElementById("chatbot-close").addEventListener("click", () => {
      document.getElementById("chatbot").classList.add("hidden");
    });
  
    document.getElementById("chatbot-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        const input = e.target.value.trim().toLowerCase();
        const messages = document.getElementById("chatbot-messages");
        messages.innerHTML += `<p class="user">${input}</p>`;
  
        // Simple product search
        const matchedProducts = products.filter((p) => p.name.toLowerCase().includes(input));
        if (matchedProducts.length) {
          messages.innerHTML += `<p class="bot">Saya temukan produk berikut: ${matchedProducts
            .map((p) => p.name)
            .join(", ")}. Ingin tambah ke keranjang?</p>`;
        } else {
          messages.innerHTML += `<p class="bot">Maaf, produk "${input}" tidak ditemukan. Coba kata lain, seperti "resistor" atau "arduino".</p>`;
        }
        e.target.value = "";
        messages.scrollTop = messages.scrollHeight;
      }
    });
  }
  
  // Initialize
  renderProducts();
  renderCart();