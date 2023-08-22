const Product = require('../model/Product');


exports.getProductList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.render('product', { products });
  } catch (err) {
    console.error(err);
    return res.render('product', { products: [] });
  }
};

exports.getAddProductPage = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.render('add-product', { products });
  } catch (err) {
    console.error(err);
    return res.render('add-product', { products: [] });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
    });

    await newProduct.save();

    return res.redirect('/product');
  } catch (err) {
    console.error(err);
    return res.render('error', { message: 'Failed to add product' });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    await Product.findByIdAndRemove(productId);

    return res.redirect('/product');
  } catch (err) {
    console.error(err);
    return res.render('error', { message: 'Failed to remove product' });
  }
};