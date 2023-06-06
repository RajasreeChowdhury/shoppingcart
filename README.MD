## Introduction

The aim of this problem is for you to solve the shopping cart problem using React's Context API.

### Requirements.

1. The page displays a Cart and Products where everything is hardcoded to begin with. Replace the hardcoded products with the products coming from the ShopContext where each product has a `title`, `description`, `price` and `stock` attributes.
2. You don't need to display the `stock` of the product but you have to disable the `Add To Cart` button for a product if it's `stock` is `0`.
3. The `Cart` should be initially empty with a total of `$0.00`. Clicking on `Add To Cart` button will add 1 quantity of the product to cart and show it as a line item. The stock should be updated when this happens and the `Add To Cart` button disabled if the stock becomes `0`.
4. If another similar product is added to cart, the quantity in the cart's line item should increase and the price of the line item should reflect the change in quantity. The total should reflect the total price of all line items in the cart.
5. The quantity of line items in the cart can be incremented or decremented by clicking on the `+` or `-` buttons respectively. When clicking on the decrement button, if the the quantity of a line item becomes 0, it should be removed from the cart.
6. The increment button should be disabled if there are no more products in stock to be added to the cart.

### Instructions

1. You don't need to integrate any UI library or work on the UI. You just have to work on the shopping cart functionality.
2. Use the `context` provided via the `ShopContext` in the src/shop.js file, for global state management.
3. The app is completely in a single page. So, no routing library is necessary. Infact, no other packages should be added.
4. The tests are not completely setup so don't bother running the tests. Just ignore the Tests tab.