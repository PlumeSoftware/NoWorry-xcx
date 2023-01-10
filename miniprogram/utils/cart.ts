import { Cart } from "miniprogram/entity/cart";
import { webPost } from "./http";

//sign标记，0为团购，1为普通购买
export const culFavFromCarts = async (carts: Array<Cart>): Promise<Array<{ title: string, amount: number }>> => {
    const favourable: Array<{ title: string, amount: number }> = [];//优惠方案

    //先通过网络检查有无方案，若没有则根据旧方案计算
    
    
    const result = await webPost<Array<{ title: string, amount: number }>>('/order/cartculfav', carts)
    if (result) return result

    let usVisaNum = 0;//美签数量
    let sgVisaNum = 0;//申根签数量
    let enVisaNum = 0;//psw签证数量

    let pr88Num = 0;//88元签证数量
    let pr68Num = 0//68元签证数量


    for (let i = 0; i < carts.length; i++) {
        if (carts[i].select) {
            switch (carts[i].commodityName![0]) {
                case "美": usVisaNum += carts[i].quantity!; break;
                case "法": sgVisaNum += carts[i].quantity!; break;
                case "西": sgVisaNum += carts[i].quantity!; break;
                case "英": enVisaNum += carts[i].quantity!; break;
                default: break;
            }

            if (carts[i].currentPrice! >= 88) pr88Num += carts[i].quantity!
            else if (carts[i].currentPrice! >= 68 && carts[i].currentPrice! < 88) pr68Num += carts[i].quantity!;

        } else carts.splice(i--, 1)
    }

    //申美联合优惠，条件：申美总和小于5且两者都存在
    if (sgVisaNum + usVisaNum < 5 && sgVisaNum && usVisaNum) {
        const amount = Math.min(sgVisaNum, usVisaNum) * 10 <= 40 ? Math.min(sgVisaNum, usVisaNum) * 10 : 40
        favourable.push({ title: "美签+申根联合优惠", amount: amount })
    }


    if (pr88Num >= 5) {
        const amount = pr88Num * 10 < 40 ? pr88Num * 10 : 40
        favourable.push({ title: "组队刷签优惠(A档)", amount: amount })
    }

    if (pr68Num >= 5) {
        const amount = pr68Num * 5 < 40 ? pr68Num * 5 : 40
        favourable.push({ title: "组队刷签优惠(B档)", amount: amount })
    }

    if (enVisaNum) {
        switch (enVisaNum) {
            case 1: break;
            case 2: favourable.push({ title: "PSW组队优惠", amount: 20 }); break;
            case 3: favourable.push({ title: "PSW团购优惠", amount: 60 }); break;
            case 4: favourable.push({ title: "PSW团购优惠", amount: 80 }); break;
            default: favourable.push({ title: "PSW超低价优惠", amount: 30 * enVisaNum }); break;
        }
    }


    //美签优惠
    if (usVisaNum && pr68Num + pr88Num < 5) {
        switch (usVisaNum) {
            case 1: {
                break;
            }
            case 2:
                favourable.push({ title: "美签组队优惠", amount: 20 })
                break;
            case 3:
                favourable.push({ title: "美签组队优惠", amount: 20 })
                break;
            case 4:
                favourable.push({ title: "美签组队优惠", amount: 30 })
                break;
        }
    }
    return favourable
}