export interface ReturnType<T = Record<string, never>> {
    code: number,
    message: string,
    success: boolean,
    data: T | {} | string | []
}