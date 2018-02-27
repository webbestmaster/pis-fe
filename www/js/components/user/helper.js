import style from './style.m.scss';

export function getHumanOrderStatus(orderStatus, postFix = '') { // eslint-disable-line complexity
    switch (orderStatus + postFix) {
        case 'pending':
        case 'pendingHasBonus':
            return {
                cssClass: style.table__training_status_icon__in_progress,
                status: 'Обработка',
                description: 'Ожидайте подтверждения'
            };

        case 'confirmed':
        case 'confirmedHasBonus':
            return {
                cssClass: style.table__training_status_icon__taken,
                status: 'Забронировано',
                description: 'Клуб ждет вас'
            };

        case 'declined':
        case 'declinedHasBonus':
            return {
                cssClass: style.table__training_status_icon__rejected,
                status: 'Отклонено',
                description: 'Выберите другое предложение'
            };

        case 'approved':
            return {
                cssClass: style.table__training_status_icon__done,
                status: 'Завершено',
                description: 'Вам начислены бонусы'
            };
        case 'approvedHasBonus':
            return {
                cssClass: style.table__training_status_icon__done,
                status: 'Завершено',
                description: 'Клуб ждет вас, бонусы списаны'
            };

        default:
            return {
                cssClass: style.table__training_status_icon__in_progress,
                status: 'Обработка',
                description: 'Ошибка обработки'
            };
    }
}

