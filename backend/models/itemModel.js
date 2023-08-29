const mongoose = require ("mongoose");
const rupiahFormat = require ("rupiah-format");


const itemSchema = new mongoose.Schema({
    merk:{type: String, required: true},
    hargaBeli:{type: String, required: true},
    hargaJual:{type: String, required: true},
    keuntungan:{type: String, required: true},
    minus:{type: String, required: false},
    foto:{type: String, required: true},
    tanggal: { type: Date, default: () => new Date(new Date().getTime() + 7 * 60 * 60 * 1000) },
});

itemSchema.pre("save", function (next) {
    // Mengubah nilai hargaBeli menjadi format rupiah sebelum disimpan
    this.hargaBeli = rupiahFormat.convert(this.hargaBeli);
    this.hargaJual = rupiahFormat.convert(this.hargaJual);
    this.keuntungan = rupiahFormat.convert(this.keuntungan);
    next();
  });



module.exports = mongoose.model("Item", itemSchema);