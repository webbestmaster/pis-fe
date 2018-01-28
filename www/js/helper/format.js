export function formatPhoneBY(str) {
    return str
        .toString()
        .replace(/\D/g, '')
        .substring(0, 9)
        .split('')
        .map((number, ii) => ([2, 5, 7].includes(ii) ? ' ' : '') + number)
        .join('');
}
