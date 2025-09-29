const cards = document.getElementById("cards");
const list = document.getElementById("list");
const totalBox = document.getElementById("total-box");
let product  = []
async function getdata() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    product = data
    data.forEach(d => {
      print(d.name, d.price, d.image);
    });
  } catch (error) {
    console.log("Error loading products:", error);
  }
}

function print(name, price, img) {
  cards.innerHTML += `
    <div class="card">
      <img src="${img}" alt="${name}">
      <p>${name}</p>
      <p>$${price}</p>
      <button class="btn" onclick="addtocart('${name}', '${price}')">Add to cart</button>
    </div>
  `;
}

function addtocart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = { name: name, price: Number(price) };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  totale();
}

function totale() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  list.innerHTML = ""; // clear list

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  cart.forEach(ca => {
    let li = document.createElement("li");
    li.textContent = `${ca.name} - $${ca.price}`;
    list.appendChild(li);
  });

  totalBox.textContent = `Total: $${total}`;
}

// Sidebar toggle
const sidebar = document.getElementById("sidebare");
const toggleBtn = document.getElementById("toggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  toggleBtn.textContent = sidebar.classList.contains("active") ? "Close" : "☰ Open";
});

// Init
getdata();
totale();
const inp = document.getElementById("inp");
const get = document.getElementById("get");
  function filter(){
    let search = inp.value.trim().toLowerCase() ;
    const result = product.filter(p => p.name.toLowerCase().includes(search)) ; 
    if (result.length >0){
      cards.innerHTML = `` ; 
      result.forEach(r =>print(r.name , r.price , r.image))
    }
  }
  get.addEventListener("click" , filter) ;
const sort = document.getElementById("sort");
function trie(){
  cards.innerHTML = `` ; 
  let sorted = [...product];
     if(sort.value == "price-low"){
      sorted.sort((a , b ) => a.price - b.price) ;

     }else if(sort.value =="price-hieght"){
      sorted.sort((a,b) => b.price - a.price);
     }else{
      sorted.sort((a, b) => a.name.localeCompare(b.name));
     }
     sorted.forEach(r =>print(r.name , r.price , r.image))
}
sort.addEventListener("change" , trie)