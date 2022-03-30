// import required essentials
const express = require('express');
// create new router
const router = express.Router();
// create a JSON data array
let data = [
    { id: 1, title: 'SNK',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'MHA',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Danganronpa', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Jujustu Kaisen', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Grand blue', order: 5, completed: false, createdOn: new Date() },
];

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (manga) {
        return manga.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to manga list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // get mangaIds from data array
    let mangaIds = data.map(manga => manga.id);
    // get orderNums from data array
    let orderNums = data.map(manga => manga.order);

    // create new id (basically +1 of last manga object)
    let newId = mangaIds.length > 0 ? Math.max.apply(Math, mangaIds) + 1 : 1;
    // create new order number (basically +1 of last manga object)
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    // create an object of new manga
    let newmanga = {
        id: newId, // generated in above step
        title: req.body.title, // value of `title` get from POST req
        order: newOrderNum, // generated in above step
        completed: false, // default value is set to false
        createdOn: new Date() // new date object
    };

    // push new manga object to data array of mangas
    data.push(newmanga);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newmanga);
});

// UPDATE
// this api end-point update an existing manga object
// for that we get `id` and `title` from api end-point of manga to update
router.put('/:id', function (req, res) {
    // get manga object match by `id`
    let found = data.find(function (manga) {
        return manga.id === parseInt(req.params.id);
    });

    // check if manga found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, // set value of `title` get from req
            order: req.body.order, // set value of `order` get from req
            completed: req.body.completed // set value of `completed` get from req
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing manga object from
// array of data, match by `id` find manga and then delete
router.delete('/:id', function (req, res) {
    // find manga from array of data
    let found = data.find(function (manga) {
        return manga.id === parseInt(req.params.id);
    });

    if (found) {
        // if manga found then find index at which the manga is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete manga from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;