
import { IGroup, IGroupUpdate } from '../../interfaces/models/IGroup';

export default interface IGroupService {
    createGroup: (groupBody: IGroup) => Promise<any>;
    updateGroup: (id: string, body: IGroupUpdate) => Promise<any>;
    allGroups: (limit: number, skip: number) => Promise<any>;
    singleGroup: (id: string) => Promise<IGroup>;
    deleteGroup: (id: string) => Promise<IGroup>;
    assignSingleUserToGroup: (userId: string, groupId: string) => Promise<any>;
}