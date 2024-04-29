import { config } from 'src/config';
import { DomainEvent, DomainMessageAttributes } from 'src/domain-message';

interface FundsWithdrawnPayload {
  withdrawn: number;
}

export class FundsWithdrawnEvent extends DomainEvent<FundsWithdrawnPayload> {
  constructor(attributes: DomainMessageAttributes<FundsWithdrawnPayload>) {
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
