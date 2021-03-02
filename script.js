let number = document.getElementById(`number`)
let generateButton = document.getElementById(`generateButton`)
let box = document.getElementById(`box`)
let messageParagraph = document.getElementById(`messageParagraph`)

generateButton.addEventListener(`click`, generate)

number.addEventListener(`keydown`, keyPressed)
number.focus()

function generate() {
  let numberValue = number.value.trim()

  if (numberValue != `` && !isNaN(numberValue)) {
    if (numberValue < 1 || numberValue > 25) {
      box.innerHTML = ``
      messageParagraph.innerHTML = `Number of squares must be between 1 and 25.`
    }
    else {
      box.innerHTML = ``
      messageParagraph.innerHTML = ``

      for (let i = 0; i < numberValue; i++) {
        let square = document.createElement(`div`)
        square.classList.add(`square`)

        if (i < numberValue - 1) {
          square.innerHTML = Math.floor(Math.random() * 4)
        }
        else {
          square.innerHTML = `End`
        }

        box.appendChild(square)
      }

      findSolution()
    }
  }
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    generate()
  }
}

function findSolution() {
  let successPath = jump(0, [])

  if (successPath) {
    for (let square of successPath) {
      square.classList.add("highlighted")
    }

    messageParagraph.innerHTML = `Solution highlighted in blue`
  }
  else {
    messageParagraph.innerHTML = `No solution`
  }
}

function jump(toIndex, path) {
  let square = box.children[toIndex]

  if (!square) {
    return null
  }

  path.push(square)

  if (square == box.lastElementChild) {
    return path
  }

  let maxJump = Number(square.innerHTML)

  for (let i = maxJump; i > 0; i--) {
    let successPath = jump(toIndex + i, path.slice())

    if (successPath) {
      return successPath
    }
  }

  return null
}