let main_image = document.getElementById("main-image");
let side_image_1 = document.getElementById("side_image-1");
let side_image_2 = document.getElementById("side_image-2");
let side_image_3 = document.getElementById("side_image-3");
let side_image_4 = document.getElementById("side_image-4");
let side_image_5 = document.getElementById("side_image-5");
let product_name = document.getElementById("product-name");
let product_description = document.getElementById("product-description");
let seller_name = document.getElementById("seller-name");
let old_price = document.getElementById("old-price");
let new_price = document.getElementById("new-price");
let quantity = document.getElementById("quantity");
let add_to_cart_button = document.getElementById("add-to-cart-button");

// --------------------------------------------------------------------------------------------------

let show_product = all_products.find((product) => {
    return product.id == product_id;
});

let already_in_cart = cart.some((item) => item.id == show_product.id);

// --------------------------------------------------------------------------------------------------

window.addEventListener("load", () => {

    if (!show_product) {

        alert("Product Not Found!");

        location = "index.html";

        return;

    }

    cart_count.textContent = cart.length ? cart.length : "0";

    main_image.src = show_product.product_image;

    if (show_product.product_sub_image) {

        side_image_1.src = show_product.product_sub_image[0];
        side_image_2.src = show_product.product_sub_image[1];
        side_image_3.src = show_product.product_sub_image[2];
        side_image_4.src = show_product.product_sub_image[3];
        side_image_5.src = show_product.product_sub_image[4];

    }
    else {

        side_image_1.src = show_product.product_image;
        side_image_2.src = show_product.product_image;
        side_image_3.src = show_product.product_image;
        side_image_4.src = show_product.product_image;
        side_image_5.src = show_product.product_image;

    }

    product_name.textContent = show_product.product_name;
    product_description.textContent = show_product.product_description;
    seller_name.textContent = show_product.seller_name;
    old_price.textContent = show_product.old_price;
    new_price.textContent = show_product.new_price;

    let product_in_cart = cart.find((item) => item.id == product_id);
    quantity.value = product_in_cart ? product_in_cart.quantity : show_product.quantity;

    if (already_in_cart) {

        add_to_cart_button.textContent = "Added To Cart";

    }

});

// --------------------------------------------------------------------------------------------------

function change_image(path) {

    main_image.setAttribute("src", path);

};

// --------------------------------------------------------------------------------------------------

function increase() {

    quantity.value = Number(quantity.value) + 1;

};

function decrease() {

    if (Number(quantity.value) > 1) {

        quantity.value = Number(quantity.value) - 1;

    }

};

// --------------------------------------------------------------------------------------------------

function add_to_cart() {

    if (already_in_cart) {

        alert("Product Is Already In The Cart!");

        return false;

    }
    else {

        alert("Added To Cart!");

        add_to_cart_button.textContent = "Added To Cart";

        let added_product = { ...show_product, quantity: quantity.value };

        cart.push(added_product);

        cart_count.textContent = cart.length;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    }

};