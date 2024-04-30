import { BankAccountEntity } from '../../entities/bank-account.entity';

export abstract class FindBankAccountOutPort {
  abstract findAccount(accountId: string): Promise<BankAccountEntity | null>;
}
