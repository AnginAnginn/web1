const Item = require ("../models/itemModel");
const baseUrl = "http://127.0.0.1:5000"
const rupiahFormat = require ("rupiah-format");
const path = require("path");
const fs = require("fs")

const getItem = async (req,res) => {
    const item = await Item.find();
    try {
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

const getItemId = async (req, res) => {
    const item = await Item.findById(req.params.id);
    try {
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

const postItem = async (req, res) => {
    try {
        const hargaBeli = req.body.hargaBeli;
        const hargaJual = req.body.hargaJual;

        const keuntungan = hargaJual - hargaBeli;

        const item = await Item.create({
            merk: req.body.merk,
            hargaBeli,
            hargaJual,
            keuntungan,
            minus: req.body.minus,
            foto: baseUrl+"/images/"+req.file.filename,
        })
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({message: err.message});   
    };
};

const updateItem = async (req, res) => {
    try {
        const updatedData = req.body;
        
        
        // Dapatkan hargaBeli dan hargaJual dari data yang baru diberikan
        const hargaBeli = updatedData.hargaBeli;
        const hargaJual = updatedData.hargaJual;

        // Hitung ulang nilai keuntungan berdasarkan hargaBeli dan hargaJual baru
        const keuntungan = hargaJual - hargaBeli;

        const formattedHargaBeli = rupiahFormat.convert(hargaBeli);
        const formattedHargaJual = rupiahFormat.convert(hargaJual);
        const formattedKeuntungan = rupiahFormat.convert(keuntungan);
        
        //cek file foto yang dihapus berdasarkan objeknya
        const delFoto = await Item.findById(req.params.id)

            // Hapus file foto yang sudah ada sebelumnya
            if (delFoto.foto) {
                const filename = delFoto.foto.split('/images/')[1]; // Ambil nama file dari URL
                const imgPath = path.join(__dirname, "../images", filename)
                try {
                    // Hapus file foto yang sudah ada sebelumnya
                    fs.unlinkSync(imgPath); // Hapus file dari direktori
                    console.log('File foto sebelumnya dihapus:', imgPath);
                } catch (error) {
                    console.error('Gagal menghapus file foto:', error);
                }
            }
            
        const updatedFields = {
            merk: updatedData.merk,
            hargaBeli: formattedHargaBeli,
            hargaJual: formattedHargaJual,
            keuntungan: formattedKeuntungan,
            minus: updatedData.minus,
            foto: baseUrl + "/images/" + req.file.filename
        }

        // Lakukan pembaruan data
        const item = await Item.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        res.status(201).json({message: "update berhasil", item})
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (item.foto){
            const filename = item.foto.split("/images/")[1];
            const imgPath = path.join(__dirname, "../images", filename)
            fs.unlinkSync(imgPath);
        }

        await Item.findByIdAndDelete(req.params.id)

        res.status(201).json({message: "berhasil dihapus", item})
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getItem, getItemId, postItem, updateItem, deleteItem }