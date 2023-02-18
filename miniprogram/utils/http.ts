export const BASE_URL = "https://4997xs4632.goho.co/v1/mp"

export const webGet = async function <T>(url: string, params: any = new Object()): Promise<T | null> {
    const keys: string[] = Object.keys(params);
    url = BASE_URL + url + '?'
    keys.forEach(key => {
        url = url + params[key] + '&'
    })
    if (keys.length > 0) {
        url = url.slice(0, -1)
    }
    const token = getApp().globalData.token
    return await new Promise<T | null>((r) => {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                token: token
            },
            success: (res) => {
                if(res.statusCode<400){
                    r(res.data as T)
                }else{
                    r(null)
                }
            },
            fail: () => {
                r(null)
            }
        })
    })
}

export const webPost = async function <T>(url: string, body: any = new Object()): Promise<T> {
    url = BASE_URL + url
    const token = getApp().globalData.token;
    return await new Promise<T >((r) => {
        wx.request({
            url: url,
            header: {
                cookie: token,
                token: token
            },
            method: 'POST',
            data: body,
            success: (res) => {
                if(res.statusCode<400){
                    r(res.data as T)
                }else{
                    r({} as T)
                }
            },
            fail: () => {
                r({} as T)
            }
        })
    })
}