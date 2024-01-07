export function hasChildren<T>(item: T[] | null | undefined) {
    if (item === undefined) {
        return false;
    }
    if (!item) {
        return false;
    }
    if (item.constructor !== Array) {
        return false;
    }

    return item.length !== 0;
}
