export const BASE_URL = "http://122.9.107.17:3000/v1/mp"

export const webGet = async function <T>(url: string, params: any = {}): Promise<T | null> {
    const keys: string[] = Object.keys(params);
    url = BASE_URL + url + '?'
    keys.forEach(key => {
        url = url + params[key] + '&'
    })
    if (keys.length > 0) {
        url = url.slice(0, -1)
    }
    console.log(url, 'aaa')
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