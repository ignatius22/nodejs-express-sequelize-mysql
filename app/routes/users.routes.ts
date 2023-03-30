import { celebrate } from 'celebrate';
import schemas from '../schemas';

import usersController from '../controllers/users.controller';



module.exports = (app: any) => {


  var router = require("express").Router();

  const celebrateOption = {
    abortEarly: false,//to show all the field errors
  }

  router.post("/", celebrate(schemas.userPOST, celebrateOption), usersController.create);
  router.get("/", usersController.findAll);
  router.get("/:id", usersController.findOne);
  router.put("/:id", usersController.update);
  router.delete("/:id", usersController.delete);

  app.use('/api/users', router);
};
