import mongoose from "mongoose";

const configureDB=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/product-db')
         .then(()=>{
             console.log('successfully connected to db', mongoose.connection.name);
        })
        .catch((err)=>{
          console.log('error connecting to the db',err.message);
         });
}
export default configureDB;