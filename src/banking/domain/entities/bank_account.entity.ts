import { DomainEvent } from 'src/domain-message';
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
  private readonly domainEvents: DomainEvent[];

  constructor(events: DomainEvent[]) {
    for (const message of events) {
      this.apply(message);
    }
  }

  withdrawn(count: number) {
    if (this.balance - count < 0) {
      throw new Error('Error!');
    }
    const event = new FundsWithdrawnEvent({
      aggregateId: this.id,
      payload: {
        withdrawn: count,
      },
    });
    this.apply(event);
  }

  addCard(cardNumber: number) {
    if (this.cards.length > 5) {
      throw new Error('limit');
    }

    const event = new CardAddedEvent({
      aggregateId: this.id,
      payload: {
        cardNumber: cardNumber,
      },
    });

    this.apply(event);
  }

  deposit(count: number) {
    const event = new FundsWithdrawnEvent({
      aggregateId: this.id,
      payload: {
        withdrawn: count,
      },
    });
    this.apply(event);
  }

  transferToAnother(count: number, anotherAccount: BankAccountEntity) {
    if (this.balance - count < 0) {
      throw new Error('Error');
    }
    anotherAccount.deposit(count);
    this.withdrawn(count);
  }

  private applyFundsDeposited(event: FundsDepositedEvent) {
    this.balance += event.payload.deposited;
  }

  private applyCardAdded(event: CardAddedEvent) {
    this.cards.push(
      new CardEntity({
        id: randomUUID(),
        cardNumber: event.payload.cardNumber,
      }),
    );
  }

  private applyFundsWithdrawn(event: FundsWithdrawnEvent) {
    this.balance -= event.payload.withdrawn;
  }

  private apply(event: DomainEvent) {
    this.domainEvents.push(event);

    if (event.messageName === config().messages.fundsWithdrawn) {
      this.applyFundsWithdrawn(event as FundsWithdrawnEvent);
    }
    if (event.messageName === config().messages.fundsDeposited) {
      this.applyFundsDeposited(event as FundsDepositedEvent);
    }
    if (event.messageName === config().messages.cardAdded) {
      this.applyCardAdded(event as CardAddedEvent);
    }
  }
}
