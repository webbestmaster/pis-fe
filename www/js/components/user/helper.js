import style from './style.m.scss';

export function getHumanOrderStatus(orderStatus) {
    const statusData = {
        pending: {
            cssClass: style.table__training_status_icon__in_progress,
            status: 'Обработка',
            description: 'Ожидайте подтверждения'
        },
        confirmed: {
            cssClass: style.table__training_status_icon__taken,
            status: 'Забронировано',
            description: 'Клуб ждет вас'
        },
        declined: {
            cssClass: style.table__training_status_icon__rejected,
            status: 'Отклонено',
            description: 'Выберите другое предложение'
        },
        approved: {
            cssClass: style.table__training_status_icon__done,
            status: 'Завершено',
            description: 'Вам начислены бонусы'
        }
    };

    return statusData[orderStatus] || {};
}

