## Html Decomposer

For any element with a class of component, create a new web component (template, view model) 
with the name as defined by the ID 
class="component" id="myNavWrapper

```html
<div class="nav-wrapper container component" id="myNavWrapper" data-pg-name="TopMenu" title="Blip">
    <a id="logo-container" href="#" class="brand-logo">Logo</a>
    <ul class="right hide-on-med-and-down">
        <li>
            <a href="#">Navbar Link</a>
        </li>
    </ul>
    <ul id="nav-mobile" class="side-nav">
        <li>
            <a href="#">Navbar Link</a>
        </li>
    </ul>
    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
</div>
```

- Replace all static text with string interpolation variables
- Remove the id attribute of the container

The above becomes:

`MyNavWrapper.vue`

```html
<template>
  <div class="nav-wrapper container component" data-pg-name="TopMenu" title="Blip">
      <a id="logo-container" href="#" class="brand-logo">{{logo}}</a>
      <ul class="right hide-on-med-and-down">
          <li>
              <a href="#">{{navbarLink}</a>
          </li>
      </ul>
      <ul id="nav-mobile" class="side-nav">
          <li>
              <a href="#">{{navbarLink}}</a>
          </li>
      </ul>
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">{{menu}}</i></a>
  </div>
</template>
```

```js
<script>
export default {
  data: {
    navbarLink: 'Navbar Link',
    menu: 'Menu'
    logo: 'Logo'
  }
}
</script>
```

This way we can use Pinegrow to quickly create a visual prototype which can be turned into `.vue` components.