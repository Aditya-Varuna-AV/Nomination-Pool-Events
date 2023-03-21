import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { PaidOut } from "../types";

export async function handlePaidOut(event: SubstrateEvent): Promise<void> {
  let entity = new PaidOut(getEventId(event));
  entity.extrinsic = getExtrinsicId(event)
  entity.member = event.event.data[0].toString();
  entity.poolId = Number(event.event.data[1].toString());
  entity.payout = BigInt(event.event.data[2].toString());
  entity.timestamp = event.block.timestamp;
  await entity.save();
}