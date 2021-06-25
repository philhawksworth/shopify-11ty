const fetch = require( 'node-fetch');
const shopUrl = "https://netlify-demo.myshopify.com";
const storefront_access_token = "b98313b8d60c1d61649070cc78cc41da"; // Safe to share. This is read-only. Not secret.

// Assemble the graphql query to fetch info all teh products
const query = `{
  products(sortKey: TITLE, first: 100) {
    edges {
      node {
        id
        handle
        description
        title
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
}`;


module.exports = async () => {

  return await fetch(shopUrl + `/api/graphql`, {
    method: "post",
    headers: {
      "Content-Type": "application/graphql",
      "X-Shopify-Storefront-Access-Token": storefront_access_token
    },
    body: query
  })
  .then(res => res.json())
  .then(response => {
    return response.data.products.edges;
  });

};