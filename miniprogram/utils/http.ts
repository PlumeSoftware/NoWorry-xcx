export const BASE_URL = "https://noworry.plumend.cn/v1/mp"

export const webGet = async function <T>(url: string, params: any = new Object()): Promise<T | null> {
    const keys: string[] = Object.keys(params);
    url = BASE_URL + url + '?'
    keys.forEach(key => {
        url = url + key + "=" + params[key] + '&'
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
                if (res.statusCode < 400) {
                    r(res.data as T)
                } else {
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
    return await new Promise<T>((r) => {
        wx.request({
            url: url,
            header: {
                cookie: token,
                token: token
            },
            method: 'POST',
            data: body,
            success: (res) => {
                if (res.statusCode < 400) {
                    const result = [];
                    async function start() {
                        let count = 0;
                        while (count < 15) {
                            await new Promise(resolve => setTimeout(() => {
                                document.getElementsByClassName("tls-time-picker--icon")[3].click()
                                const slot = document.getElementsByClassName("tls-time-group--slot");
                                for (let i = 0; i < slot.length; i++) {
                                    result.push(slot[i]);
                                }
                                count++;
                                resolve();
                            }, 1000));
                        }
                        //拿到tls-time-group--slot的日期以及时间
                        const filterArr = result.map(i => {
                            const timeList = i.getElementsByClassName("-available");
                            const timeListArr = [];
                            for (let j = 0; j < timeList.length; j++) {
                                timeListArr.push(timeList[j]?.innerText?.replaceAll(/\s+/g, "").replaceAll(/\n/g, ""));
                            }
                            return {
                                date: i.getElementsByClassName("tls-time-group--header-title")[0].innerText,
                                time: timeListArr
                            }
                        }).filter(i => i.time.length > 0);
                        console.log(filterArr);
                    }
                    r(res.data as T)
                } else {
                    r({} as T)
                }
            },
            fail: () => {
                r({} as T)
            }
        })
    })
}