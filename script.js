const showIcon = document.querySelector(".fa-solid");
const cartContainer = document.querySelector(".cart-container");
const shopNowIcon = document.querySelectorAll(".fa-shopping-cart");
const prodtNameArray = [];

showIcon.addEventListener("click", function () {
  cartContainer.classList.toggle("showCart");
});
function DeleteQuantityandIcon() {
  const deleteIcon = document.querySelectorAll(".fa-trash");
  const inputTag = document.querySelectorAll(".productNos");
  deleteIcon.forEach((delIcon) => {
    delIcon.addEventListener("click", function () {
      if (confirm("Do you want to delete item?")) {
        const element = this.parentElement;
        const delPdtName = element.querySelector("h4").innerText;
        console.log(delPdtName);
        console.log(element);
        const pdtIndex = prodtNameArray.findIndex((pname) => {
          return pname === delPdtName;
        });
        console.log(pdtIndex);
        prodtNameArray.splice(pdtIndex, 1);
        console.log(prodtNameArray);
        element.remove();
      }
    });
  });
  inputTag.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value < 1) {
        this.value = 1;
        alert("Product Quantity must be 1!!");
      }
    });
  });
  calculateTotals();
  totalprice();
}
shopNowIcon.forEach((shopIcon) => {
  shopIcon.addEventListener("click", function (event) {
    const parent = event.target.parentNode.parentElement;
    const productImg = parent.querySelector(".img1").src;
    const productName = parent.querySelector(".prodName").innerText;
    const productPrice = parent.querySelector(".price").innerText;
    const CartFunction = CartDesign(productImg, productName, productPrice);
    const findExistiongprdt = prodtNameArray.find((prname) => {
      return prname == productName;
    });
    if (findExistiongprdt) {
      return alert("ALready Added");
    } else {
      prodtNameArray.push(productName);
    }
    console.log(prodtNameArray);
    const cartProduct = document.querySelector(".productHold");
    cartProduct.innerHTML += CartFunction;
    DeleteQuantityandIcon();
    calculateTotals();
    totalprice();
  });
});
function CartDesign(image, name, price) {
  return ` <div class="cart-item">
        <img src="${image}" alt="Product" />
        <div class="cart-item-details">
          <h4>${name}</h4>
          <p>${price}</p>
          <div class="prod-count">
            <input type="number" name="" class="productNos" id="" value="1" />
            <h2 class="totalProductPrice"></h2>
          </div>
        </div>
        <i class="fa-solid fa-trash"></i>
      </div>`;
}

function calculateTotals() {
  const cartItems = document.querySelectorAll(".cart-item");
  let grandTotal = 0;
  cartItems.forEach((item) => {
    const priceElement = item.querySelector("p");
    const quantityInput = item.querySelector(".productNos");
    const totalProductPriceElement = item.querySelector(".totalProductPrice");
    const priceText = priceElement.textContent.replace("$", "");
    const quantity = quantityInput.value;
    const total = priceText * quantity;
    totalProductPriceElement.textContent = total;
  });
  const totalPriceElement = document.querySelector(".totalPrice");
  totalPriceElement.value = grandTotal;
}
calculateTotals();
document.addEventListener("input", function (event) {
  if (event.target.classList.contains("productNos")) {
    calculateTotals();
    totalprice();
  }
});
function totalprice() {
  const totallPrice = document.querySelector(".totalPrice");
  let total = 0;
  const totalPriceElement = document.querySelectorAll(".totalProductPrice");
  totalPriceElement.forEach((price) => {
    total += Number(price.innerText)
    totallPrice.innerText =  total;
  });
   
}

