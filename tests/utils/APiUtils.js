class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    //get token from login
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        console.log('LOGIN STATUS:', loginResponse.status());
        const loginResponseJson = await loginResponse.json();
        console.log('LOGIN BODY:', loginResponseJson);
    
        if (!loginResponse.ok()) {
            throw new Error(`Login failed: ${loginResponse.status()} ${JSON.stringify(loginResponseJson)}`);
        }
    
        const token = loginResponseJson.token;
        if (!token) {
            throw new Error(`Login did not return a token. Body: ${JSON.stringify(loginResponseJson)}`);
        }
    
        console.log('TOKEN:', token);
        return token;
    }
 
    //create order
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        console.log(orderId);
        response.orderId = orderId;
 
        return response;
    }
}
 
//require for importing this util file
module.exports = { APiUtils };