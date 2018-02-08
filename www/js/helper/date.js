import {defaultDateFilter} from '../components/trainings-catalog/reducer';

const yearMonthsMap = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
const millisecondsInOneDay = 24 * 60 * 60 * 1000;
const dateJson = require('./date.json');

export function dateToDay(time) {
    // const today = new Date();
    // const now = Number(new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    const today = 'сегодня';
    const tomorrow = 'завтра';

    // const defaultItems = [defaultDateFilter];

    // while (defaultItems.length < 7) {
    //     defaultItems.push(defaultItems[defaultItems.length - 1] + millisecondsInOneDay);
    // }
    //
    const currentDate = new Date(time);
    let dateDate = null;

    switch (defaultDateFilter - currentDate / millisecondsInOneDay) {
        case 0:
            dateDate = today;
            break;
        case 1:
            dateDate = tomorrow;
            break;

        default:
            dateDate = currentDate.getDate() + ' ' + yearMonthsMap[currentDate.getMonth()];
    }

    return dateDate;
}

export function reduceSeconds(date) {
    return date.substr(0, 5).replace(/^0/, '');
}

const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const monthsAfterDay = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function getMonthName(index) {
    return months[index];
}

export function getMonthAfterDayName(index) {
    return monthsAfterDay[index];
}

export function getTimePeriodName(periodType) {
    const name = dateJson.period.type[String(periodType)];

    if (name) {
        return name;
    }

    throw new Error('Unsupported period type: ' + periodType);
}
