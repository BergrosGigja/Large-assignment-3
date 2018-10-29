const url = "https://basketball-fields.herokuapp.com/api";
const axios = require('axios');

const basketballFieldService = () => {
    function getAllBasketballFields() {
        return axios.get(`${url}/basketball-fields`);
      }
    return {
        getAllBasketballFields
    };
}

module.exports = basketballFieldService();




