const Cart = require('../model/Cart');
const Product = require('../model/Product');


// Home Page
exports.getHomePage = async (req, res) => {
    try {
      const products = await Product.find();
      return res.render('home', { username: req.user.username, products });
    } catch (err) {
      console.error(err);
      return res.render('home', { username: req.user.username, products: [] });
    }
};
// Adding to Cart
exports.addToHomeCart = async (req, res) => {
try {
    const userId = req.user.userId;
    const productId = req.params.productId;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
    // Cart doesn't exist, create a new one
    cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const item = cart.products.find(item => item.productId.equals(productId));

    if (item) {
    // Product is already in the cart, increase quantity
    item.quantity += 1;
    } else {
    // Product is not in the cart, add it
    cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();

    const showSuccessMessage = (message) => {
    console.log('Success:', message); /* eslint-disable-line no-console */
    window.alert(message);
    }

    return res.redirect('/');
} catch (err) {
    console.error(err);
    return res.redirect('/');
}
};

// Add to Cart
exports.addToCart = async (req, res) => {
try {
    const userId = req.user.userId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({ userId });

    if (cart) {
    // Check if the product is already in the cart
    const itemIndex = cart.products.findIndex(item => item.productId.equals(productId));

    if (itemIndex !== -1) {
        // Product is already in the cart, increase quantity
        cart.products[itemIndex].quantity += 1;
    } else {
        // Product is not in the cart, add it
        cart.products.push({ productId, quantity: 1 });
    }

    return await cart.save();
    } else {
    // Cart doesn't exist, create a new one
    const newCart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
    return await newCart.save();
    }

    res.redirect('/cart');
} catch (err) {
    console.error(err);
    return res.redirect('/');
}
};

// Update Quantity in Cart
exports.updateCartItemQuantity = async (req, res) => {
try {
    const userId = req.user.userId;
    const productId = req.params.productId;
    const newQuantity = parseInt(req.body.quantity);

    if (newQuantity <= 0) {
    // If quantity is 0 or less, remove the item from the cart
    const cart = await Cart.findOne({ userId });
    if (cart) {
        cart.products = cart.products.filter(item => !item.productId.equals(productId));
        return await cart.save();
    }
    } else {
    // Update the quantity of the item in the cart
    return await Cart.updateOne(
        { userId, 'products.productId': productId },
        { $set: { 'products.$.quantity': newQuantity } }
    );
    }

    res.redirect('/cart');
} catch (err) {
    console.error(err);
    return res.redirect('/');
}


};

// Remove from Cart
exports.removeCartItem = async (req, res) => {
try {
    const userId = req.user.userId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({ userId });

    if (cart) {
    // Check if the product is in the cart
    const itemIndex = cart.products.findIndex(item => item.productId.equals(productId));

    if (itemIndex !== -1) {
        // Product is in the cart, remove it
        cart.products.splice(itemIndex, 1);
        await cart.save();
    }
    }

    return res.redirect('/cart');
} catch (err) {
    console.error(err);
    return res.redirect('/');
}
};

// Cart Page
exports.getCartPage = async (req, res) => {
try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    return res.render('cart', { username: req.user.username, cart });
} catch (err) {
    console.error(err);
    return res.redirect('/');
}
};