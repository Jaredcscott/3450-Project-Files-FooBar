import { Router } from 'express'
import { Inventory } from '../../models/inventory '

const router = new Router()

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

router.get('/', (request, response) =>
	response.json({ hello: 'world'})
)

export default router