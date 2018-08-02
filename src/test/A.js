import B from './B.js'

let i = 0

setTimeout(() => {B.buildC('1')}, 1000)
setTimeout(() => {B.buildC('2')}, 500)
setTimeout(() => {B.buildC('3')}, 1500)

displayData()
const timer = setInterval(() => {
  if (i > 3000) {
    clearInterval(timer)
  } else {
    displayData()
    i += 500
  }
}, 500)

function displayData() {
  let array = B.getArray()
  console.log(`array is ${array}`)
}