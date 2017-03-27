class OnePage {
  constructor(options) {
    this.mode = options.mode
    this.animComplete = true
    this.container = options.containerId
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
      
      if (e.deltaY > 0 && nextEl !== elementsL - 1) {        
        this.animComplete = false
        elements[nextEl].classList.toggle('outofview')
        nextEl++
      } else if (e.deltaY < 0 && nextEl) {        
        this.animComplete = false
        nextEl--
        elements[nextEl].classList.toggle('outofview')
      }
    })
  }

  normalMode (container, elements) {
    const maxScrollCount = elements.length - 1
    var translationValue = 0    
    var scrollCount = 0

    container.addEventListener('transitionend', (e) => {
      this.animComplete = true
    })

    window.addEventListener('wheel', (e) => {
      if (!this.animComplete) return false

      if (e.deltaY > 0 && scrollCount !== maxScrollCount) {
        this.animComplete = false
        translationValue += -100
        container.style.transform = `translateY(${translationValue}vh)`
        scrollCount++
      } else if (e.deltaY < 0 && scrollCount) {
        this.animComplete = false   
        translationValue += 100
        container.style.transform = `translateY(${translationValue}vh)`
        scrollCount--
      }
    })
  }

  initPage () {
    var elements = document.querySelectorAll('.section')

    if (!elements.length) return console.error('Couldn\'t fetch elements')

    if (this.mode === 'stack') {
      this.stackMode(elements)
    } else {
      var container = document.querySelector(this.container)
      
      if (container === null) return console.error('Couldn\'t fetch element')

      this.normalMode(container, elements)
    }
  }
}
