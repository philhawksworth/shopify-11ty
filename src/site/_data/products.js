const { postToShopify } = require('../../utils/postToShopify');

module.exports = async () => {

  const response = await postToShopify({
    query: `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            handle
            description
            title
            totalInventory
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    variables: null
  });

  return response.products.edges;

};