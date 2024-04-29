import { DomainMessage } from 'src/domain-message';
import { FundsWithdrawnEvent } from '../events/funds-withdrawn.event';
import { config } from 'src/config';
import { FundsDepositedEvent } from '../events/funds-deposited.event';
import { CardEntity } from './card.entity';
import { CardAddedEvent } from '../events/card_added.event';
import { randomUUID } from 'crypto';

export class BankAccountEntity {
  private readonly id: string;
  private balance: number;
  private cards: CardEntity[];

  constructor(messages: DomainMessage[]) {
    for (const message of messages) {
      this.apply(message);
    }
  }

  applyFundsWithdrawn(event: FundsWithdrawnEvent) {
    if (this.balance - event.payload.withdrawn < 0) {
      throw new Error('Error!');
    }
    this.balance -= event.payload.withdrawn;
  }

  applyFundsDeposited(event: FundsDepositedEvent) {
    this.balance += event.payload.deposited;
  }

  applyCardAdded(event: CardAddedEvent) {
    this.cards.push(
      new CardEntity({
        id: randomUUID(),
        cardNumber: event.payload.cardNumber,
      }),
    );
  }

  apply(message: DomainMessage) {
    if (message.messageName === config().messages.fundsWithdrawn) {
      this.applyFundsWithdrawn(message as FundsWithdrawnEvent);
    }
    if (message.messageName === config().messages.fundsDeposited) {
      this.applyFundsDeposited(message as FundsDepositedEvent);
    }
    if (message.messageName === config().messages.cardAdded) {
      this.applyCardAdded(message as CardAddedEvent);
    }
  }
}
