import { getRequestUrl } from "./miscellaneous/mics";
import axios from "axios";
const SERVER_REQUEST_URL = getRequestUrl()

function callApi(options, headers) {
    options.url = `${SERVER_REQUEST_URL}/api/${options.url}`;
    // options.url = `http://34.93.193.139/${options.url}`;
    options.headers = options.headers ? { ...options.headers, ...headers } : headers;
    options.body = options.params;
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