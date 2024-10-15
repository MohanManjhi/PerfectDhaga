// fetch('/cart', {
//     method: 'GET',
//     credentials: 'include' // Ensure cookies are sent
//   })
//     .then(response => response.json())
//     .then(cartItems => {
//       // Update the UI with cart items
//       const cartContainer = document.getElementById('cart-container');
//       cartContainer.innerHTML = ''; // Clear previous content
  
//       cartItems.forEach(item => {
//         const totalItemPrice = (parseFloat(item.fabricPrice) + parseFloat(item.designPrice)).toFixed(2);
  
//         const cartItem = `
//           <div class="cart-item">
//             <h3>${item.designTitle} - ${item.fabricName}</h3>
//             <p>Quantity: ${item.quantity}</p>
//             <p>Fabric Price: Rs. ${item.fabricPrice}</p>
//             <p>Design Price: Rs. ${item.designPrice}</p>
//             <p>Total Item Price: Rs. ${totalItemPrice}</p>
//           </div>
//         `;
//         cartContainer.innerHTML += cartItem;
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching cart items:', error);
//     });
  