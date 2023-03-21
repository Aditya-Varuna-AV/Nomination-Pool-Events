import { SubstrateEvent } from "@subql/types";
import { Destroyed } from "../types";
import { getEventId, getExtrinsicId } from "../helper/helper";

export async function handleDestroyed(event: SubstrateEvent): Promise<void> {
    const entity = new Destroyed(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.poolId = Number(event.event.data[0].toString());
    entity.timestamp = event.block.timestamp;
    await entity.save();
}