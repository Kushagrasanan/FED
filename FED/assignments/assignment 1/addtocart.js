document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const productTitle = button.closest('.product').querySelector('h2').textContent;
        const productPrice = button.closest('.product').querySelector('p').textContent;
        const cartItem = document.getElementById(`cart-item-${productId}`);

        if (cartItem) {
            updateQuantity(cartItem, '+');
        } else {
            const newCartItem = document.createElement('li');
            newCartItem.id = `cart-item-${productId}`;
            newCartItem.innerHTML = `
                <span>${productTitle} - ${productPrice}</span>
                <button class="btn update-quantity" data-id="${productId}" data-action="+">+</button>
                <span class="quantity">1</span>
                <button class="btn update-quantity" data-id="${productId}" data-action="-">-</button>
                <button class="btn remove-from-cart" data-id="${productId}">Remove</button>
            `;
            document.getElementById('cart-items').appendChild(newCartItem);
        }
        updateTotal();
    }

    document.getElementById('cart-items').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            event.target.parentElement.remove();
            updateTotal();
        } else if (event.target.classList.contains('update-quantity')) {
            const button = event.target;
            const action = button.getAttribute('data-action');
            const productId = button.getAttribute('data-id');
            const cartItem = document.getElementById(`cart-item-${productId}`);
            updateQuantity(cartItem, action);
            updateTotal();
        }
    });

    function updateQuantity(cartItem, action) {
        const quantityElement = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (action === '+') {
            quantity++;
        } else if (action === '-' && quantity > 1) {
            quantity--;
        }
        quantityElement.textContent = quantity;
    }

    function updateTotal() {
        const cartItems = document.querySelectorAll('#cart-items li');
        let total = 0;

        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('span').textContent.split('$')[1]);
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });

        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
});
