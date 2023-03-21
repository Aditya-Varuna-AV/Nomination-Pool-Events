import { SubstrateEvent } from "@subql/types";
import { Created } from "../types";
import { getEventId, getExtrinsicId } from "../helper/helper";

/**
 * A pool has been created.
 * @param event
 */
export async function handleCreated(event:SubstrateEvent): Promise<void> {
    const entity: Created= new Created(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.depositor = event.event.data[0].toString();
    entity.poolId = Number(event.event.data[1].toString());
    entity.timestamp = event.block.timestamp;
    await entity.save();
}