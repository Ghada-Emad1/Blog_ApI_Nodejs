
export class AppError extends Error{
    statusCode: number;
    errors: string[];
    constructor(message:string, statusCode:number=500, errors:string[]=[]) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors || [];
    }
}

