const fetch = require('node-fetch');


exports.handler = async (event) => {

  const cartId = event.queryStringParameters.cartId;
  const result = await fetch('http://localhost:8888/api/get-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartId: cartId
    }),
  })
  .then((res) =>{
    return res.json()
  });
  
  console.log(result);


    

  return {
    statusCode: 200,
    body: `view of cart with ID: ${result.cart.id}, items: ${result.cart.lines.edges.length}`
  };

}