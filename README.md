# One Page

> Create full page websites and presentations!

## Installation

`npm install one-page --save`

## To do
- [ ] responsive navbar
- [ ] touch support
- [x] navigating by arrow keys
- [x] horizontal scroll

## Usage

```HTML
<link rel="stylesheet" href="node_modules/one-page/dist/onePage.min.css">
<script src="node_modules/one-page/dist/onePage.min.js"></script>
```

You can choose one of two modes: **stack** or **normal**.

### Normal mode

#### HTML markup

```HTML
<div id="container" class="sections-container">
  <section class="section">1</section>
  <section class="section">2</section>
  <section class="section">3</section>
  <section class="section">4</section>
</div>
```

#### JavaScript

```javascript
const page = new OnePage({
  mode: 'normal',
  containerId: '#container'
})
page.initPage()
```

### Stack mode

#### HTML markup

```HTML
<section class="section stack">1</section>
<section class="section stack">2</section>
<section class="section stack">3</section>
<section class="section stack">4</section>
```

#### JavaScript

```javascript
const page = new OnePage({
  mode: 'stack'
})
page.initPage()
```

### Navbar

You can add navbar to allow navigating through buttons.

#### HTML markup

```HTML
<nav class="navbar">
  <button type="button" class="link">
    1
  </button>
  <button type="button" class="link">
    2
  </button>
  <button type="button" class="link">
    3
  </button>
  <button type="button" class="link">
    4
  </button>
</nav>
```

It is very important that you use excatly same class name for every element.

#### JavaScript

You need to specify additional option during object creation.

```javascript
const page = new OnePage({
  mode: 'stack',
  navbar: true
})
page.initPage()
```