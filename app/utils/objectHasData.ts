export const ObjectHasData = (obj: Object): boolean => {
    return Boolean(Object.keys(obj).length)
}