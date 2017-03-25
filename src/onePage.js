class OnePage {
  constructor(options) {
    this.mode = options.mode
    this.animComplete = true
    console.log(options, this.mode)
  }

  stackMode (elements) {
    const elementsL = elements.length
    var nextEl = 0

    for (let i = 0; i < elementsL; i++) {
      elements[i].style.zIndex = elementsL - i
      elements[i].addEventListener('transitionend', (e) => {
        this.animComplete = true
      })
    }

    window.addEventListener('wheel', (e) => {
      console.log(this.animComplete, this)
      if (!this.animComplete) return false
      console.log('!')
      
      if (e.deltaY > 0) {
        if (nextEl === elementsL - 1) return false
        
        this.animComplete = false
        elements[nextEl].classList.toggle('outofview')
        nextEl++
      } else {
        if (nextEl === 0) return false
        
        this.animComplete = false
        nextEl--
        elements[nextEl].classList.toggle('outofview')
      }
    })
  }

  normalMode (elements) {
    
  }

  initPage () {
    var elements = document.querySelectorAll('.section')

    if (!elements.length) return console.error('Couldn\'t fetch elements')

    this.mode === 'stack' ? this.stackMode(elements) : this.normalMode(elements)
  }
}
