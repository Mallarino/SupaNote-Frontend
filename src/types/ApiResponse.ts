export type ApiResponse<T> = {
    data: T;              
    msg: string;          
    status: string;       
    errors?: string[];
};