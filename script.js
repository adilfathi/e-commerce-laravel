let cart_count = document.getElementById("cart-count");
let toggle_btn = document.getElementById("toggle-btn");
let link_1 = document.getElementById("link-1");
let link_2 = document.getElementById("link-2");
let link_3 = document.getElementById("link-3");
let link_4 = document.getElementById("link-4");

// --------------------------------------------------------------------------------------------------

let mode = "light";
let body = document.body;

// --------------------------------------------------------------------------------------------------

let all_products = JSON.parse(localStorage.getItem("all-products")) || [];
let product_id = JSON.parse(localStorage.getItem("product-id")) || "";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --------------------------------------------------------------------------------------------------

window.addEventListener("load", () => {

    cart_count.textContent = cart.length ? cart.length : "0";

    async function load_json() {

        try {
            let res = await fetch("Products.json");
            let data = await res.json();
            all_products = data;
        } catch (error) {
            console.log(error);
        }

    };

    async function load_products() {

        await load_json();

        localStorage.setItem("all-products", JSON.stringify(all_products));

    };

    load_products();

});

// --------------------------------------------------------------------------------------------------

function change_mode() {

    if (mode === "light") {

        body.style.backgroundColor = "black";
        body.style.color = "white";
        toggle_btn.style = "justify-content: end";
        link_1.style = "color: white;";
        link_2.style = "color: white;";
        link_3.style = "color: white;";
        link_4.style = "color: white;";
        mode = "dark";

    }

    else {

        body.style.backgroundColor = "white";
        body.style.color = "black";
        toggle_btn.style = "justify-content: start";
        link_1.style = "color: black;";
        link_2.style = "color: black;";
        link_3.style = "color: black;";
        link_4.style = "color: black;";
        mode = "light";

    }

};

// --------------------------------------------------------------------------------------------------

function go_to_product_details(element) {

    product_id = element.getAttribute("data-id");

    localStorage.setItem("product-id", JSON.stringify(product_id));

    location = "Product Details.html";

};