const {v4: uuidv4} = require('uuid')
let products = require('../products');

const getAllProducts = (req, reply) => {
    reply.send(products);
}
const getSingleProduct = (req, reply) => {
    const {id} = req.params;

    const product = products.find((product) => product.id === parseInt(id));
    reply.send(product);
}
const addProduct = (req, reply) => {
    const {productName, price,} = req.body;
    const newProduct = {
        id: uuidv4(),
        productName: productName,
        price: price
    }
    products = [...products, newProduct];
    reply.send(newProduct);
}
const deleteProduct = (req, reply) => {
    const {id} = req.params;

    products = products.filter((item) => item.id !== id);
    console.log(products)
    reply.send({message: `Item ${id} has been removed`});
}
const updateProduct = (req, reply) => {
    const {id} = req.params;
    const {name} = req.body;
    products = products.map((item) => (item.id === id ? {id, name} : item));
    const product = products.find((item) => item.id === id);
    reply.send(product);
}
module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    deleteProduct,
    updateProduct
}