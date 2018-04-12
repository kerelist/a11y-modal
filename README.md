# a11y-modal
A vanilla js, accessible, lightweight modal that can be dropped into any project.

## usage
Include `modal.js` in your global scrips, on the page, or in your component, depending on your build structure. 

The modal needs to be initialized with three parameters:

`exitButton` {Elem} - Element that, when clicked, should close the modal
`modal` {Elem} - The modal display element (whole container)
`bodyOverlay` {String} - Name of the class applied to an overlay div (overlay style controlled manually by CSS)

The included init script runs with `initModal(modal.exit, modal.container, modal.overlay);`; these variables can be seen/set at the top of the file.

## example html
For optimal usage, HTML similar to the below (note specific IDs) should be included at the bottom of your page but within the body.

```
<div id="global-modal" class="global-modal" role="alertdialog" aria-labelledby="global-modal__title">
  <!-- MODAL CONTENT, WHICH SHOULD INCLUDE: -->
  <h2 id="global-modal-title"><!-- Title here --></h2>
</div>
```

Should you want the modal to be user-activated rather than time-dependent, remove the `setTimeout()` from the bottom of the file and modify the HTML to the following:

```
<div id="global-modal" class="global-modal" aria-labelledby="global-modal__title">
  <!-- MODAL CONTENT, WHICH SHOULD INCLUDE: -->
  <h2 id="global-modal-title"><!-- Title here --></h2>
</div>
```

## example SASS

Some example SASS to use with the included --active flags (following BEM) is as follows. Note it includes CSS animations and viewport units:

```
.global-modal {
  width: 735px;
  max-width: 100%;
  background-color: #fff;
  position: fixed;
  display: none;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 700;
  opacity: 0;
  transition: 1000;
  box-shadow: 0px 2px 55px rgba(83, 83, 83, .3);
  border-top: 4px solid black;
  padding: 10px;
  text-align: center;

  h2 {
    padding-top: 0;
  } 

  form {
    margin-top: 10px;
  }

  label {
    display: block;
    font-family: Arial, serif;
    font-size: 1.8rem;
  }

  &.global-modal--active {
    display: block;
    animation: fadeIn 0.3s ease-in 1 forwards;
  }
  .global-modal__exit {
    position: absolute;
    right: 10px;
    top: -10px;
    display: inline-block;
    border-radius: 100%;
    background-color: gray;
    width: 44px;
    height: 44px;
    transition: background-color 0.2s ease;
    color: black;
    &:hover,
    &:focus {
      background-color: gray;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: white;
  opacity: 0.6;
  overflow: hidden;
  z-index: 600;
  display: none;
  &.modal-overlay--active {
    display: block;
    animation: fadeIn85 0.3s ease-in 1 forwards;
  }
}
@keyframes fadeIn {
  to {
    opacity: 1
  }
}
@keyframes fadeIn85 {
  to {
    opacity: 0.85
  }
}
```