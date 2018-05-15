export function getCategoryNameFromRow(row) {
    // 15 мая 2018
    // [20:51:28] dmitry.turovtsov: attributes:
    // {gym: 2}а если в attributes два поле, какое брать?
    // [20:51:42] fitness_Dmitry Mamchyts: первую
    // [20:52:01] fitness_Dmitry Mamchyts: там может быть до 4 полей
    // [20:52:36] fitness_Dmitry Mamchyts: но с минимальными переделками лекго расширяется до любой длины

    return Object.keys(row.attributes)[0];
}
