import { Request, Response } from 'express';
import httpStatus from 'http-status';
import GroupService from '../service/implementations/GroupService';
import { ObjectHasData } from "../utils"
import logger from '../config/logger';
const db = require("../models");
const Group = db.Group;
const User = db.User

export default class AuthController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    createNewGroup = async (req: Request, res: Response) => {
        try {
            const group = await this.groupService.createGroup(req.body);
            res.status(httpStatus.OK).send({ data: group });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    allGroups = async (req: Request, res: Response) => {
        try {
            const data = await this.groupService.allGroups();
            res.status(httpStatus.OK).send({ data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
    singleGroup = async (req: Request, res: Response) => {
        try {
            const data = await this.groupService.singleGroup(req.params.id);
            res.status(httpStatus.OK).send({ data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
    deleteGroup = async (req: Request, res: Response) => {
        try {
            await this.groupService.deleteGroup(req.params.id);
            res.status(httpStatus.OK).send({ message: "group deleted" });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
    updateGroup = async (req: Request, res: Response) => {
        try {
            const data = await this.groupService.updateGroup(req.params.id, req.body);
            res.status(httpStatus.OK).send({ data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    assignUserToGroup = async (req: Request, res: Response) => {
        try {
            const data = await this.groupService.assignSingleUserToGroup(req.body.userId, req.body.groupId);
            if (ObjectHasData(data)) {
                res.status(httpStatus.OK).send({ message: "user already assigned to group" });
            }
            else {
                res.status(httpStatus.OK).send({ data, message: "welcome to new group" });
            }

        } catch (e) {
            logger.error(e);
            if (e === "user not round" || e === "group not round") {
                res.status(httpStatus.BAD_REQUEST).json({
                    error: e
                });
            }
            else {
                res.status(httpStatus.BAD_GATEWAY).json({
                    error: e
                });
            }
        }
    }
}

