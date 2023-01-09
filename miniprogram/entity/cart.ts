export interface Cart {
    commodityId?: number
    commodityName?: string
    commodityBrief?: string
    currentPrice?: number
    commodityType?: number
    quantity?: number
    remark?: string
    select?: boolean
    group?: {//仅通过团购页面加购才会有此字段
        title: string,//优惠信息
        amount: number//优惠金额
    }
}

