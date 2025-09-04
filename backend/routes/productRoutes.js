const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect , admin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");


router.get("/" , async (req , res) => {
    try {
        const products = await Product.find();
        res.json(products);
        
    } catch (error) {
        res.status(500).json( { message: "products not found" } );

        
    }
});

router.get("/:id" , async (req , res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);

        } else {
            res.status(404).json( { message: "product not found" });

        }
        
    } catch (error) {
        res.status(500).json( { message: "server error" });


        
    }
});

router.post("/" , upload.single("image") , protect , admin , async (req , res) => {
    try {

               const { name , price , description , stock, imageUrl } = req.body;
               const image = imageUrl && imageUrl.trim() !== "" ? imageUrl : (req.file ? `/uploads/${req.file.filename}` : null);
               const product = new Product ( {
                name , price , description , stock , image,

               } );

               const createdProduct = await product.save();
               res.status(200).json( {createdProduct });


      } catch (error) {
        res.status(500).json( { message: "server error" });
        
    }
});

router.put("/:id" , protect , admin , upload.single("image") , async ( req , res) => {
    try {
            const { name , price , description , stock, imageUrl } = req.body;
       
             
             const product = await Product.findById(req.params.id);

             if(product) {
                  product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      if (typeof stock !== "undefined") {
        product.stock = stock;
      }
      if (imageUrl && imageUrl.trim() !== "") {
        product.image = imageUrl;
      } else if (req.file) {
        product.image = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
             }
    } catch (error) {

        res.status(500).json({message: "server error"});

        
    }
});

router.delete("/:id" , protect , admin , async ( req , res) => {
try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

});

module.exports =  router;