import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { UnbondingPoolSlashed } from "../types";

export async function handleUnbondingPoolSlashed(event: SubstrateEvent): Promise<void> {
    const entity = new UnbondingPoolSlashed(getEventId(event));
    entity.extrinsic = getExtrinsicId(event);
    entity.poolId = Number(event.event.data[0].toString());
    entity.era = Number(event.event.data[1].toString());
    entity.balance = BigInt(event.event.data[2].toString());
}