document.addEventListener('DOMContentLoaded', function (e) {  
  var animComplete = true
  var elements = document.querySelectorAll('.section')
  var elementsL = elements.length
  var nextEl = 0
  
  /*window.addEventListener('wheel', function (e) {
    document.querySelector('.flex').style.transform = 'translateY(-100vh)'
  })*/

  for (let i = 0; i < elementsL; i++) {
    elements[i].style.zIndex = elementsL - i
    elements[i].addEventListener('transitionend', function (e) {
      animComplete = true
    })
  }
  
  window.addEventListener('wheel', function (e) {
    if (!animComplete) return false
    
    if (e.deltaY > 0) {
      if (nextEl === elementsL - 1){
       return false
      }
      
      animComplete = false
      elements[nextEl].classList.toggle('outofview')
      nextEl++
    } else {
      if (nextEl === 0) {
       return false
      }
      
      animComplete = false
      nextEl--
      elements[nextEl].classList.toggle('outofview')
    }
  })
})