import { config } from 'src/config';
import { DomainEvent, DomainMessageAttributes } from 'src/domain-message';

interface CardAddedPayload {
  cardNumber: number;
}

export class CardAddedEvent extends DomainEvent<CardAddedPayload> {
  constructor(attributes: DomainMessageAttributes<CardAddedPayload>) {
    super({
      reason: 'The report was validated',
      payload: attributes.payload,
      messageName: config().messages.cardAdded,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Report',
      contextName: 'accounting',
    });
  }
}
