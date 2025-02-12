const Product = require('../models/product');

module.exports = {
    // Get all products
    index: async (req, res) => {
        try {
            const products = await Product.find();
            if (products.length > 0) {
                res.status(200).json({
                    status: true,
                    data: products,
                    method: req.method,
                    url: req.url
                });
            } else {
                res.json({
                    status: false,
                    message: "Data masih kosong"
                });
            }
        } catch (error) {
            res.status(400).json({ success: false, message: "Terjadi kesalahan" });
        }
    },
    
    // Show product
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            res.json({
                status: true,
                data: product,
                method: req.method,
                url: req.url,
                message: "Data berhasil didapat"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Store product
    store: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json({
                status: true,
                data: product,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan"
            });
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal menambahkan data" });
        }
    },

    // Update product
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            if (!product) {
                return res.status(200).json({ status: false, message: "Product tidak ditemukan" });
            }
            res.json({
                status: true,
                data: product,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Delete product
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(200).json({ status: false, message: "Product tidak ditemukan" });
            }
            res.json({
                status: true,
                data: deletedProduct,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus"
            });
        } catch (error) {
            res.status(400).json({ status: false, message: "Terjadi kesalahan" });
        }
    }
};