const { default: instance } = require("./axiosClient")

export const addOrders=(payload)=>{
    return instance.post('/user/addOrders',{
        payload
    })
}
