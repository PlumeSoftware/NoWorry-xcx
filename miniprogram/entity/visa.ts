export interface Visa {
    commodityId: number
    commodityBrief?: string
    commodityName?: string
    commodityStatus?: number
    commodityType?: number
    currentPrice?: number
    initialQuantity?: number
    originPrice?: number
    picLink?: string
    picLinkTem?:string
    remainQuantity?: number
    tips?: Array<{title:string,children:Array<string>}>
}