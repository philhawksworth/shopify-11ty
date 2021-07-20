# Shopify Storefront reference with 11ty

A reference site for exploring the Shopify storefront API with Eleventy

Running at https://shopify-11ty.netlify.app/
Blogged at https://www.netlify.com/blog/



```
# install the dependencies
npm i

# Run the local dev server during development
netlify dev

# Build the site
npm run build
```

## Clone and deploy

Make a copy of this site and deploy it for free to Netlify by clicking this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/shopify-11ty)


## Environment variables

This example site is preconfigured with the following environment variable (via the netlify.toml file) since these variables are safe to share. To customise this example to point at your own store in Shopify, you'll need to update these to your own values.

```conf
SHOPIFY_API_ENDPOINT = "{YOUR SHOPIFY STORE URL}/api/unstable/graphql.json"
SHOPIFY_STOREFRONT_API_TOKEN = "{YOUR SHOPIFY STOREFRONT ACCESS TOKEN}"
```

