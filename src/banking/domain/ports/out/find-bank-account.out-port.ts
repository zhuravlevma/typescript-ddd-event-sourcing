import { BankAccountEntity } from '../../entities/bank_account.entity';

export abstract class FindBankAccountOutPort {
  abstract findAccount(accountId: string): Promise<BankAccountEntity | null>;
}
