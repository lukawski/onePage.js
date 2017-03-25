class OnePage {
  constructor(options) {
    this.mode = options.mode
    this.animComplete = true
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
      if (!this.animComplete) return false
      
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

  normalMode (container) {
    var translationValue = 0

    container.addEventListener('transitionend', (e) => {
      this.animComplete = true
    })

    window.addEventListener('wheel', (e) => {
      if (!this.animComplete) return false

      if (e.deltaY > 0) {        
        this.animComplete = false
        translationValue += -100
        container.style.transform = `translateY(${translationValue}vh)`
        
      } else {
        this.animComplete = false   
        translationValue += 100
        container.style.transform = `translateY(${translationValue}vh)`
      }
    })
  }

  initPage () {
    if (this.mode === 'stack') {
      var elements = document.querySelectorAll('.section')

      if (!elements.length) return console.error('Couldn\'t fetch elements')

      this.stackMode(elements)
    } else {
      var container = document.querySelector('#container')
      
      if (container === null) return console.error('Couldn\'t fetch element')

      this.normalMode(container)
    }
  }
}
