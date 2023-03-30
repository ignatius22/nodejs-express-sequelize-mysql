import { celebrate } from 'celebrate';
import schemas from '../schemas';

import GroupController from "../controllers/groups.controller";

const groupsController = new GroupController();

module.exports = (app: any) => {

    var router = require("express").Router();

    const celebrateOption = {
        abortEarly: false,//to show all the field errors
    }

    var router = require("express").Router();

    router.post("/", celebrate(schemas.groupPOST, celebrateOption), groupsController.createNewGroup);
    router.post("/assign", celebrate(schemas.groupAssignPOST, celebrateOption), groupsController.assignUserToGroup)
    router.put("/:id", celebrate(schemas.groupPUT, celebrateOption), groupsController.updateGroup);
    router.get("/", groupsController.allGroups);
    router.get("/:id", celebrate(schemas.groupPARAM, celebrateOption), groupsController.singleGroup);
    router.delete("/:id", celebrate(schemas.groupPARAM, celebrateOption), groupsController.deleteGroup);
    app.use('/api/groups', router);
}

