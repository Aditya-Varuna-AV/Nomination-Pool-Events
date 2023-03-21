import { SubstrateEvent } from "@subql/types";

export function getEventId(event: SubstrateEvent): string {
  return `${event.block.block.header.number}-${event.idx}`;
}

export function getExtrinsicId(event: SubstrateEvent): string {
    return `${event.block.block.header.number}-${event.extrinsic.idx}`;
}