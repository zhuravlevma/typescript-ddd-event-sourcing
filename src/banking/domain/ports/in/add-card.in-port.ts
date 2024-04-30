import { BankAccountEntity } from '../../entities/bank-account.entity';

export interface AddCardParams {
  id: string;
  cardNumber: number;
}

export abstract class AddCardInPort {
  abstract execute(addCardParams: AddCardParams): Promise<BankAccountEntity>;
}
