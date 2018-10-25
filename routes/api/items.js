const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

//@route GET api/items
//@desp Get the item list
//@access Public
router.get("/", (req, res) => {

    Item.find().sort({ date: -1 }).then(items => res.json(items));
});

//@route POST api/items
//@desp create a item
//@access Public
router.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(items => res.json(items));
});

//@route DELETE api/items
//@desp DELETE a item
//@access Public
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;