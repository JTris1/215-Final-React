# 215 Final

### Written in ReactJS
I tried to learn ReactJS for this assigment because it offered a lot of useful things that pertain to creating and destroying elements. I could not find equivalent features of VueJS, so I abandoned it pretty quickly.

### What Works
<ul>
  <li>Instrument rendering</li>
  <li>Color change on hover</li>
  <li>Popup for each item</li>
  <li>Add to cart feature</li>
  <li>Store is empty message</li>
</ul>

### What Doesn't Work
<ul>
  <li>Remove all items from cart</li>
    <ul><li>Tried to figure this one out, but couldn't. Ended up leaving it at an inline button that removes each item clicked.</li></ul>
  <li>Add Item</li>
    <ul><li>The popup form works fine, but for whatever reason I cannot get the item to render. I think it is because I am conditionally rendering the popup, so when it gets closed (unrendered), the Item, which becomes a child of Popup, is also unrendered. Not sure if this is the case for sure, but without knowing more about React I have no idea how to try and solve this. Spent way too long trying to make it work so I gave up.</li></ul>
    <ul><li>I think that if it actually did render the Item correctly, it would render all relevant information fine, and would contain all the required functionality, such as add to cart, hover, and popup.</li></ul>
</ul>

## Important Note
The master branch houses the source code for React. The production build, what is hosted by Pages, is found in the 'gh-pages' branch.
