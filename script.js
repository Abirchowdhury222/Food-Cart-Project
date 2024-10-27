// Array of food items with unique IDs, names, prices, images, and descriptions
const foodItems = [
    { id: 1, name: "Burger", price: 7, image: "./images/burger.jpg", description: "Juicy Chicken burger with cheese." },
    { id: 2, name: "Pizza", price: 8, image: "./images/pizza.jpg", description: "Classic cheese and tomato pizza." },
    { id: 3, name: "Sandwich", price: 6, image: "./images/sandwich.jpg", description: "Grilled chicken sandwich with veggies." }
];

// Cart array to store items
let cart = [];

// Function to render food items
function renderFoodItems() {
    const foodContainer = document.getElementById("food-items");
    foodItems.forEach(item => {
        const foodItem = document.createElement("div");
        foodItem.className = "p-4 bg-white shadow-md rounded-lg text-center";
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover mb-2 rounded">
            <h3 class="text-lg font-bold mb-2">${item.name}</h3>
            <p class="text-gray-600 text-sm mb-2">${item.description}</p>
            <p class="text-gray-700 mb-4">$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})" id="add-btn-${item.id}" class="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        `;
        foodContainer.appendChild(foodItem);
    });
}

// Function to toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.toggle("translate-x-full");
}

// Function to close cart sidebar
function closeSidebar() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.add("translate-x-full");
}

// Function to update cart item count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-header").innerText = `Your Cart (${cart.length})`;
}

// Function to add item to cart
function addToCart(id) {
    const item = foodItems.find(item => item.id === id);
    const cartItem = cart.find(cartItem => cartItem.id === id);
    if (!cartItem) {
        cart.push({ ...item, quantity: 1 });
        renderCartItems();
        updateCartCount();
        document.getElementById(`add-btn-${id}`).disabled = true;
        document.getElementById(`add-btn-${id}`).classList.add("opacity-50", "cursor-not-allowed");
    }
    // Ensure sidebar remains open after adding to cart
    document.getElementById("cart-sidebar").classList.remove("translate-x-full");
}

// Function to render cart items
function renderCartItems() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "flex items-center space-x-4";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div>
                <h4 class="text-lg font-semibold w-16">${item.name}</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <div class="flex space-x-2 mt-2 w-16">
                    <button onclick="updateQuantity(${item.id}, 'decrease')" class="bg-gray-200 px-2">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 'increase')" class="bg-gray-200 px-2">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="ml-auto" style="margin-left: 120px;">
                <img src="./images/delete.png" alt="Remove" class="w-6 h-6">
            </button>
        `;
        cartContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    // Update total price
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Function to update item quantity in cart
function updateQuantity(id, action) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
            item.quantity -= 1;
        }
        renderCartItems();
    }
}

// Function to remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    document.getElementById(`add-btn-${id}`).disabled = false;
    document.getElementById(`add-btn-${id}`).classList.remove("opacity-50", "cursor-not-allowed");
    renderCartItems();
    updateCartCount();
}

// Initialize the food items on page load
renderFoodItems();
