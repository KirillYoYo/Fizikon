function  getMonthName (num) {
    if (num < 0) {
        num = 11 + num
    }
    switch (num % 12) {
        case 0:
            return 'Январь';
            break;
        case 1:
            return 'Февраль';
            break;
        case 2:
            return 'Март';
            break;
        case 3:
            return 'Апрель';
            break;
        case 4:
            return 'Май';
            break;
        case 5:
            return 'Июнь';
            break;
        case 6:
            return 'Июль';
            break;
        case 7:
            return 'Август';
            break;
        case 8:
            return 'Сентябрь';
            break;
        case 9:
            return 'Октябрь';
            break;
        case 10:
            return 'Ноябрь';
            break;
        case 11:
            return 'Декабрь';
            break;
    }
};

function getMonthNum (string) {
    if (typeof(parseInt(string)) === 'number') {
    	return string
    }
    const str = string.toLowerCase();
    if (str.includes('янв')) {
        return 0;
    }
    if (str.includes('фев')) {
        return 1;
    }
    if (str.includes('мар')) {
        return 2;
    }
    if (str.includes('апр')) {
        return 3;
    }
    if (str.includes('май')) {
        return 4;
    }
    if (str.includes('июн')) {
        return 5;
    }
    if (str.includes('июл')) {
        return 6;
    }
    if (str.includes('авг')) {
        return 7;
    }
    if (str.includes('сен')) {
        return 8;
    }
    if (str.includes('окт')) {
        return 9;
    }
    if (str.includes('ноя')) {
        return 10;
    }
    if (str.includes('дек')) {
        return 11;
    }
    return false
}

export {getMonthName, getMonthNum};