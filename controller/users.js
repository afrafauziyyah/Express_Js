const User = require('../models/User')

module.exports = {
    // get all users
    index: async (req, res) => {
        try {
            const users = await User.find();
            if (users.length > 0) {
                res.status(200).json({
                    status: true,
                    data: users,
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
    
    // show user
    show: async (req, res) => {
        try {
          const id = req.params.id;
          const user = await User.findById(req.params.id) // Show data user di database
          res.json({
            status: true,
            data: user,
            method: req.method,
            url: req.url,
            message: "Data berhasil didapat",
          })
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
      },

    store: async (req, res) => {
        try {
            const user = await User.create(req.body); // Simpan data ke database
            res.status(200).json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan"
            });
        } catch (error) {
            res.status(400).json({ success: false, message: "Gagal menambahkan data" });
        }
    },

    update: async (req, res) => {
        try {
          const id = req.params.id;
          const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // Update data user di database
          if (!user) {
            return res.status(200).json({
              status: false,
              message: "User tidak ditemukan",
            });
          }
          res.json({
            status: true,
            data: user,
            method: req.method,
            url: req.url,
            message: "Data berhasil diubah",
          });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
      },

      delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(200).json({ status: false, message: "User tidak ditemukan" });
            }

            res.json({
                status: true,
                data: deletedUser,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus"
            });
        } catch (error) {
            res.status(400).json({ status: false, message: "Terjadi kesalahan" });
        }
    },

};