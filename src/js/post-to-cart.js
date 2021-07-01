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

      console.log(data);
      
      displayCartSummaryDetails(data.cart.lines.edges.length, data.cart.id);
    });
  }
}

// Update the UI with latest cart info
function displayCartSummaryDetails(count, id) {
  const cartLink = document.getElementsByClassName('cartLink')[0];
  cartLink.innerHTML = `Cart (${count})`;

  cartLink.href = `/cart/?cartId=${id}`;
}



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



function postToCart(event) {
  
  event.preventDefault();
  const inputs = event.target.elements; 
  const data = {
    cartId: inputs['cartId'].value,
    itemId: inputs['merchandiseId'].value,
    quantity: inputs['quantity'].value,
  };
  
  postData('/api/add-to-cart', data)
  .then(data => {
    console.log(data);

    // persist that cartId for subsequent actions
    localStorage.setItem('shopifyCartId', data.id);
    displayCartSummaryDetails(data.lines.edges.length, data.id);
  });


    // get the data
    // fetch('/api/add-to-post', data).then(function(response) {
    //   return response.json();
    // }).then(function(response) {
    //  console.log("cart response", response);
     
    // });


  // const cartResponse = await this.$http.$post('/api/add-to-cart', {
  //   cartId: this.cartId,
  //   itemId: this.selectedProductId,
  //   quantity: 1,
  // })
  


};



// // Add a submit handler to any forms.
// // Don't allow null submissions of required fields
// (function(){
//   var forms = document.querySelectorAll('form');
//   if(forms.length == 0){ return;}

//   // do this for all forms on the page
//   for (var f = 0; f < forms.length; f++) {
//     forms[f].addEventListener('submit', function(event) {
//       event.preventDefault();
//       var form = event.target;

//       // reset any flags
//       var flags = form.querySelectorAll('.needs-content');
//       for (var f = 0; f < flags.length; f++) {
//         flags[f].classList.remove('needs-content');
//       }

//       // flag any fields which are missing input
//       var inputs = form.querySelectorAll('input');
//       for (var i = 0; i < inputs.length; i++) {
//         flagIfEmpty(inputs[i]);
//       }
//       var text = form.querySelectorAll('textarea');
//       for (var t = 0; t < text.length; t++) {
//         flagIfEmpty(text[t]);
//       }

//       // abort if there are flagged fields (other than the honeypot)
//       // otherwise we can submit.
//       flags = form.querySelectorAll('.needs-content');
//       if(flags.length > 1) {
//         return false;
//       } else {
//         form.submit();
//       }

//     }, false);
//   }
// })();
