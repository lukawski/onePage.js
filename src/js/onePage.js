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
    var translationValue = 0

    for (let i = 0; i < elementsL; i++) {
      elements[i].style.zIndex = elementsL - i
      elements[i].addEventListener('transitionend', (e) => {
        this.animComplete = true
      })
    }

    window.addEventListener('keydown', (e) => {
      if (!this.animComplete) return

      if ((e.which === 37 || e.which === 39) && elements[nextEl].classList.contains('horizontal')) { // left & right
        if (e.which === 37 && translationValue) {
          console.log(translationValue)
          translationValue -= 1
          elements[nextEl].style.transform = `translate(-${translationValue}00vw, 0)`
        } else if (e.which === 39 && translationValue < elements[nextEl].children.length - 1) {
          translationValue += 1
          elements[nextEl].style.transform = `translate(-${translationValue}00vw, 0)`
        }
      } else if (e.which === 38 || e.which === 40) { // up & down
        if (e.which === 38)
          up.call(this)
        else
          down.call(this)
      } else {
        return
      }
    })

    window.addEventListener('wheel', (e) => {
      if (!this.animComplete) return false
      
      if (e.deltaY > 0) {
        down.call(this)
      } else if (e.deltaY < 0) {
        up.call(this)
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

    function up () {
      if (!nextEl) return false

      this.animComplete = false

      buttons[nextEl].classList.toggle('active')

      nextEl--

      buttons[nextEl].classList.toggle('active')
      elements[nextEl].classList.toggle('outofview')
    }

    function down () {
      if (nextEl === elementsL - 1) return false

      this.animComplete = false

      buttons[nextEl].classList.toggle('active')
      elements[nextEl].classList.toggle('outofview')

      nextEl++

      buttons[nextEl].classList.toggle('active')
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
    const elements = document.querySelectorAll('.section')
    var buttons
    const horizontalElements = document.querySelectorAll('.horizontal')

    if (horizontalElements.length > 1) {
      for (let i = 0; i < horizontalElements.length; i++) {
        let width = horizontalElements[i].children.length * 100
        horizontalElements[i].style.width = `${width}%`
      }
    } else {
      let width = horizontalElements[0].children.length * 100
      horizontalElements[0].style.width = `${width}%`
    }

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
