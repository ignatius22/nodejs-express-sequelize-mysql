export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate?: string;
    created_at?: Date;
    updated_at?: Date;
}