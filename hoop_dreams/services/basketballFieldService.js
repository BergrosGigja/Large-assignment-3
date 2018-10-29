const url = "https://basketball-fields.herokuapp.com/api";
const axios = require('axios');

const basketballFieldService = () => {
    const getAllBasketballFields = () => {
        return axios.get(`${url}/basketball-fields`);
    };   
    const getBasketballFieldById = id => {
        return axios.get(`${url}/basketball-fields/${id}`)
    };    

    return {
        getAllBasketballFields,
        getBasketballFieldById,
    };
}

module.exports = basketballFieldService();




