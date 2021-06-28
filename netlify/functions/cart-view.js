const { postToShopify } = require('../../src/utils/postToShopify');


exports.handler = async (event) => {

  const cartId = event.queryStringParameters.cartId;

  // GraphQL prepped for when we have a cart to query for

  // const response = await postToShopify({
  //   query: `cart(${cartId}) 
  //     id
  //     createdAt
  //     updatedAt
  //     lines(first:20) {
  //       edges {
  //         node {
  //           id
  //           quantity
  //           merchandise {
  //             ... on ProductVariant {
  //             id
  //           }
  //         }
  //         attributes {
  //           key
  //           value
  //         }
  //       }
  //     }
  //   }
  //   attributes {
  //     key
  //     value
  //   }
  //   estimatedCost {
  //     totalAmount {
  //       amount
  //       currencyCode
  //     }
  //     subtotalAmount {
  //       amount
  //       currencyCode
  //     }
  //     totalTaxAmount {
  //       amount
  //       currencyCode
  //     }
  //     totalDutyAmount {
  //       amount
  //       currencyCode
  //     }
  //   }
  //   buyerIdentity {
  //     email
  //     phone
  //     customer {
  //       id
  //     }
  //     countryCode
  //   }
  //   `,
  //   variables: null
  // });



  return {
    statusCode: 200,
    body: `view of cart with ID: ${cartId}`
  };

}