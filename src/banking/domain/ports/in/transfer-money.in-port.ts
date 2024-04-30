import { BankAccountEntity } from '../../entities/bank-account.entity';

export interface TransferMoneyParams {
  from: string;
  to: string;
  count: number;
}

export abstract class TransferMoneyInPort {
  abstract execute(
    transferMoneyParams: TransferMoneyParams,
  ): Promise<BankAccountEntity[]>;
}
