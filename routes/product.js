const express=require("express");
const router=express.Router()
const formidable=require("express-formidable")


const {create,list,read,remove,photo,update,filteredProducts,productsCount,listProducts
,productsKeyword,relatedProducts}=require("../controllers/product");
const { requireSignin, isAdmin } = require("../middlewares/auth");

router.post("/product",requireSignin,isAdmin,formidable(),create);
router.get("/products", list);
router.get("/product/:slug",read);
router.delete("/product/:productId",requireSignin,isAdmin,remove);
router.get("/product/photo/:productId",photo);
router.put("/product/:productId",requireSignin,isAdmin,formidable(),update);
router.post("/filtered-products",filteredProducts);
router.get("/products-count",productsCount);
router.get("/list-products/:page",listProducts);
router.get("/products/search/:keyword",productsKeyword);
router.get("/related-products/:productId/:categoryId", relatedProducts)
module.exports=router;