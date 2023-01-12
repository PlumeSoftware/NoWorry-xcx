import { Cart } from "../entity/cart";
import { webPost } from "./http";

//sign标记，0为团购，1为普通购买
export const culFavFromCarts = async (cartsData: Array<Cart>): Promise<Array<{ title: string, amount: number }>> => {

    const carts = JSON.parse(JSON.stringify(cartsData))
    //先通过网络检查有无方案，若没有则根据旧方案计算

    const result = await webPost<Array<{ title: string, amount: number }>>('/order/cart/culfav', carts)
    if (result) return result
    else {
        wx.showToast({ title: '获取优惠信息失败！', icon: 'none' })
        return []
    }

}