// Modal
const modalBtn = document.querySelector(".modal-btn");
const modalOverlay = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".close-btn")
//listen for click events on modal-btn and close-btn
modalBtn.addEventListener("click", function (){
// when user clicks modal-btn add .open-modal to modal-overlay
    modalOverlay.classList.add("open-modal");
});
// when user clicks close-btn remove .open-modal from modal-overlay
modalClose.addEventListener('click', function(){
    modalOverlay.classList.remove("open-modal")
})

// Mark Complete or Uncomplete
const goalItem = document.querySelectorAll('not')
const goalComplete = document.querySelectorAll('goal.completed')

Array.from(goalItem).forEach((el) => {
  el.addEventListener('click', markComplete)
})

Array.from(goalComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete)
})

async function markComplete() {
  const goalId = this.parentNode.dataset.id
  try {
    const response = await fetch('goal/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'goalIdFromJSFile': goalId,
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markIncomplete() {
  const goalId = this.parentNode.dataset.id
  try {
    const response = await fetch('goal/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'goalIdFromJSFile': goalId,
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}