import request from '../request';

let baseURL = "";


export let findObjectMaster = () => {
	return request({url: baseURL + "/object/" + id})
        .then(data => data = JSON.parse(data))
}

export let findObjects = (values) => {
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    return request({url: baseURL + "/object" + qs})
        .then(data => data = JSON.parse(data))
}

export let findObjectId = (req) => {
	var id = parseInt(req.id);
    return request({url: baseURL + "/api/object/" + id})
        .then(data => data = JSON.parse(data))
}