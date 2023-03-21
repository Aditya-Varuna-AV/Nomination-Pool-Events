import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { Bonded } from "../types"

export async function handleBonded(event: SubstrateEvent): Promise<void> {
  let entity = new Bonded(getEventId(event));
  entity.extrinsic = getExtrinsicId(event)
  entity.member = event.event.data[0].toString();
  entity.poolId = Number(event.event.data[1].toString());
  entity.bonded = BigInt(event.event.data[2].toString());
  entity.joined = event.event.data[3].toString() === 'true';
  entity.timestamp = event.block.timestamp;
  await entity.save();
}