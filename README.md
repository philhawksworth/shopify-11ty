# Shopify Storefront reference with 11ty

A reference site for exploring the Shopify storefront API with Eleventy

Running at https://shopify-11ty.netlify.app/

```
# install the dependencies
npm i

# Run the local dev server during development
netlify dev

# Build the site
npm run build
```

## Environment variables
```conf
SHOPIFY_API_ENDPOINT = "{YOUR SHOPIFY STORE URL}/api/unstable/graphql.json"
SHOPIFY_STOREFRONT_API_TOKEN = "{YOUR SHOPIFY STOREFRONT ACCESS TOKEN}"
```

