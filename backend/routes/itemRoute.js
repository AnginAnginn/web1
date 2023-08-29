const express = require("express");
const { getItem, getItemId, postItem, updateItem, deleteItem } = require("../controller/itemController");
const { getItem2, getItemId2, postItem2, updateItem2, deleteItem2 } = require("../controller/itemKeluarController");
const UploadGambar = require("../middleware/gambarMiddleware")
const router = express.Router();

//read all item masuk
router.get("/masuk", getItem);

//read all item keluar
router.get("/keluar", getItem2);

//read item by ID masuk
router.get("/:id", getItemId);

//read item by ID keluar
router.get("/:id", getItemId2);

//create item masuk
router.post("/createmasuk", UploadGambar, postItem);

//create item keluar
router.post("/createkeluar", UploadGambar, postItem2);

//update item masuk
router.patch("/masuk/:id", UploadGambar, updateItem);

//update item keluar
router.patch("/keluar/:id", UploadGambar, updateItem2);

//delete item by ID masuk
router.delete("/:id", deleteItem); 

//delete item by ID keluar
router.delete("/keluar/:id", deleteItem2); 


module.exports = router
