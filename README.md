# One Page

> Create full page websites and presentations!

## Instalation

`npm install one-page --save`

## Usage

```HTML
<link rel="stylesheet" href="onePage.min.css">
<script src="onePage.min.js"></script>
```

You can choose one of two modes: **stack** or **normal**.

### Stack mode

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

### Normal mode

#### HTML markup

```HTML
<section class="section-stack">1</section>
<section class="section-stack">2</section>
<section class="section-stack">3</section>
<section class="section-stack">4</section>
```

#### JavaScript

```javascript
const page = new OnePage({
  mode: 'stack'
})
page.initPage()
```