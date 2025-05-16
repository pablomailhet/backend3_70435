import productModel from "../models/products.model.js";
import createMockProduct from "../helpers/mocks/products.mock.js";

export const getProducts = async (req, res) => {
    try {

        const { limit, page, metFilter, filter, metOrder, order } = req.query;

        const currPage = page !== undefined ? page : 1
        const currLimit = limit !== undefined ? limit : 10

        const filQuery = metFilter !== undefined ? { [metFilter]: filter } : {}
        const ordQuery = metOrder !== undefined ? { metOrder: order } : {}

        const products = await productModel.paginate(filQuery, { limit: currLimit, page: currPage, ordQuery, lean: true });

        products.pageNumbers = Array.from({ length: products.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page
        }));

        res.status(200).json({ status: "success", products });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.findById(pid);

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found.", });
        }

        res.status(200).json({ status: "success", product });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {

        const { title, description, code, price, stock, category, thumbnails } = req.body;

        const product = await productModel.create({ title, description, code, price, stock, category, thumbnails });

        res.status(201).json({
            status: "success",
            message: "Product added",
            product: product,
        });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createProductsFromMock = async (req, res) => {
    try {

        const { n } = req.params;
        for (let index = 0; index < n; index++) {
            const product = createMockProduct();
            await productModel.create(product);
        }

        res.status(201).json({
            status: "success",
            message: n + " Products added from mocks"
        });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const product = await productModel.findByIdAndUpdate(
            pid,
            { title, description, code, price, status, stock, category, thumbnails },
            {
                new: true,
                runValidators: true,
            }
        );
        if (product) {
            res.status(200).json({
                status: "success",
                message: "Product updated",
                product,
            });
        }
        else {
            res.status(404).json({
                status: "error",
                message: "Product not found.",
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.findByIdAndDelete(pid, {
            new: true,
        });

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found.", });
        }

        res.status(200).json({
            status: "success",
            message: "Product deleted",
        });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
