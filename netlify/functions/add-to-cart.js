const { postToShopify } = require('../../src/utils/postToShopify');
const querystring = require('querystring');


exports.handler = async (event) => {

  // Parse the form submission
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const {
    quantity,
    merchandiseId
  } = querystring.parse(event.body);

  // Add to a shopify cart (creating one if required)
  const response = await postToShopify({
    query: `mutation { createCart($cartInput: CartInput}) {
      cartCreate(input: $cartInput) {
        cart {
          id
          createdAt
          updatedAt
          lines(first:10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          attributes {
            key
            value
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }`,
    variables: `{
      "cartInput": {
        "lines" : [
          {
            "quantity": "${quantity}",
            "merchandiseId": "${merchandiseId}"
          }
        ],
        "attributes": {
          "key": "cart_attribute",
          "value": "Some cart attribute"
        }
      }
    }`
  });

  console.log(response);  

  // Shopify will create a new cart ID if required
  const cardId = "DUMMY"

  // Now that an item was added to the cart, take the user to it.
  // We'll render this dynamically from a serverless function
  return {
    body: "",
    statusCode: 302,
    headers: {
      Location: `/cart?cartId=${cardId}`,
    }
  };


};




