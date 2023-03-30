export interface IGroup {
    id: string;
    title: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface IGroupUpdate {
    id?: string;
    title?: string;
    description?: string;
}