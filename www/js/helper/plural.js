const map = require('./plural-map.json');

export function plural(count, key) { // eslint-disable-line complexity
    if (count === 0) {
        // return 'Нет ' + map[key][1];
        return '0 ' + map[key][1];
    }

    const affectedCount = count % 100;

    if (affectedCount >= 10 && affectedCount <= 20) {
        return count + ' ' + map[key][1];
    }

    const lastNumber = affectedCount % 10;

    if (lastNumber === 0 || lastNumber >= 5) {
        return count + ' ' + map[key][1];
    }

    if (lastNumber === 1) {
        return count + ' ' + key;
    }

    // 2, 3, 4
    return count + ' ' + map[key][0];
}

// for (let ii = 0; ii < 300; ii++) {
//     console.log(plural(ii, 'отзыв'));
// }
