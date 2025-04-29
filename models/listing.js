const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    tittle : {
        type : String,
        require : true
    } ,
    description : String,
    image : {
         type : String,
         default :  "https://www.istockphoto.com/photos/sea ",
         set: (v) => 
            v === ""
         ? "https://www.istockphoto.com/photos/sea ": v,
    } ,
    price : Number,
    location : String,
    country : String
});

const Listing = mongoose.model("listing" , listingSchema);
module.exports = Listing;
