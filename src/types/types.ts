export interface Error{
    message:string,
    status: string,
    statusCode:number
}

export interface UserSchema {
  username: string;
  email: string;
  password: string;
}


export interface PayloadVerifiy{
    email: string,
    iat:number
}

declare global {
    namespace Express{
        interface Request{
            user?: UserSchema;
        }
    }
}