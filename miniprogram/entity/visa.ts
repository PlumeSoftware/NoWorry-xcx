export class Visa {
    commodityId: number
    commoditySkuId: number
    commodityName: string
    constructor(commodityId: number, commoditySkuId: number, commodityName: string) {
        this.commodityId = commodityId
        this.commoditySkuId = commoditySkuId
        this.commodityName = commodityName
    }
}