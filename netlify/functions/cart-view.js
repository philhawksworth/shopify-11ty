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
    return `
    <tr>
    <td>${item.merchandise.product.title} ${displayTitleModifier}</td>
    <td>${item.merchandise.priceV2.amount}</td>
    <td>${item.quantity}</td>
    <td>${ itemTotal(item.merchandise.priceV2.amount ,item.quantity) }</td>
    <td>
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
    <main>
      <header>
        <h1>Shoperoni</h1>
        <h2>Shop for literally the best products in the world, right here.</h2>
      </header>
      <a class="home" href="/">Go back</a>
      <table>
        <thead>
          <th>Item</th> 
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </thead>
        <tbody>
        ${items}
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${totals.amount} ${totals.currencyCode}</td>
        </tr>
        </tbody>
        </table>
      </main>
      <script src="/js/shopping-ui.js"></script>
    </body>
    </html>
    `};
    
  return {
    statusCode: 200,
    body: pageTemplate(items, result.cart.estimatedCost.totalAmount)
  };

}