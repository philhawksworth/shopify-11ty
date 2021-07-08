/**
 * Remove Item From Cart API Endpoint
 *
 * * Purpose: Remove a single item from the cart
 * @param {string} cartId
 * @param {string} lineId - Not the item or variant id
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/remove-from-cart, {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 'S9Qcm9kdWN0VmFyaWFudC8zOTc0NDEyMDEyNzY5NA',
 *     lineId: 'RIJC3mn0c862e2fc3314ba5971bf22d73d7accb'
 *   })
 * })
 * ```
 */

const { removeItemFromCart } = require('./utils/removeItemFromCart')
const querystring = require("querystring");

exports.handler = async (event) => {
  
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { cartId, lineId } = querystring.parse(event.body)
  try {
    console.log('--------------------------------')
    console.log('Removing item from cart...')
    console.log('--------------------------------')
    const shopifyResponse = await removeItemFromCart({
      cartId,
      lineId,
    })

    return {
      statusCode: 302,
      headers: {
        Location: `/cart/?cartId=${cartId}`,
      },
    }

  } catch (error) {
    console.log(error)
  }
}
