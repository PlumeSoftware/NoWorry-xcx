export interface Order {
    createTime?: string;
    openid?: string;
    orderDetailInfoGroup?: OrderDetailInfo[];
    orderId?: number;
    orderPaymentPrice?: number;
    orderStatus?: number;
    orderTotalPrice?: number;
    payTime?: string;
}

export interface OrderDetailInfo {
    boughtQuantity?: number;
    commodityBrief?: string;
    commodityId?: number;
    commodityName?: string;
    invPrice?: number;
    orderDetailId?: number;
    orderId?: string;
    picLink?: string;
    status: number;
}

export interface SubmitCart {
    orderDetail: CartDetail[];
    orderTotalPrice: number;
    /**
     * 支付方式
     */
    payWay: string;
    /**
     * oJth05Jx9ITN9s85MnT5odUbPlAg43
     */
    token: string;
}

export interface CartDetail {
    boughtQuantity?: number;
    commodityId?: number;
    invPrice?: number;
}