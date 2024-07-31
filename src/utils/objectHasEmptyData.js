export default (o) => {
    return !o || !o?.data ||
        Object.keys(o).length === 0 ||
        Object.keys(o?.data || {}).length === 0
}