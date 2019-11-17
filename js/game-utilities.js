export function generateElement(element) {
  return document.createElement(element);
}

export function addAttribute(selector, attribute, value) {
  const element = document.querySelector(selector);
  element.setAttribute(attribute, value);
}

export function modifyAttribute(selector, attribute, value) {
  const element = document.querySelector(selector);
  element.attribute = value;
}

export function shuffle(arr) {
  const shuffledArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    let index = Math.floor(Math.random() * arr.length);
    if (!shuffledArray.includes(arr[index])) {
      shuffledArray.push(arr[index]);
    } else {
      i -= 1;
    }
  }
  return shuffledArray;
}

export function extractNumbers(str) {
  let numString = '';
  for (const char of str) {
    if (Number(char) % 1 === 0) {
      numString += char;
    }
  }
  return numString.length === 0 ? null : Number(numString);
}

export function getPlayerName(playerDomNode) {
  return playerDomNode.val() === ''
    ? playerDomNode.attr('placeholder')
    : playerDomNode.val();
}

export function getPlayerAvatarDetails(playerSelection, arr) {
  const playerOptions = {};
  for (const obj of arr) {
    if (extractNumbers(playerSelection.attr('id')) === obj.id) {
      playerOptions.avatarId = obj.id;
      playerOptions.mainImgUrl = obj.imgUrl;
      playerOptions.miniImgUrl = obj.miniImgUrl;
    }
  }
  return playerOptions;
}

export function generateUniqueRandomItems(arr, num = 1) {
  if (num > arr.length) {
    num = arr.length;
  }
  const generatedItems = [];
  while (generatedItems.length !== num) {
    const randomItem = arr[Math.floor(Math.random() * arr.length)];
    if (!generatedItems.includes(randomItem)) {
      generatedItems.push(randomItem);
    }
  }
  return generatedItems;
}

// Max not included
export function generateUniqueRandomNumbers(
  min = 0,
  max = 1,
  num = 1,
  excludeNumbers = []
) {
  if (min > max) {
    min = max;
  }

  if (num > max - min) {
    num = max - min;
  }
  if (num + excludeNumbers.length > max - min) {
    num -= excludeNumbers.length;
    console.error(
      `Based on your inputs, only ${num} unique random numbers can be generated.`
    );
  }

  const generatedNumbers = [];
  while (generatedNumbers.length !== num) {
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (
      !generatedNumbers.includes(randomNumber) &&
      !excludeNumbers.includes(randomNumber)
    ) {
      generatedNumbers.push(randomNumber);
    }
  }

  return generatedNumbers;
}

export function getAvailablePlayerStartPositions() {
  const playerOnePositions = [];
  for (let i = 0; i < 45; i += 1) {
    playerOnePositions.push(i);
    if (playerOnePositions.length % 5 === 0) {
      i += 5;
    }
  }

  const playerTwoPositions = [];
  for (let i = 55; i < 100; i += 1) {
    playerTwoPositions.push(i);
    if (playerTwoPositions.length % 5 === 0) {
      i += 5;
    }
  }
  return { playerOnePositions, playerTwoPositions };
}

export function getElementPresentPositionIndex(element) {
  const row = element.parentElement.parentElement.children;
  let positionIndex;
  for (const item of row) {
    if (Array.from(item.children).includes(element)) {
      positionIndex = Array.from(row).indexOf(item);
    }
  }
  return positionIndex;
}

export function highlightAvailableSquares(
  squares,
  highlightClass = 'available-move-player-one'
) {
  if (squares.length <= 0) {
    return;
  }
  for (const square of squares) {
    square.classList.add(highlightClass);
  }
}

export function manageTurns(num) {
  if (num === 3 || num === 6) {
    num = 0;
  }
  if (num === 4) {
    num = 1;
  }
  if (num === 5) {
    num = 2;
  }
  return num;
}

export function intervalCounter(end, start = 0) {
  let index = start;
  return function incrementIndex() {
    let count = index;
    index += 1;
    if (index === end) {
      index = start;
    }
    return count;
  };
}
