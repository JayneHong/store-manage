import axios from "axios";

// request
axios.interceptors.request.use(req => {
    let token = window.localStorage.getItem("token");
    console.log('localStorage-token: ', token)
    if(!token){
        token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3ODI2OTU1NH0.wI72vtXrCgvL8gH1QHDdQSjxkVC35eYDDXzgW7kFY66iYFWnY_VbbN5IGhk1kX_FH2ZJXW90fozVILyxa7fKNw";
    }
    console.log(`req start ... ${req.method} ${req.url}`);
    console.log('request header token: ', token)
    if (token) {
        req.headers.setAuthorization(token);
    }
    return req;
});

// response
axios.interceptors.response.use(res => {
    console.log(res.data);
    if (res.data.status === 200) {
        return res;
    }
    return Promise.reject(res.data.message);
});

function get(url: string, param?: any) {
    const fullUrl = paramToUrl(url, param);
    return new Promise((resolve, reject) => {
        axios.get(fullUrl, {})
            .then(res => {
                resolve(res);
            }).catch(err => {
            reject(err);
        });
    });
}

function postJson(url: string, param?: any) {
    const jsonObj = JSON.stringify(param);
    return new Promise((resolve, reject) => {
        axios.post(url, jsonObj, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
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