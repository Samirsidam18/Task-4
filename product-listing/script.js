const products = [
  {
    name:"Wireless Headphones",
    category:"Electronics",
    price:2999,
    rating:4.5,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Smart Watch",
    category:"Electronics",
    price:8999,
    rating:4.8,
    image:"https://images.unsplash.com/photo-1696688713460-de12ac76ebc6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Mechanical Keyboard",
    category:"Electronics",
    price:4999,
    rating:4.9,
    image:"https://images.unsplash.com/photo-1602025882379-e01cf08baa51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Bluetooth Speaker",
    category:"Electronics",
    price:1999,
    rating:4.3,
    image:"https://images.unsplash.com/photo-1582978571763-2d039e56f0c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Backpack",
    category:"Accessories",
    price:1499,
    rating:4.2,
    image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Running Shoes",
    category:"Sports",
    price:2499,
    rating:4.4,
    image:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Sunglasses",
    category:"Accessories",
    price:999,
    rating:4.1,
    image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Coffee Beans",
    category:"Home",
    price:799,
    rating:4.6,
    image:"https://images.unsplash.com/photo-1675306408031-a9aad9f23308?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Water Bottle",
    category:"Home",
    price:499,
    rating:4.3,
    image:"https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Yoga Mat",
    category:"Sports",
    price:999,
    rating:4.4,
    image:"https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name:"Dumbbells",
    category:"Sports",
    price:1999,
    rating:4.7,
    image:"https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const search = document.getElementById("search");
const sort = document.getElementById("sort");
const price = document.getElementById("price");
const priceValue = document.getElementById("priceValue");
const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cartCount");

function display(data){
  productsContainer.innerHTML = "";

  data.forEach(p=>{
    productsContainer.innerHTML += `
  <div class="card">
    <img src="${p.image}">
    
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="category">${p.category}</p>
      <p class="rating">⭐ ${p.rating}</p>
      <p class="price">₹${p.price}</p>
      <button class="btn" onclick="addToCart('${p.name}')">Add to Cart</button>
    </div>
  </div>
`;
  });
}

function filterData(){
  let filtered = [...products];

  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  );

  const category = document.getElementById("category").value;
  if(category !== "All"){
    filtered = filtered.filter(p => p.category === category);
  }

  filtered = filtered.filter(p => p.price <= price.value);

  if(sort.value === "low"){
    filtered.sort((a,b)=>a.price-b.price);
  } 
  else if(sort.value === "high"){
    filtered.sort((a,b)=>b.price-a.price);
  } 
  else if(sort.value === "rating"){
    filtered.sort((a,b)=>b.rating-a.rating);
  }

  display(filtered);
}

function addToCart(name){
  cart.push(name);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  cartCount.innerText = cart.length;
}

// Events
search.addEventListener("input", filterData);
sort.addEventListener("change", filterData);

price.addEventListener("input", ()=>{
  priceValue.innerText = "₹" + price.value;
  filterData();
});



// Init
display(products);
updateCart();
