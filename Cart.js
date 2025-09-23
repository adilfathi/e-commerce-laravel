let products_list = document.getElementById("products-list");
let total_price = document.getElementById("total-price");
let discount_price = document.getElementById("discount-price");
let net_price = document.getElementById("net-price");

window.addEventListener("load", () => {

    let total = 0;

    if (cart.length > 0) {

        cart.forEach((item) => {

            let product = document.createElement("div");

            product.innerHTML = `

                <div class="cart-product-image"  data-id="${item.id}" onclick="go_to_product_details(this)">

                    <img src="${item.product_image}" alt="Image Not Available" />

                </div>

                <div class="cart-product-data">

                    <p>Product Name: ${item.product_name}</p>

                    <p>Price: ${item.new_price}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <button onclick="remove_product(${item.id})">Remove Product</button>

                </div>

            `;

            product.classList.add("cart-product");

            products_list.appendChild(product);

            let price = parseFloat(item.new_price);

            let quantity = item.quantity;

            total += price * quantity;

        });

        let discount = total * 0.25;

        let net = total - discount;

        total_price.textContent = total;

        discount_price.textContent = discount;

        net_price.textContent = net;

    }
    else {

        products_list.textContent = "No Products In The Cart!";

        total_price.textContent = "0";

        discount_price.textContent = "0";

        net_price.textContent = "0";

    }

});

function remove_product(id) {

    cart = cart.filter((item) => item.id != id);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

};