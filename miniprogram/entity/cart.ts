export interface Cart {
    commodityId?: number
    commodityName?: string
    commodityBrief?: string
    currentPrice?: number
    commodityType?: number
    quantity?: number
    remark?: string
    select?: boolean
    group?: {//仅通过团购页面加购才会有此字段，具有此字段时，代表每一份商品优惠amount
        orderGroupId: number,//团购
        title: string,//团购的优惠信息，和显示的时候一样
        amount: number//团购的优惠金额，和显示的时候一样
    },
    groupsign?: boolean
    urgentsign?:boolean
    handCity?:string
    picLinkTem?:string
}

