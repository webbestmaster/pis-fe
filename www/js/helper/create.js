export function createArray(start, end, step) {
    const result = [];
    let ii = start;

    for (; ii <= end; ii += step) {
        result.push(ii);
    }

    return result;
}
