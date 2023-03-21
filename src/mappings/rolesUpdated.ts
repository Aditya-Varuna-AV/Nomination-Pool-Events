import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../helper/helper";
import { RolesUpdated } from "../types";

export async function handleRolesUpdated(event: SubstrateEvent): Promise<void> {
  const entity = new RolesUpdated(getEventId(event));
  entity.extrinsic = getExtrinsicId(event);
  entity.root = event.event.data[0].toString();
  entity.bouncer = event.event.data[1].toString();
  entity.nominator = event.event.data[2].toString();
  entity.timestamp = event.block.timestamp;
  entity.save();
}