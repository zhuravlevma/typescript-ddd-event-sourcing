import { config } from 'src/config';
import { DomainEvent, DomainMessageAttributes } from 'src/domain-message';

interface FundsDepositedPayload {
  deposited: number;
}

export class FundsDepositedEvent extends DomainEvent<FundsDepositedPayload> {
  constructor(attributes: DomainMessageAttributes<FundsDepositedPayload>) {
    super({
      reason: 'The report was validated',
      payload: attributes.payload,
      messageName: config().messages.fundsWithdrawn,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Report',
      contextName: 'accounting',
    });
  }
}
