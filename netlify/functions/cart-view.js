
exports.handler = async (event) => {

  console.log(event.queryStringParameters);

  const cartId = event.queryStringParameters.cartId;

  return {
    statusCode: 200,
    body: `view of cart with ID: ${cartId}`
  };

}