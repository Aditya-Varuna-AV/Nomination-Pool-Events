import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { StateChanged } from "../types";

export async function handleStateChanged(event: SubstrateEvent): Promise<void> {
    const entity = new StateChanged(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.poolId = Number(event.event.data[0].toString());
    entity.newState = event.event.data[1].toString();
    logger.info("Pool state changed to: {}", [entity.newState]);
    entity.timestamp = event.block.timestamp;
    await entity.save();
}