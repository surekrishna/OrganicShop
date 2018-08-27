import { Order } from "./order";

export class FinalOrder {
    datePlaced: number;

    constructor(public userId: string, public shipping: any, public items: Order[]){
        this.datePlaced = new Date().getTime();
    }
}