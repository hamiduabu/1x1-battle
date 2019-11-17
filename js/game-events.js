import { game } from './dom-variables.js';
import { playerBox } from './dom-variables.js';
import * as utils from './game-utilities.js';
import * as item from './game-items.js';
import { Player } from './game-prototypes.js';
import { Board } from './game-prototypes.js';

// Manage Modal to allow player enter code name and select avatar
export function managePlayerOptions() {
  game.playerOptionsBtn.on('click', function() {
    game.playerOptionsModal.addClass('modal-display');
  });
  game.playerOptionsCancelBtn.on('click', function() {
    game.closeModal(game.playerOptionsModal);
  });
}

// Start Game play
export function startGame() {
  game.startGameBtn.on('click', () => {
    console.log('Starting ...');
    //Get player details
    const players = getInitialPlayerDetails();
    const [playerOne, playerTwo] = players;

    // Reset Modal Form
    game.playerInputForm.trigger('reset');

    // Hide landing page and modal
    game.closeModal(game.playerOptionsModal);
    game.clearScreen();

    // create game board
    const board = new Board();

    // Create Grid
    const boardFragment = board.createGrid();
    const gridCells = boardFragment.querySelectorAll('.inner-box');

    // Get four(4) random weapons
    const availableWeapons = utils.generateUniqueRandomItems(item.weapons, 4);

    // Get index numbers for 10 Inactive squares
    const inactiveArea = utils.generateUniqueRandomNumbers(
      0,
      gridCells.length,
      10
    );

    // Get index number to position players
    const unavailablePlayerOnePositions = utils.generateUniqueRandomNumbers(
      0,
      45,
      20,
      utils.getAvailablePlayerStartPositions().playerOnePositions
    );

    const unavailablePlayerTwoPositions = utils.generateUniqueRandomNumbers(
      55,
      100,
      20,
      utils.getAvailablePlayerStartPositions().playerTwoPositions
    );

    const playerOnePosition = utils.generateUniqueRandomNumbers(0, 45, 1, [
      ...inactiveArea,
      ...unavailablePlayerOnePositions
    ]);
    const playerTwoPosition = utils.generateUniqueRandomNumbers(55, 100, 1, [
      ...inactiveArea,
      ...unavailablePlayerTwoPositions
    ]);
    const playersPosition = [...playerOnePosition, ...playerTwoPosition];

    // Weapon Squares
    const weaponSquares = utils.generateUniqueRandomNumbers(0, 100, 4, [
      ...inactiveArea,
      ...playersPosition
    ]);

    // Setup inactive squares
    setupInactiveSquares(gridCells, inactiveArea);

    // Setup Players on board
    setupBoardItem(
      gridCells,
      playersPosition,
      players,
      ['avatar-board-img'],
      idx => `player${idx + 1}`
    );

    // Setup Weapons on board
    setupBoardItem(
      gridCells,
      weaponSquares,
      availableWeapons,
      ['weapon-board-img'],
      function(idx) {
        return `weapon${availableWeapons[idx].id}`;
      }
    );

    // Highlight initial active player
    const {
      availableSquares,
      playerTurn,
      player1,
      player2
    } = setInitialActiveSquares(boardFragment);

    // highlight initial available squares
    utils.highlightAvailableSquares(availableSquares);

    // Add movements
    manageMovements(players, playerTurn, player1, player2, availableSquares, [
      ...item.defaultWeapon,
      ...availableWeapons
    ]);

    // Display Heading
    game.combatants.text(`${playerOne.name} VS ${playerTwo.name}`);

    /*     Display player Stats */
    // Player Avatar and name
    playerBox.playerOneImg.attr('src', playerOne.mainImgUrl);
    playerBox.playerTwoImg.attr('src', playerTwo.mainImgUrl);

    playerBox.playerOneName.text(`${playerOne.name}`);
    playerBox.playerTwoName.text(`${playerTwo.name}`);

    // Health Points
    playerBox.playerOneHpValue.text('100');
    playerBox.playerTwoHpValue.text('100');

    // Player weapon details
    playerBox.playerOneWeaponImg.attr({
      id: setPlayerWeapon(playerOne).domId,
      src: setPlayerWeapon(playerOne).image
    });
    playerBox.playerOneWeaponName.text(setPlayerWeapon(playerOne).name);
    playerBox.playerOneWeaponDesc.text(setPlayerWeapon(playerOne).description);
    playerBox.playerOneWeaponAp.text(setPlayerWeapon(playerOne).damage);

    playerBox.playerTwoWeaponImg.attr({
      id: setPlayerWeapon(playerTwo).domId,
      src: setPlayerWeapon(playerTwo).image
    });
    playerBox.playerTwoWeaponName.text(setPlayerWeapon(playerTwo).name);
    playerBox.playerTwoWeaponDesc.text(setPlayerWeapon(playerTwo).description);
    playerBox.playerTwoWeaponAp.text(setPlayerWeapon(playerTwo).damage);

    // append to dom
    game.gameBoardContainer.append(boardFragment);
  });
}

export function startSlideShow() {
  const indexFromImageIndexRange = utils.intervalCounter(
    item.galleryImgs.length
  );
  setGalleryImageAndCaption(
    game.galleryImg,
    game.galleryImgCaption,
    indexFromImageIndexRange()
  );

  let imageInterval = setInterval(() => {
    switchImages(indexFromImageIndexRange);
  }, 7000);

  // Stop gallery slide show when game starts
  game.startGameBtn.on('click', event => {
    clearInterval(imageInterval);
  });
  game.gallery.on('mouseover', event => {
    clearInterval(imageInterval);
    game.galleryImgCaption.addClass('invisible');
  });
  game.gallery.on('mouseout', event => {
    imageInterval = setInterval(() => {
      switchImages(indexFromImageIndexRange);
    }, 7000);
    game.galleryImgCaption.removeClass('invisible');
  });
}

// Set new image and new caption text
function setGalleryImageAndCaption(imageSelector, textSelector, index) {
  imageSelector.attr('src', item.galleryImgs[index].image);
  textSelector.text(item.galleryImgs[index].caption);
}

// Change images on slide show
function switchImages(imageIndex) {
  game.gallery.addClass('invisible');
  setTimeout(() => {
    setGalleryImageAndCaption(
      game.galleryImg,
      game.galleryImgCaption,
      imageIndex()
    );
  }, 1000);
  setTimeout(() => {
    game.gallery.addClass('visible');
  }, 1500);
  setTimeout(() => {
    game.gallery.removeClass('invisible');
    game.gallery.removeClass('visible');
  }, 2000);
}

// Get players details from Modal Dialog Form
function getInitialPlayerDetails() {
  const playerOneName = utils.getPlayerName(game.playerOneNameInput);
  const playerOneAvatarDetails = utils.getPlayerAvatarDetails(
    game.playerOneAvatarSelect(),
    item.avatars
  );
  const playerTwoName = utils.getPlayerName(game.playerTwoNameInput);
  const playerTwoAvatarDetails = utils.getPlayerAvatarDetails(
    game.playerTwoAvatarSelect(),
    item.avatars
  );
  const playerOne = new Player(
    playerOneName,
    playerOneAvatarDetails.avatarId,
    playerOneAvatarDetails.mainImgUrl,
    playerOneAvatarDetails.miniImgUrl
  );
  const playerTwo = new Player(
    playerTwoName,
    playerTwoAvatarDetails.avatarId,
    playerTwoAvatarDetails.mainImgUrl,
    playerTwoAvatarDetails.miniImgUrl
  );
  return [playerOne, playerTwo];
}

// Setup inactive squares
function setupInactiveSquares(nodeList, inactiveSquares) {
  for (let i = 0; i < nodeList.length; i += 1) {
    if (inactiveSquares.includes(i)) {
      nodeList[i].classList.add('inactive');
    }
  }
}

// Setup board items (players and weapons)
function setupBoardItem(
  nodeList,
  positionsArray,
  itemArray,
  classAttributes = [],
  createId
) {
  for (let i = 0; i < nodeList.length; i += 1) {
    for (let j = 0; j < positionsArray.length; j += 1) {
      if (i === positionsArray[j]) {
        const imgElement = document.createElement('img');
        imgElement.src = itemArray[j].miniImgUrl;
        imgElement.id = createId(j);
        imgElement.classList.add(...classAttributes);
        nodeList[i].appendChild(imgElement);
      }
    }
  }
}

// Create initial active/authorized movement squares
/**
 * @param {DocumentFragment} domObject
 */
function setInitialActiveSquares(domObject) {
  const player1 = domObject.querySelector('#player1');
  const player2 = domObject.querySelector('#player2');
  const playerTurn = player1;

  playerTurn.classList.add('active-player-one');
  const availableSquares = [
    ...saveAvailableSquaresRight(playerTurn),
    ...saveAvailableSquaresLeft(playerTurn),
    ...saveAvailableSquaresDown(playerTurn),
    ...saveAvailableSquaresTop(playerTurn)
  ];
  return { availableSquares, playerTurn, player1, player2 };
}

// Get possible movements
function getMovement(player) {
  return {
    getTopRow: function() {
      return player.parentElement.parentElement.previousElementSibling;
    },
    getTopSquare: function() {
      return this.getTopRow().children[
        utils.getElementPresentPositionIndex(player)
      ];
    },
    getBottomRow: function() {
      return player.parentElement.parentElement.nextElementSibling;
    },
    getBottomSquare: function() {
      return this.getBottomRow().children[
        utils.getElementPresentPositionIndex(player)
      ];
    },
    getLeftSquare: function() {
      return player.parentElement.previousElementSibling;
    },
    getRightSquare: function() {
      return player.parentElement.nextElementSibling;
    }
  };
}

// Control movements
function move() {
  return {
    illegalMoveRight: function(player) {
      return (
        !getMovement(player).getRightSquare() ||
        getMovement(player)
          .getRightSquare()
          .classList.contains('inactive')
      );
    },

    illegalMoveLeft: function(player) {
      return (
        !getMovement(player).getLeftSquare() ||
        getMovement(player)
          .getLeftSquare()
          .classList.contains('inactive')
      );
    },

    illegalMoveDown: function(player) {
      return (
        !getMovement(player).getBottomRow() ||
        getMovement(player)
          .getBottomSquare()
          .classList.contains('inactive')
      );
    },

    illegalMoveUp: function(player) {
      return (
        !getMovement(player).getTopRow() ||
        getMovement(player)
          .getTopSquare()
          .classList.contains('inactive')
      );
    },
    moveRight: function(player) {
      getMovement(player)
        .getRightSquare()
        .appendChild(player);
    },

    moveLeft: function(player) {
      getMovement(player)
        .getLeftSquare()
        .appendChild(player);
    },

    moveDown: function(player) {
      getMovement(player)
        .getBottomSquare()
        .appendChild(player);
    },

    moveUp: function(player) {
      getMovement(player)
        .getTopSquare()
        .appendChild(player);
    }
  };
}

// Movements
function manageMovements(
  players,
  playerTurn,
  player1,
  player2,
  availableSquares,
  weapons
) {
  // let activePlayerClass;
  let numberOfTurns = 0;
  let allowedKeys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft',
    'Space'
  ];
  let allowedOnScreenButtonKeyIds = [
    'player-one-up-key',
    'player-one-left-key',
    'player-one-right-key',
    'player-one-down-key',
    'player-two-up-key',
    'player-two-left-key',
    'player-two-right-key',
    'player-two-down-key'
  ];

  document.addEventListener('keydown', function moveWithKeyboardArrowKeys(
    event
  ) {
    // No allowed keys and available moves in Battle mode
    if (game.gameBoardContainer.children().length === 0) {
      allowedKeys = [];
    }
    if (!allowedKeys.includes(event.key)) {
      return event.preventDefault();
    }
    // Clear available squares for next move
    for (const square of availableSquares) {
      square.classList.remove(
        'available-move-player-one',
        'available-move-player-two'
      );
    }
    availableSquares = [];

    // Keyboard Movements
    if (event.code === 'ArrowUp') {
      if (move().illegalMoveUp(playerTurn)) {
        return game.toggleMovementError();
      }
      move().moveUp(playerTurn);
      numberOfTurns += 1;
    }
    if (event.code === 'ArrowDown') {
      if (move().illegalMoveDown(playerTurn)) {
        return game.toggleMovementError();
      }
      move().moveDown(playerTurn);

      numberOfTurns += 1;
    }
    if (event.code === 'ArrowLeft') {
      if (move().illegalMoveLeft(playerTurn)) {
        return game.toggleMovementError();
      }
      move().moveLeft(playerTurn);
      numberOfTurns += 1;
    }
    if (event.code === 'ArrowRight') {
      if (move().illegalMoveRight(playerTurn)) {
        return game.toggleMovementError();
      }
      move().moveRight(playerTurn);
      numberOfTurns += 1;
    }
    // object literal destructuring assignment without a declaration
    ({ numberOfTurns, playerTurn } = manageActivePlayerState(
      numberOfTurns,
      playerTurn,
      player2,
      player1
    ));

    // Switch Weapons
    switchWeapons(numberOfTurns, player1, player2, players, weapons);
  });

  game.onScreenKeys.click(function moveWithOnScreenArrowKeys(event) {
    if (game.gameBoardContainer.children.length === 0) {
      return (allowedOnScreenButtonKeyIds = []);
    }

    for (const square of availableSquares) {
      square.classList.remove(
        'available-move-player-one',
        'available-move-player-two'
      );
    }

    // Player One Movements using on screen keys
    if (playerTurn === player1) {
      // Move up
      if (event.target.id === 'player-one-up-key') {
        if (move().illegalMoveUp(player1)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(availableSquares);
        }
        move().moveUp(player1);
        numberOfTurns += 1;
      }
      // Move down
      if (event.target.id === 'player-one-down-key') {
        if (move().illegalMoveDown(player1)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(availableSquares);
        }
        move().moveDown(player1);

        numberOfTurns += 1;
      }
      // Move Left
      if (event.target.id === 'player-one-left-key') {
        if (move().illegalMoveLeft(player1)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(availableSquares);
        }
        move().moveLeft(player1);
        numberOfTurns += 1;
      }
      // Move right
      if (event.target.id === 'player-one-right-key') {
        if (move().illegalMoveRight(player1)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(availableSquares);
        }
        move().moveRight(player1);
        numberOfTurns += 1;
      }

      // Player Two Movements using on screen keys
    } else if (playerTurn === player2) {
      // Move up
      if (event.target.id === 'player-two-up-key') {
        if (move().illegalMoveUp(player2)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(
            availableSquares,
            'available-move-player-two'
          );
        }
        move().moveUp(player2);
        numberOfTurns += 1;
      }
      // Move down
      if (event.target.id === 'player-two-down-key') {
        if (move().illegalMoveDown(player2)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(
            availableSquares,
            'available-move-player-two'
          );
        }
        move().moveDown(player2);

        numberOfTurns += 1;
      }
      // Move Left
      if (event.target.id === 'player-two-left-key') {
        if (move().illegalMoveLeft(player2)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(
            availableSquares,
            'available-move-player-two'
          );
        }
        move().moveLeft(player2);
        numberOfTurns += 1;
      }
      // Move right
      if (event.target.id === 'player-two-right-key') {
        if (move().illegalMoveRight(player2)) {
          game.toggleMovementError();
          return utils.highlightAvailableSquares(
            availableSquares,
            'available-move-player-two'
          );
        }
        move().moveRight(player2);
        numberOfTurns += 1;
      }
    }

    ({ numberOfTurns, playerTurn } = manageActivePlayerState(
      numberOfTurns,
      playerTurn,
      player2,
      player1
    ));

    // Switch Weapons (on screen keys)
    switchWeapons(numberOfTurns, player1, player2, players, weapons);

    // Manage turns save and highlight new available squares -
    // and check if battle condition is fulfilled (on screen keys)
    availableSquares = manageAfterMovementConditions(
      availableSquares,
      playerTurn,
      numberOfTurns
    );
  });

  document.addEventListener(
    'keyup',
    function checkAfterMoveWithKeyboardConditions(event) {
      if (game.gameBoardContainer.children.length === 0) {
        return (allowedKeys = []);
      }

      // Manage turns save and highlight new available squares
      // and check if battle condition is fulfilled
      availableSquares = manageAfterMovementConditions(
        availableSquares,
        playerTurn,
        numberOfTurns
      );
    }
  );
}

function manageAfterMovementConditions(
  availableSquares,
  playerTurn,
  numberOfTurns
) {
  availableSquares = [
    ...saveAvailableSquaresTop(playerTurn, numberOfTurns),
    ...saveAvailableSquaresDown(playerTurn, numberOfTurns),
    ...saveAvailableSquaresRight(playerTurn, numberOfTurns),
    ...saveAvailableSquaresLeft(playerTurn, numberOfTurns)
  ];
  //
  const adjacentSquares = [
    saveAvailableSquaresTop(playerTurn)[0],
    saveAvailableSquaresDown(playerTurn)[0],
    saveAvailableSquaresRight(playerTurn)[0],
    saveAvailableSquaresLeft(playerTurn)[0]
  ];
  const validAdjacentSquares = getValidSquares(adjacentSquares);
  checkForBattleCondition(validAdjacentSquares);
  if (numberOfTurns >= 3 && numberOfTurns <= 6) {
    utils.highlightAvailableSquares(
      availableSquares,
      'available-move-player-two'
    );
  } else {
    utils.highlightAvailableSquares(availableSquares);
  }

  return availableSquares;
}

// Next player is active after previous player has had 3 turns(3 moves)
function manageActivePlayerState(numberOfTurns, playerTurn, player2, player1) {
  if (numberOfTurns === 3) {
    playerTurn.classList.remove('active-player-one');
    playerTurn = player2;
    playerTurn.classList.add('active-player-two');
  }
  if (numberOfTurns >= 3 && numberOfTurns <= 6) {
    playerTurn = player2;
  }
  if (numberOfTurns === 6) {
    playerTurn.classList.remove('active-player-two');
    playerTurn = player1;
    playerTurn.classList.add('active-player-one');
    numberOfTurns = 0;
  }
  return { numberOfTurns, playerTurn };
}

// Set a players weapon
function setPlayerWeapon(player, weaponCache = item.defaultWeapon, id = 13) {
  const weaponProperty = {};
  for (const weapon of weaponCache) {
    if (weapon.id === id) {
      weaponProperty.domId = `weapon${id}`;
      weaponProperty.image = weapon.weaponUrl;
      weaponProperty.name = weapon.name;
      weaponProperty.description = weapon.description;
      weaponProperty.damage = weapon.damage;
      player.weaponId = id;
    }
  }
  return weaponProperty;
}

// Drop old weapon
function dropOldWeapon(weapons, oldWeaponId, presentPlayerSquare) {
  for (const weapon of weapons) {
    if (weapon.id === oldWeaponId) {
      presentPlayerSquare.firstElementChild.src = weapon.miniImgUrl;
      presentPlayerSquare.firstElementChild.id = `weapon${oldWeaponId}`;
    }
  }
}

// Pick a new weapon from the board
function pickNewWeapon(
  playerObject,
  playerString,
  newWeaponId,
  weaponsCache,
  presentPlayerSquare
) {
  const oldWeaponId = playerObject.weaponId;
  playerObject.weaponId = newWeaponId;

  playerBox[`${playerString}WeaponImg`].attr({
    id: setPlayerWeapon(playerObject, weaponsCache, newWeaponId).domId,
    src: setPlayerWeapon(playerObject, weaponsCache, newWeaponId).image
  });
  playerBox[`${playerString}WeaponName`].text(
    setPlayerWeapon(playerObject, weaponsCache, newWeaponId).name
  ),
    playerBox[`${playerString}WeaponDesc`].text(
      setPlayerWeapon(playerObject, weaponsCache, newWeaponId).description
    ),
    playerBox[`${playerString}WeaponAp`].text(
      setPlayerWeapon(playerObject, weaponsCache, newWeaponId).damage
    );
  dropOldWeapon(weaponsCache, oldWeaponId, presentPlayerSquare);
}

// Replace your weapons on the board
function switchWeapons(numberOfTurns, player1, player2, players, weapons) {
  let presentPlayer;
  if (numberOfTurns > 0 && numberOfTurns <= 3) {
    presentPlayer = player1;
  } else {
    presentPlayer = player2;
  }
  const presentPlayerSquare = presentPlayer.parentElement;
  if (
    presentPlayerSquare.firstElementChild.classList.contains('weapon-board-img')
  ) {
    const newWeaponId = utils.extractNumbers(
      presentPlayerSquare.firstElementChild.id
    );
    const [playerOne, playerTwo] = players;
    if (presentPlayer === player1) {
      pickNewWeapon(
        playerOne,
        'playerOne',
        newWeaponId,
        weapons,
        presentPlayerSquare
      );
    } else {
      pickNewWeapon(
        playerTwo,
        'playerTwo',
        newWeaponId,
        weapons,
        presentPlayerSquare
      );
    }
  }
}

// Save a players present position to be used to get available squares
function savePositions(player) {
  const availableMoves = [];
  const presentPosition = utils.getElementPresentPositionIndex(player);
  const parentElement = player.parentElement.parentElement;
  const playerParent = player.parentElement;
  const playerPosition = utils.getElementPresentPositionIndex(player);
  const parentPosition = utils.getElementPresentPositionIndex(playerParent);
  return {
    parentPosition,
    availableMoves,
    playerParent,
    playerPosition,
    presentPosition,
    parentElement
  };
}

// Save Available Squares
// Available squares are active squares a player can step into
// Right Squares
function saveAvailableSquaresRight(player, turns = 0) {
  turns = utils.manageTurns(turns);

  const {
    presentPosition,
    availableMoves: availableMovesRight,
    parentElement
  } = savePositions(player);

  for (let i = presentPosition + 1; i <= presentPosition + 3 - turns; i += 1) {
    if (i === parentElement.childElementCount) {
      return availableMovesRight;
    }
    if (parentElement.children[i].classList.contains('inactive')) {
      break;
    } else {
      availableMovesRight.push(parentElement.children[i]);
    }
  }
  return availableMovesRight;
}

// Left Squares
function saveAvailableSquaresLeft(player, turns = 0) {
  turns = utils.manageTurns(turns);

  const {
    presentPosition,
    availableMoves: availableMovesLeft,
    parentElement
  } = savePositions(player);

  for (let i = presentPosition - 1; i >= presentPosition - 3 + turns; i -= 1) {
    if (i < 0) {
      return availableMovesLeft;
    }
    if (parentElement.children[i].classList.contains('inactive')) {
      break;
    } else {
      availableMovesLeft.push(parentElement.children[i]);
    }
  }
  return availableMovesLeft;
}

// Bottom Squares
function saveAvailableSquaresDown(player, turns = 0) {
  turns = utils.manageTurns(turns);

  const {
    parentPosition,
    availableMoves: availableMovesDown,
    playerParent,
    playerPosition
  } = savePositions(player);

  for (let i = parentPosition + 1; i <= parentPosition + 3 - turns; i += 1) {
    if (i === playerParent.parentElement.parentElement.childElementCount) {
      return availableMovesDown;
    }
    if (
      playerParent.parentElement.parentElement.children[i].children[
        playerPosition
      ].classList.contains('inactive')
    ) {
      break;
    } else {
      availableMovesDown.push(
        playerParent.parentElement.parentElement.children[i].children[
          playerPosition
        ]
      );
    }
  }
  return availableMovesDown;
}

// Top Squares
function saveAvailableSquaresTop(player, turns = 0) {
  turns = utils.manageTurns(turns);

  const {
    parentPosition,
    availableMoves: availableMovesTop,
    playerParent,
    playerPosition
  } = savePositions(player);

  for (let i = parentPosition - 1; i >= parentPosition - 3 + turns; i -= 1) {
    if (i < 0) {
      return availableMovesTop;
    }
    if (
      playerParent.parentElement.parentElement.children[i].children[
        playerPosition
      ].classList.contains('inactive')
    ) {
      break;
    } else {
      availableMovesTop.push(
        playerParent.parentElement.parentElement.children[i].children[
          playerPosition
        ]
      );
    }
  }
  return availableMovesTop;
}

// Get active adjacent squares(exclude inactive cells)
function getValidSquares(adjacentSquares) {
  const validAdjacentSquares = [];
  for (const square of adjacentSquares) {
    if (square) {
      validAdjacentSquares.push(square);
    }
  }
  return validAdjacentSquares;
}

// Check if players are adjacent each other
// If players are adjacent each other, a battle starts
function checkForBattleCondition(validAdjacentSquares) {
  for (const square of validAdjacentSquares) {
    if (square.children.player1 || square.children.player2) {
      game.gameBoard().remove();
      game.playerOneScreenKeysContainer.addClass('hide');
      game.playerTwoScreenKeysContainer.addClass('hide');
      return startBattle();
    }
  }
}

// Update players stats (weapon, attack damage before battle)
function getUpdatedPlayerDetails(playerString) {
  const player = {
    name: playerBox[`${playerString}Name`].text(),
    avatar: playerBox[`${playerString}Img`].get(0),
    avatarImg: playerBox[`${playerString}Img`].attr('src'),
    weaponId: utils.extractNumbers(
      playerBox[`${playerString}WeaponImg`].attr('id')
    ),
    weaponName: playerBox[`${playerString}WeaponName`].text(),
    weaponImg: playerBox[`${playerString}WeaponImg`].attr('src'),
    maxAttackPoints: Number(playerBox[`${playerString}WeaponAp`].text()),
    WeaponProjectile: playerBox[`${playerString}WeaponProjectile`].get(0),
    WeaponProjectileImg: playerBox[`${playerString}WeaponProjectile`].attr(
      'src'
    ),
    health: Number(playerBox[`${playerString}HpValue`].text()),
    healthMeter: playerBox[`${playerString}HpValue`].get(0)
  };
  return player;
}

// Battle
function startBattle() {
  game.gameBoardBattle.css(
    'background-image',
    'url("assets/bg-img/battle-bg-light.png")'
  );
  game.gameBoardBattle.removeClass('hide');
  playerBox.playerOneWeapon.addClass('player-one-battle-mode');
  playerBox.playerTwoWeapon.addClass('player-two-battle-mode');
  playerBox.playerOneShield.addClass('player-one-battle-mode');
  playerBox.playerOneShield.removeClass('hide');
  playerBox.playerTwoShield.addClass('player-two-battle-mode');
  playerBox.playerTwoShield.removeClass('hide');
  playerBox.playerOneWeaponProjectile.attr(
    'src',
    playerBox.playerOneWeaponImg.attr('src')
  );
  playerBox.playerTwoWeaponProjectile.attr(
    'src',
    playerBox.playerTwoWeaponImg.attr('src')
  );
  createAttack();
}

function createAttack(turn = 1) {
  const playerOne = getUpdatedPlayerDetails('playerOne');
  const playerTwo = getUpdatedPlayerDetails('playerTwo');
  let isPlayerOneShieldUp = false;
  let isPlayerTwoShieldUp = false;
  let shooter;
  if (turn === 1) {
    shooter = playerOne;
  } else {
    shooter = playerTwo;
  }
  shooter.avatar.classList.add('active-shooter');

  // Manage Shields
  [playerBox.playerOneShield, playerBox.playerTwoShield].forEach(
    playerShield => {
      playerShield.on('click', event => {
        if (event.target.closest('#player-one-shield') && turn === 1) {
          if (isPlayerOneShieldUp === false) {
            isPlayerOneShieldUp = true;
          } else {
            return game.toggleShieldAlert();
          }

          playerTwo.avatar.classList.add('active-shooter');
          playerOne.avatar.classList.remove('active-shooter');
          playerOne.avatar.classList.add('right-shield-up');
          turn = 2;
        } else if (event.target.closest('#player-two-shield') && turn === 2) {
          if (isPlayerTwoShieldUp === false) {
            isPlayerTwoShieldUp = true;
          } else {
            return game.toggleShieldAlert();
          }

          playerOne.avatar.classList.add('active-shooter');
          playerTwo.avatar.classList.remove('active-shooter');
          playerBox.playerTwoImg.addClass('left-shield-up');
          turn = 1;
          checkWinCondition(turn, playerOne, playerTwo, 0);
        }
      });
    }
  );

  // Manage Attacks
  [playerBox.playerOneWeapon, playerBox.playerTwoWeapon].forEach(
    playerWeapon => {
      playerWeapon.on('click', event => {
        if (event.target.closest('#player-one-weapon') && turn === 1) {
          playerTwo.avatar.classList.add('active-shooter');
          playerOne.avatar.classList.remove('active-shooter');
          setTimeout(() => {
            playerBox.playerTwoImg.removeClass('left-shield-up');
          }, 1500);

          launchAttack(playerOne, 'attack-right');
          turn = 2;
          calculateDamage(playerOne, playerTwo, turn, isPlayerTwoShieldUp);
          isPlayerTwoShieldUp = false;
        } else if (event.target.closest('#player-two-weapon') && turn === 2) {
          playerOne.avatar.classList.add('active-shooter');
          playerTwo.avatar.classList.remove('active-shooter');
          setTimeout(() => {
            playerBox.playerOneImg.removeClass('right-shield-up');
          }, 1500);

          launchAttack(playerTwo, 'attack-left');
          turn = 1;
          calculateDamage(playerTwo, playerOne, turn, isPlayerOneShieldUp);
          isPlayerOneShieldUp = false;
        }
      });
    }
  );
}

function launchAttack(fromPlayer, attackType) {
  fromPlayer.WeaponProjectile.classList.add('active-projectile');
  setTimeout(function() {
    fromPlayer.WeaponProjectile.classList.add(attackType);
  }, 0);
  setTimeout(function() {
    fromPlayer.WeaponProjectile.classList.remove('active-projectile');
    fromPlayer.WeaponProjectile.classList.remove(attackType);
  }, 1550);
}

function calculateDamage(fromPlayer, toPlayer, turn, shieldsUp) {
  const maxAttackPoints = fromPlayer.maxAttackPoints;
  let damage = utils.generateUniqueRandomNumbers(10, maxAttackPoints + 1)[0];
  if (shieldsUp) {
    damage = Math.floor(
      utils.generateUniqueRandomNumbers(10, maxAttackPoints + 1)[0] / 2
    );
  }
  updateHealthMeter(fromPlayer, toPlayer, damage, turn);
}

function updateHealthMeter(fromPlayer, toPlayer, damage, turn) {
  toPlayer.health -= damage;
  if (toPlayer.health <= 0) {
    toPlayer.health = 0;
  }
  setTimeout(() => {
    if (toPlayer.health >= 0 && toPlayer.health < 39) {
      toPlayer.healthMeter.style.backgroundColor = '#ff7465';
    } else if (toPlayer.health >= 40 && toPlayer.health < 59) {
      toPlayer.healthMeter.style.backgroundColor = '#f1ec65';
    } else if (toPlayer.health >= 60 && toPlayer.health < 79) {
      toPlayer.healthMeter.style.backgroundColor = '#bbf165';
    }

    toPlayer.healthMeter.style.width = `${toPlayer.health}%`;
    toPlayer.healthMeter.textContent = toPlayer.health;
  }, 1500);

  checkWinCondition(turn, toPlayer, fromPlayer, 0);

  gameReload();
}

// Check who wins after both players have had a turn
function checkWinCondition(turn, toPlayer, fromPlayer, delay) {
  setTimeout(() => {
    if (turn === 1 && toPlayer.health <= 0 && fromPlayer.health <= 0) {
      $('#winner-details').addClass('winner-modal');
      $('#winner-details h1').text(
        `${toPlayer.name} - DRAWS WITH - ${fromPlayer.name}`
      );
      $('#winner-details img#winner-one').attr('src', toPlayer.avatarImg);

      $('#winner-details img#winner-one').removeClass('hide');
      $('#winner-details img#winner-two').attr('src', fromPlayer.avatarImg);
      $('#winner-details img#winner-two').removeClass('hide');
    } else if (turn === 1 && toPlayer.health <= 0) {
      $('#winner-details').addClass('winner-modal');
      $('#winner-details h1').text(`${fromPlayer.name} Wins`);
      $('#winner-details img#winner-two').attr('src', fromPlayer.avatarImg);
      $('#winner-details img#winner-two').removeClass('hide');
    } else if (turn === 1 && fromPlayer.health <= 0) {
      $('#winner-details').addClass('winner-modal');
      $('#winner-details h1').text(`${toPlayer.name} Wins`);
      $('#winner-details img#winner-one').attr('src', toPlayer.avatarImg);
      $('#winner-details img#winner-one').removeClass('hide');
    }
  }, delay);
}

// Reload the page to play again
function gameReload() {
  game.homeBtn.on('click', () => location.reload());
}
