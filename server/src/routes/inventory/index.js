import { Router } from 'express'

const router = new Router()

router.get('/insertdata', (request, response).post(function(req, res){
  inventory.insertMany(
    [
      {category: "Bagels"},
      {name: "Plain"},
      {qty: 0},
      {price: 2},

      {category: "Bagels"},
      {name: "Onion"},
      {qty: 0},
      {price: 2},
      {category: "Bagels"},
      
      {name: "Cinnamon raisin"},
      {qty: 0},
      {price: 2},
      {category: "Bagels"},
      {name: "Sesame"},
      {qty: 0},
      {price: 2}
    ],
      function(err, result){
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
  );

// });


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// router.get('/get-inventory', function(req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var cursor = db.collection('inventory').find();
//     cursor.forEach(function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function() {
//       db.close();
//       res.render('index', {items: resultArray});
//     });
//   });
// });

// router.post('/insert-inventory', function(req, res, next) {
//   var item = {
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author
//   };

//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('inventory').insertOne(item, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });

//   res.redirect('/');
// });

// router.post('/update', function(req, res, next) {
//   var item = {
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author
//   };
//   var id = req.body.id;

//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('inventory').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item updated');
//       db.close();
//     });
//   });
// });

// router.post('/delete-inventory', function(req, res, next) {
//   var id = req.body.id;

//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('inventory').deleteOne({"_id": objectId(id)}, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item deleted');
//       db.close();
//     });
//   });
// });

// module.exports = router;