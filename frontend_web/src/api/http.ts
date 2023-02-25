import axios from "axios";

// request
axios.interceptors.request.use(req => {
    console.log(`${req.method} ${req.url}`);

    return req;
});

// response
axios.interceptors.response.use(res => {
    console.log(res.data.json);
    return res;
});

function get(url: string, param?: any) {
    const fullUrl = paramToUrl(url, param);
    return axios.get(fullUrl, {

    })
}

function postJson(url: string, param?: any) {
    const jsonObj = JSON.stringify(param);
    return axios.post(url, jsonObj, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function postFormData(url: string, param?: any) {
    const jsonObj = JSON.stringify(param);
    return axios.post(url, jsonObj, {
        headers: {
            'Content-Type': 'application/form-data'
        }
    });
}

function paramToUrl(url: string, params?: any) {
    console.log('url', url)
    console.log('params', params)
    // 如果不存在params参数，直接返回
    if (!params) {
        return url
    }
    // age=1&name=tom
    if (typeof params === 'string') {
        return url + (url.includes('?') ? '&' : '?') + params.toString()
    }
    // {age=1, name=tom}
    const parts: string[] = []
    Object.keys(params).forEach((key: string) => {
        const val: any = params[key]
        // 如果值是null或者undefined直接跳过
        if (val === null || typeof val === 'undefined') {
            return
        }
        // 利用 encodeURIComponent 变成 URI 格式 (ignore array, object...)
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    })
    // 判断url有没有已经存在参数 /api/test/get?a=1，如果存在 使用&
    url += (url.includes('?') ? '&' : '?') + parts
    console.log('full-url', url)
    return url
}

export {get, postJson, postFormData}