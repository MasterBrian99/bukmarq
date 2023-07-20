import { CollectionChild } from "@/api/collection";

export function hasChildren(item: CollectionChild[] | null | undefined) {
  if (item === undefined) {
    return false;
  }
  if (!item) {
    return false;
  }
  if (item.constructor !== Array) {
    return false;
  }

  if (item.length === 0) {
    return false;
  }

  return true;
}
