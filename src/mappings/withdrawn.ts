import { SubstrateEvent } from "@subql/types";
import { Withdrawn } from "../types";
import { getEventId, getExtrinsicId } from "../helper/helper";

/**
 * A member has withdrawn from their pool.
 * The given number of ***points*** have been dissolved in return of ***balance***.
 * Similar to Unbonded event, in the absence of slashing, the ratio of point to balance will be 1.
 * @param event 
 */
export async function handleWithdrawn(event:SubstrateEvent): Promise<void> {
    const entity: Withdrawn= new Withdrawn(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.member = event.event.data[0].toString();
    entity.poolId = Number(event.event.data[1].toString());
    entity.balance = BigInt(event.event.data[2].toString());
    entity.points = BigInt(event.event.data[3].toString());
    entity.timestamp = event.block.timestamp;
    await entity.save();
}