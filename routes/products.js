const {getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct} = require('../controller/products');

// * Product schema
const Product = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        productName: {type: 'string'},
        price: {type: 'number'}
    }
}
// * Get all products option
const getProductsOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Product
            }
        }
    },
    handler: getAllProducts,
};

// * Get single product option
const getSingleProductOptions = {
    schema: {
        response: {
            200: Product,
        },
    },
    handler: getSingleProduct,
};
// * Post (add)  product option
const postProductOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'price'],
            properties: {}
        },
        response: {
            201: Product
        }
    },
    handler: addProduct,
};
const deleteProductOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                },
            },
        },
    },
    handler: deleteProduct,
}

const updateProductOptions = {
    schema: {
        response: {
            200: Product
        },
    },
    handler: updateProduct,
}

function productsRoute(fastify, options, done) {
    // * Get all Product
    fastify.get("/products", getProductsOptions);

    // * Get single Product
    fastify.get("/products/:id", getSingleProductOptions);

    // * Post(add) Product
    fastify.post("/products", postProductOptions)

    // * Delete Product
    fastify.delete("/products/:id", deleteProductOptions)

    // * Update Product
    fastify.put("/products/:id", updateProductOptions)
    done();
}

module.exports = productsRoute;