class OnePage {
  constructor(options) {
    this.animComplete = true
    this.mode = options.mode
    this.container = options.containerId
    this.navbar = options.navbar || false
  }

  stackMode (elements, buttons) {
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

        buttons[nextEl].classList.toggle('active')
        elements[nextEl].classList.toggle('outofview')

        nextEl++
        
        buttons[nextEl].classList.toggle('active')
      } else if (e.deltaY < 0 && nextEl) {        
        this.animComplete = false

        buttons[nextEl].classList.toggle('active')

        nextEl--
        
        buttons[nextEl].classList.toggle('active')
        elements[nextEl].classList.toggle('outofview')
      }
    })
    
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        if (!this.animComplete) return false

        buttons[nextEl].classList.toggle('active')
        buttons[i].classList.toggle('active')
        
        if (i > nextEl && nextEl !== elementsL - 1) {        
          this.animComplete = false

          for (let j = nextEl; j < i; j++) {
            elements[j].classList.toggle('outofview')
          }

          nextEl = i
        } else if (i < nextEl && nextEl) {    
          this.animComplete = false

          for (let j = nextEl - 1; j >= i; j--) {
            elements[j].classList.toggle('outofview')
          }

          nextEl = i
        }
      })
    }
  }

  normalMode (container, elements, buttons) {
    const maxScrollCount = elements.length - 1
    var translationValue = 0    
    var scrollCount = 0
    var nav = document.querySelector('.navbar')

    container.addEventListener('transitionend', (e) => {
      this.animComplete = true
    })

    window.addEventListener('wheel', (e) => {
      if (!this.animComplete) return false      

      if (e.deltaY > 0 && scrollCount !== maxScrollCount) {
        this.animComplete = false

        translationValue += -100

        buttons[scrollCount].classList.toggle('active')
        nav.style.transform = `translateY(${Math.abs(translationValue)}vh)`
        container.style.transform = `translateY(${translationValue}vh)`

        scrollCount++
        buttons[scrollCount].classList.toggle('active')
      } else if (e.deltaY < 0 && scrollCount) {
        this.animComplete = false

        translationValue += 100

        buttons[scrollCount].classList.toggle('active')
        nav.style.transform = `translateY(${Math.abs(translationValue)}vh)`
        container.style.transform = `translateY(${translationValue}vh)`

        scrollCount--
        buttons[scrollCount].classList.toggle('active')
      }
    })

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        if (!this.animComplete) return false

        var comp = i * -100;


        if (comp > translationValue) {
          this.animComplete = false

          translationValue = comp

          buttons[scrollCount].classList.toggle('active')
          nav.style.transform = `translateY(${Math.abs(translationValue)}vh)`
          container.style.transform = `translateY(${translationValue}vh)`

          scrollCount = i

          buttons[scrollCount].classList.toggle('active')
        } else if (comp < translationValue) {
          this.animComplete = false

          translationValue = comp

          buttons[scrollCount].classList.toggle('active')
          nav.style.transform = `translateY(${Math.abs(translationValue)}vh)`
          container.style.transform = `translateY(${translationValue}vh)`

          scrollCount = i

          buttons[scrollCount].classList.toggle('active')
        }
      })
    }
  }

  initPage () {
    var elements = document.querySelectorAll('.section')
    var buttons

    if (!elements.length) return console.error('Couldn\'t fetch elements')

    if (!this.mode) return console.error('You need to specify mode')

    if (this.navbar) {
      buttons = document.querySelectorAll('.link')
    }

    if (this.mode === 'stack') {
      this.stackMode(elements, buttons)
    } else if (this.mode === 'normal') {
      let container = document.querySelector(this.container)
      
      if (container === null) return console.error('Couldn\'t fetch element')

      this.normalMode(container, elements, buttons)
    } else {
      return console.error('Unknown mode value')
    }
  }
}
