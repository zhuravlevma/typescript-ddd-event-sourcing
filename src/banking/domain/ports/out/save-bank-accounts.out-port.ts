import { BankAccountEntity } from '../../entities/bank_account.entity';

export abstract class SaveBankAccountsOutPort {
  abstract saveBankAccounts(
    accounts: BankAccountEntity[],
  ): Promise<BankAccountEntity[]>;
}
