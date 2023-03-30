import IGroupService from '../contracts/IGroupService';
import { IGroup, IGroupUpdate } from '../../interfaces/models/IGroup';
const db = require("../../models");
const Group = db.Group;
const User = db.User
// const UserGroup = db.UserGroup


export default class GroupService implements IGroupService {

    createGroup = async (groupBody: IGroup) => await Group.create(groupBody);

    allGroups = async () => await Group.findAll();

    updateGroup = async (id: string, body: IGroupUpdate) => {
        const user = await Group.findOne({ where: { id } });
        return await user.update(body);
    }

    deleteGroup = async (id: string) => {
        const user = await Group.findOne({ where: { id } });
        return await user.destroy();
    }

    singleGroup = async (id: string) => await Group.findOne({
        where: { id }, include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    assignSingleUserToGroup = async (id: string, groupId: string) => {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw "user not round"
        }
        const group = await Group.findOne({ where: { id: groupId } });
        if (!group) {
            throw "group not round"
        }
        return user.addGroup(group)
    }

}