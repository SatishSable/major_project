const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");
const ejsMate = require("ejs-mate");


const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am the root route");
});

// INDEX
app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", { allListing });
});

// NEW
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// CREATE
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// SHOW
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

// EDIT
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

//  UPDATE (PUT)
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}`);
});

// delete 
app.delete("/listings/:id" , async (req , res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
