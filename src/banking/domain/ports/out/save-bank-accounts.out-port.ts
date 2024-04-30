import { BankAccountEntity } from '../../entities/bank-account.entity';

export abstract class SaveBankAccountsOutPort {
  abstract saveBankAccounts(
    accounts: BankAccountEntity[],
  ): Promise<BankAccountEntity[]>;
}
