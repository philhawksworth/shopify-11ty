const fetch = require('node-fetch');


exports.handler = async (event) => {

  const rootURL = process.env.URL || "https://localhost:8888";

  const cartId = event.queryStringParameters.cartId;
  const result = await fetch(`${rootURL}/api/get-cart`, {
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
  

  const itemTotal = function(price, quantity) {
    const totalPrice = Number(price) * Number(quantity)
    return totalPrice.toFixed(2)
  }


  const cartItem = (cartId, item) => {
    const displayTitleModifier = item.merchandise.title == "Default Title" ? "" : item.merchandise.title;
    return ` <tr class="cart-table-row">
    <td class="cart-table-cell">
      <a href"=/products/${item.merchandise.product.handle}">
        ${ item.merchandise.product.title } (${ item.merchandise.title })
      </a>
    </td>
    <td class="cart-table-cell">
      ${item.merchandise.priceV2.amount}
    </td>
    <td class="cart-table-cell">${ item.quantity }</td>
    <td class="cart-table-cell">
      ${ itemTotal(item.merchandise.priceV2.amount, item.quantity) }
    </td>
    <td class="cart-table-cell">
      <form action="/api/remove-from-cart" method="POST">
        <input type="hidden" name="cartId" value="${cartId}">
        <input type="hidden" name="lineId" value="${item.id}">
        <input type="submit" value="Remove item">
      </form>
    </td>
  </tr>
`};
  
  let items = "";
    result.cart.lines.edges.forEach(item => {
    items += cartItem(result.cart.id, item.node)
  });


  const pageTemplate = (items, totals) => {return `
  <html>
  <head>
    <link rel="stylesheet" href="/css/main.css">
    <title>Your Cart</title>
  </head>
  <body>
  
    <header class="app-header">
      <h1>Shoperoni</h1>
      <nav class="main-nav">
        <ul>
          <li class="main-nav-item">
            <a href="/">All<a>
          </li>
          <li class="main-nav-item">
            <a href="/?type=cheese">Cheeses<a>
          </li>
          <li class="main-nav-item">
            <a href="/?type=meat">Meats<a>
          </li>
          <li class="main-nav-item">
            <a href="/?type=boards">Boards<a>
          </li>
          <li class="main-nav-item">
            <div class="cart-size"></div>
            <a href="/cart" class="cart cartLink">Shopping Cart</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="cart-page">
      <article class="cart-page-content">
        <h1>Your Cart</h1>
        <div>
        <table class="cart-table">
        <thead>
          <th class="cart-table-heading">Item</th>
          <th class="cart-table-heading">Price</th>
          <th class="cart-table-heading">Quantity</th>
          <th class="cart-table-heading">Total</th>
          <th class="cart-table-heading">Actions</th>
        </thead>
        <tbody>
        ${items}
        
        </tbody>
        </table>
        <section class="cart-total">
        <div class="cart-total-content">
          <div class="cart-total-column">
            <p>
              <strong>Subtotal:</strong>
            </p>
            <p>Shipping:</p>
            <p>Tax:</p>
            <p>Total:</p>
          </div>
          <div class="cart-total-column">
            <p>
              <strong>${totals.subtotalAmount.amount} ${totals.totalAmount.currencyCode} </strong>
            </p>
            <p>Free Shipping</p>
            <p>${totals.totalTaxAmount.amount} ${totals.totalAmount.currencyCode} </p>
            <p>${totals.totalAmount.amount} ${totals.totalAmount.currencyCode} </p>
          </div>
        </div>
      </section>
        </div>
      </article>
    </div>
    </main>
    <footer>
      <section class="testimonial">
        <h2>
          "The interplay of flavors between the cheese, meats and fruits is an
          absolute delight."
        </h2>
        <p>Paul Hotcakes</p>
      </section>
      <section class="app-footer-links">
        <ul>
          <li>About</li>
          <li>Company</li>
          <li>Locations</li>
          <li>Contact</li>
          <li>Hours</li>
        </ul>
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
        <div class="newsletter">
          <h2 class="newsletter-title">Sign up for our newsletter:</h2>
          <input
            class="newsletter-input"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </section>
  
      <div class="project-credit">
        <p>
          This project is
          <a href="https://github.com/philhawksworth/shopify-11ty">open source on GitHub </a>,
          hosted with <a href="https://bit.ly/2G29YwK">Netlify</a>, built with
          <a href="https://11ty.dev/">Eleventy</a>
          and made with 💚 by Phil Hawksworth (<a href="https://twitter.com/philhawksworth">@philhawksworth</a>)
        </p>
      </div>
    </footer>
    <script src="/js/shopping-ui.js"></script>
  </body>
  </html>
  `};
    
  return {
    statusCode: 200,
    body: pageTemplate(items, result.cart.estimatedCost)
  };

}