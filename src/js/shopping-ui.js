(function(){

  getCartSummaryDetails();
  
  const forms = document.getElementsByClassName('addToCart');
  for (var f = 0; f < forms.length; f++) {
    // add form event listeners
    forms[f].addEventListener('submit', postToCart);

    // if we have a cartId stashed, we should add it to any cart form on this page
    forms[f].elements['cartId'].value = localStorage.getItem('shopifyCartId') || "";
    
  }
})();


// fetch cart data from the API
function getCartSummaryDetails() {
  if (localStorage.getItem('shopifyCartId')){
    postData('/api/get-cart', {
      'cartId': localStorage.getItem('shopifyCartId')
    })
    .then(data => { 
      if(data.cart) {
        displayCartSummaryDetails(data.cart.lines.edges.length, data.cart.id);
      }
      else {
        //clear a local cart if it has expired with Shopify
        localStorage.removeItem('shopifyCartId');
      }
    });
  } else {
    console.log(`No shopping cart yet`);
  }
}


// Update the UI with latest cart info
function displayCartSummaryDetails(count, id) {
  const cartLink = document.getElementsByClassName('cartLink')[0];
  const cartSize = document.getElementsByClassName('cart-size')[0];
  if (cartLink) {
    cartLink.href = `/cart/?cartId=${id}`;
  }
  if (cartSize) {
    cartSize.innerHTML = `${count}`;
  }
}


// dispatch post requests
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}


// Send an item to the cart API
function postToCart(event) {
  event.preventDefault();
  const inputs = event.target.elements; 
  const data = {
    cartId: inputs['cartId'].value == "undefined" ? null : inputs['cartId'].value,
    itemId: inputs['merchandiseId'].value,
    quantity: inputs['quantity'].value,
  };

  postData('/api/add-to-cart', data)
  .then(data => {
    // persist that cartId for subsequent actions
    localStorage.setItem('shopifyCartId', data.id);
    // update the cart ;abel in the navigation
    displayCartSummaryDetails(data.lines.edges.length, data.id);
  });
};
