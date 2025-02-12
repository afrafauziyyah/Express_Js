const Order = require('../models/order');

module.exports = {
    // Get all orders
    index: async (req, res) => {
        try {
            const orders = await Order.find();
            if (orders.length > 0) {
                res.status(200).json({
                    status: true,
                    data: orders,
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
    
    // Show order
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const order = await Order.findById(id);
            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil didapat"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Store order
    store: async (req, res) => {
        try {
            const order = await Order.create(req.body);
            res.status(200).json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan"
            });
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal menambahkan data" });
        }
    },

    // Update order
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
            if (!order) {
                return res.status(200).json({ status: false, message: "Order tidak ditemukan" });
            }
            res.json({
                status: true,
                data: order,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah"
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    // Delete order
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) {
                return res.status(200).json({ status: false, message: "Order tidak ditemukan" });
            }
            res.json({
                status: true,
                data: deletedOrder,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus"
            });
        } catch (error) {
            res.status(400).json({ status: false, message: "Terjadi kesalahan" });
        }
    }
};