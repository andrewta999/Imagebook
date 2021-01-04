let get_data = async (url) => {
    let data = await fetch(url)
    let data_json = await data.json()
    return data_json
}

let get_data_token = async (url, token) => {
    let data = await fetch (url, {
        method: "GET", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    })
    let data_json = await data.json()
    return data_json 
}

let post_data = async (url, data) => {
    let raw_data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let json_data = await raw_data.json()
    return json_data
}

let post_data_token = async (url, data, token, is_json) => {
    let body_data
    if (is_json){
        body_data = JSON.stringify(data)
    }else{
        body_data = data 
    }

    let raw_data = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: body_data
    })
    let json_data = await raw_data.json()
    return json_data
}

let delete_data = async (url, token) => {
    let result = await fetch(url, {
        method: 'DELETE', 
        headers: { 
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json' 
        }
    })
    await result.json()
}

export {get_data, post_data, post_data_token, get_data_token, delete_data}