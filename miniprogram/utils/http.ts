export const BASE_URL = "http://127.0.0.1:3000/v1/mp"

export const webGet = async function <T>(url: string, params: any = new Object()): Promise<T | null> {
    const keys: string[] = Object.keys(params);
    url = BASE_URL + url + '?'
    keys.forEach(key => {
        url = url + params[key] + '&'
    })
    if (keys.length > 0) {
        url = url.slice(0, -1)
    }
    return await new Promise<T | null>((r) => {
        wx.request({
            url: url,
            method: 'GET',
            success: (res) => {
                r(res.data as T)
            },
            fail: () => {
                r(null)
            }
        })
    })
}

export const webPost = async function <T>(url: string, body: any = new Object()): Promise<T | null> {
    url = BASE_URL + url
    return await new Promise<T | null>((r) => {
        wx.request({
            url: url,
            header: {
                cookie: wx.getStorageSync("token")
            },
            method: 'POST',
            data: body,
            success: (res) => {
                r(res.data as T)
            },
            fail: () => {
                r(null)
            }
        })
    })
}