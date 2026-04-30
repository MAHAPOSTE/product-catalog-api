import express from 'express';
import cors from 'cors';
const app=express();
const port=3343;

import errorsFormatter from './helpers/errorsFormatter.js';
import configureDB from './config/db.js';
import Product from './models/product.js';
import calculateSum from './helpers/calculateSum.js';
app.use(cors());
app.use(express.json());
configureDB();


app.get('/',((req,res)=>{
    res.json({messsage:"Welcome to the site"});
}));

app.post('/create-product',(req,res)=>{
     const {name , price} = req.body;
     const product=new Product({name:name,price:price});
     product.save()
     .then((productRecord)=>{
        res.status(201).json(productRecord)
     })
     .catch((err)=>{
        res.status(400).json(err)
     })
})

app.get('/products', async (req,res ) => {
   try {
      const products = await Product.find();
      res.json(products);
   } catch (err) {
      console.log(err);
   }
});

// app.get('/products',(req,res)=>{
//     Product.find()
//         .then((products)=>{
//        // res.json(products);
//        res.json({
//         count:products.length,
//         data:products
//        });
//      })
//      .catch((err)=>{
//         res.status(500).json({err:'Somtheing went wrong'})
//      })
// });
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'record not found' });
    }

    return res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});
// app.get('/products/:id',(req,res)=>{

//     const id=req.params.id;
//     Product.findById(id)
//         .then((products)=>{
//          if(!products){
//             return res.status(404).json({error:'record not found'});
//          }   
//         return res.json(products);
//      })
//      .catch((err)=>{
//         res.status(500).json({err:'Somtheing went wrong'})
//      })

// });
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'record not found' });
    }

    res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});
// const id=req.params.id;
// app.delete('/products/:id',(req,res)=>{
//     const id=req.params.id;
//     Product.findByIdAndDelete(id)
//         .then((products)=>{
//          if(!products){//record not found
//             return res.status(404).json({error:'record not found'});
//          }   
//        res.json(products);
//      })
//      .catch((err)=>{
//         res.status(500).json({err:'Somtheing went wrong'})
//      })

// })

app.put('/product-update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'record not found' });
    }

    return res.json(product);

  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessages = errorsFormatter(err.errors);
      return res.status(400).json(errMessages);
    }

    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// app.put('/product-update/:id',(req,res)=>{
//       const{id}=req.params;
//       const{name,price}=req.body;
//       Product.findByIdAndUpdate(id,{name:name,price:price},{returnDocument:'after',runValidators:true})
//             .then((products)=>{
//                if(!products){
//                      return res.status(400).json({error:'record not found'});
//                }
//                res.json(products);
//             })
//             .catch((err)=>{
//                if(err.name==="ValidationError"){
//                const errMessages=errorsFormatter(err.errors);
//                res.status(400).json(errMessages);
//                }
//                console.log(err);
//                return res.status(400).json(errMessages);
//             }); 
// })

app.post('/sum', async (req, res) => {
  try {
    //const { values } = req.body;
    const { values } = req.body || {};

    if (!values) {
      return res.status(400).json({ error: "values is required" });
    }

    // If calculateSum is async
    const { sum } = await calculateSum(values);

    return res.status(200).json({
      message: "sum calculated successfully",
      data: { sum }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
      message: err.message
    });
  }
});
// app.post('/sum', (req, res) => {
//   const { values } = req.body;

//   if (!values) {
//     return res.status(400).json({ error: "values is required" });
//   }

//   const { sum } = calculateSum(values);

//   res.status(200).json({
//     message: "sum calculated successfully",
//     data: {
//       sum
//     }
//   });
// });
app.listen(port,()=>{
    console.log('Express Server is running on port'+ port);
});