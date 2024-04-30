import { BankAccountEntity } from '../entities/bank-account.entity';
import { AddCardInPort, AddCardParams } from '../ports/in/add-card.in-port';
import { FindBankAccountOutPort } from '../ports/out/find-bank-account.out-port';
import { SaveBankAccountOutPort } from '../ports/out/save-bank-account.out-port';

export class AddCardInteractor implements AddCardInPort {
  constructor(
    private readonly findBankAccountPort: FindBankAccountOutPort,
    private readonly saveBankAccountPort: SaveBankAccountOutPort,
  ) {}

  async execute(addCardParams: AddCardParams): Promise<BankAccountEntity> {
    const account = await this.findBankAccountPort.findAccount(
      addCardParams.id,
    );
    if (!account) {
      throw new Error();
    }

    account.addCard(addCardParams.cardNumber);

    return this.saveBankAccountPort.saveBankAccount(account);
  }
}
