import { getRequestUrl } from "./miscellaneous/mics";
import axios from "axios";
const SERVER_REQUEST_URL = getRequestUrl()

function callApi(options, headers) {
    options.data = {name:options.name,params:options.params};
    options.url = `${SERVER_REQUEST_URL}/v1/intercept`;
    options.method = 'post';
    options.headers = options.headers ? { ...options.headers, ...headers } : headers;
    console.log(options)
    return axios(options)
        .then(res => Promise.resolve(res.data))
        .catch(error => console.log('error',error));
}

export default async function request(options) {
    let defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        // 'Host': 'default.ndhgo.com'
    };

    let res = "";
    res = callApi(options, defaultHeaders).then((val) => {
        return val
    }).catch(err => console.log(err));
    return res;
}