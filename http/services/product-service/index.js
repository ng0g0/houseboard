import request from '../request';

let baseURL = "";


export let findBlockList = (req) => {
	var id = parseInt(req.id);
    return request({url: baseURL + "/api/block/" + id})
        .then(data => data = JSON.parse(data))
}

export let addBlock = () => {
    console.log()
    return request({url: baseURL + "/api/blocks", method: "POST"})
        .then(data => data = JSON.parse(data))
}