import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { PoolSlashed } from "../types";

export async function handlePoolSlashed(event:SubstrateEvent){
  const entity = new PoolSlashed(getEventId(event));
  entity.extrinsic = getExtrinsicId(event);
  entity.poolId = Number(event.event.data[0].toString());
  entity.balance = BigInt(event.event.data[1].toString());
  entity.timestamp = event.block.timestamp;
  entity.save();
}
