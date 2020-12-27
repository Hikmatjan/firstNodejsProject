const express = require('express');
const mongoose = require('mongoose');

// Mongodb ga ulanish
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongodb MOga ulanildi");
    })
    .catch((err) => {
        console.error("Mongodb ga ulanishda xatolik ro'y berdi " + err);
    });

// schemani yaratish
// const bookSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [ String ],
//     date: {type: Date, default: Date.now()},
//     isPublished: Boolean,
//     price: Number
// }, {collection: 'book'});

// // shu bookSchema asosida model yaratish
// const Book = mongoose.model('book', bookSchema);

// // mongodb ga hujjatni saqlab qo'yish
// async function createBook() {
//     // Book classiga mansub bo'lgan book obyektini yaratish
//     const book = new Book({
//         name: "dasturlashni o'rganamiz",
//         author: "Hikmat Ravshanovich",
//         tags: ['c++','javascript','python'],
//         isPublished: false,
//         price: 20
//     });
//     // book obyektini save() metodi orqali bazaga saqlab qo'yish
//     const savedBook = await book.save();
//     console.log(savedBook);
// }
// //createBook(); //createBook() funksiyani chaqirish

// // mongodb dan hujjatlarni hammasini o'qib olish
// async function getBook() {
//     const findBook = await Book
//     .find({name: /.*il/})
//     console.log(findBook);
// }
// getBook(); // getBook() funksiyani chaqirish

// schema yaratish inventory
const schemaSize = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
});
const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: schemaSize,
    status: String
},{collection: 'inventory'});

const Invent = mongoose.model('inventory', inventorySchema);

// async function getInvent() {
//     const inventResult = await Invent
//         .find({status: "A"})
//         .sort({item: 1})
//         .select({item: 1, qty: 1});
//     console.log(inventResult);
// }
// getInvent();

async function getInvent() {
    const inventResult = await Invent
        .find()
        .or([{qty: {$lte: 50}},{item: /.*l.*/i}])
        .sort({qty: -1});
    console.log(inventResult);
}
getInvent();