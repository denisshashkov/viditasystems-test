export interface IDocument {
    [x: string]: any;
    id: string,
    status: string,
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
}