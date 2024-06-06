export interface ObjectUser {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    uid: string | null;
}

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    provider: string;
    resetPasswordToken: string | null;
    confirmationToken: string | null;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string;
    object_user: ObjectUser;
}

export interface IUser {
    id: number;
    attributes: UserAttributes;
}

// interface MetaData {}

// interface ResponseData {
//     data: UserData;
//     meta: MetaData;
// }
