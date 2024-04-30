import { BankAccountEntity } from '../entities/bank_account.entity';
import {
  TransferMoneyInPort,
  TransferMoneyParams,
} from '../ports/in/transfer-money.in-port';
import { FindBankAccountOutPort } from '../ports/out/find-bank-account.out-port';
import { SaveBankAccountsOutPort } from '../ports/out/save-bank-accounts.out-port';

export class TransferMoneyInteractor implements TransferMoneyInPort {
  constructor(
    private readonly findBankAccountPort: FindBankAccountOutPort,
    private readonly saveBankAccountsPort: SaveBankAccountsOutPort,
  ) {}

  async execute(
    transferMoneyParams: TransferMoneyParams,
  ): Promise<BankAccountEntity[]> {
    const fromAccount = await this.findBankAccountPort.findAccount(
      transferMoneyParams.from,
    );
    if (!fromAccount) {
      throw new Error();
    }

    const toAccount = await this.findBankAccountPort.findAccount(
      transferMoneyParams.to,
    );

    if (!toAccount) {
      throw new Error();
    }

    fromAccount.transferToAnother(transferMoneyParams.count, toAccount);

    return this.saveBankAccountsPort.saveBankAccounts([fromAccount, toAccount]);
  }
}
