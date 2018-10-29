var request = require('request');
let url = "https://basketball-fields.herokuapp.com/api";

const basketballFieldService = () => {
    function getAllBasketballFields() {
        return axios.get(`${url}/basketball-fields`);
      }
    return {
        getAllBasketballFields
    };
}

module.exports = basketballFieldService();




