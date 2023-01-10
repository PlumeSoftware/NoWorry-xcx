//十进制转二进制
function dtb(number: number) {
    const remSatck = []
    let binaryString = '';
    while (number > 0) {
        let rem = Math.floor(number % 2);
        remSatck.push(rem)
        number = Math.floor(number / 2);
    }
    while (remSatck.length) binaryString += remSatck.pop()
    return binaryString
}

//二进制转10进制
function btd(string: string) {
    let result = 0;
    let len = string.length
    for (let i = 0; i < len; i++)result += Number(string[i]) * (2 ** (len - i - 1))
    return result;
}

function getHour(month?: number, date?: number, hour?: number) {
    const time = new Date();
    month = month || (time.getMonth() + 1)
    date = date || time.getDate();
    hour = hour || time.getHours()
    //用两位32进制符可表示1024个十进制数字，而时间数与生成的随机数的和保持在1000以内
    switch (month) {
        case 12: date += 30; case 11: date += 31; case 10: date += 30; case 9: date += 30; case 8: date += 30; case 7: date += 30;
        case 6: date += 30; case 5: date += 30; case 4: date += 30; case 3: date += 30; case 2: date += 30
    }
    return (date - 1) * 24 + hour
}

export const culFav = (str: string, total?: number): {
    payway: 0 | 1 | 2,
    favway: 0 | 1,
    value: number,
} | null => {
    const wordArr = 'abcdefghijk2npqrstuvwxyzm3456789'.split('');
    const result: { payway: 0 | 1 | 2, favway: 0 | 1, value: number } = { payway: 0, favway: 0, value: 0 }
    str = str.toLocaleLowerCase()
    let hourBin = ''
    let vBin = ''

    if (str.indexOf('fav')!=-1) {
        result.payway = 0; 
        result.favway = 0;
        result.value = Number(str.slice(5))
        return result;
    }


    for (let i = 0; i < 4; i++) {
        const tg = wordArr.findIndex(it => it == str[i]);
        let tgBin = dtb(tg);
        while (tgBin.length < 5) tgBin = '0' + tgBin
        hourBin = '' + tgBin + hourBin
    }
    for (let i = 4; i < 6; i++) {
        const tg = wordArr.findIndex(it => it == str[i]);
        let tgBin = dtb(tg);
        while (tgBin.length < 5) tgBin = '0' + tgBin
        vBin = '' + tgBin + vBin
    }
    const hour = btd(hourBin) % 8785


    const value = btd(vBin) % 100
    result.value = value

    const pf = wordArr.findIndex(i => i == str[6]) % 6
    switch (pf) {
        case 0: result.payway = 0; result.favway = 0; break;
        case 1: result.payway = 0; result.favway = 1; break;
        case 2: result.payway = 1; result.favway = 0; break;
        case 3: result.payway = 1; result.favway = 1; break;
        case 4: result.payway = 2; result.favway = 0; break;
        case 5: result.payway = 2; result.favway = 1; break;
    }
    const check = wordArr.findIndex(i => i == str[7]) % 10;
    if (hour < getHour()) {
        return null
    }

    if (check == (hour % 3 + pf + value % 3)) {
        return result
    } else {
        return null
    }
}