import { BankAccountEntity } from '../../entities/bank-account.entity';

export abstract class SaveBankAccountOutPort {
  abstract saveBankAccount(
    account: BankAccountEntity,
  ): Promise<BankAccountEntity | null>;
}
