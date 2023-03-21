import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { MemberRemoved } from "../types";

/**
 * A member has been removed from a pool.
 * The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
 * @param event
 */
export async function handleMemberRemoved(event: SubstrateEvent): Promise<void> {
    const entity = new MemberRemoved(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.poolId = Number(event.event.data[0].toString());
    entity.member = event.event.data[1].toString();
    entity.timestamp = event.block.timestamp;
    await entity.save();
}