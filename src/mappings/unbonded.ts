import { SubstrateEvent } from "@subql/types";
import { Unbonded } from "../types";
import { getEventId, getExtrinsicId } from "../helper/helper";

/**
 * A member has unbonded from their pool.
 * balance is the corresponding balance of the number of points that has been requested to be unbonded 
 * (the argument of the unbond transaction) from the bonded pool.
 * points is the number of points that are issued as a result of balance being dissolved into the corresponding unbonding pool.
 * era is the era in which the balance will be unbonded. In the absence of slashing, these values will match.
 * In the presence of slashing, the number of points that are issued in the unbonding pool will be less than the
 * amount requested to be unbonded.
 * @param event 
 */
export async function handleUnbonded(event:SubstrateEvent): Promise<void> {
    const entity: Unbonded = new Unbonded(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.member = event.event.data[0].toString();
    entity.poolId = Number(event.event.data[1].toString());
    entity.balance = BigInt(event.event.data[2].toString());
    entity.points = BigInt(event.event.data[3].toString());
    entity.era = Number(event.event.data[4].toString());
    entity.timestamp = event.block.timestamp;
    await entity.save();
}