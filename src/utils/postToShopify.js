const fetch = require('node-fetch');

require('dotenv').config();

exports.postToShopify = async ({ query, variables }) => {
  try {
    const result = await fetch(process.env.SHOPIFY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    }).then(res => { 
      return res.json();
    });

    if (!result || !result.data) {
      return false;
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};