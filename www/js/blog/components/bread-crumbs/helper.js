const routeMap = {
    event: 'События',
    fitness: 'Фитнес',
    food: 'Питание',
    knowledge: 'Знания',
    motivation: 'Мотивация'
};

export function routeToSectionName(route) {
    return routeMap[route] || 'Без имени';
}
