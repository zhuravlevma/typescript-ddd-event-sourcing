import { BankAccountEntity } from '../../entities/bank_account.entity';

export abstract class SaveBankAccountOutPort {
  abstract saveBankAccount(
    account: BankAccountEntity,
  ): Promise<BankAccountEntity | null>;
}
