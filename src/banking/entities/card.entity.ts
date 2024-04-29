export interface Attr {
  id: string;
  cardNumber: number;
}
export class CardEntity implements Attr {
  readonly id: string;
  cardNumber: number;
  constructor(data: Attr) {
    this.id = data.id;
    this.cardNumber = data.cardNumber;
  }
}
