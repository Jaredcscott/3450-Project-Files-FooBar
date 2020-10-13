import { Router } from 'express'
import { Inventory } from '../../models/inventory'

const router = new Router()

// this is to populate the database with the table of data.
router.post("/insertdefault", function(req, res){
  Inventory.insertMany(
    default_inventory,
    function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );

});


export default router