export class Player {
  constructor(
    name,
    avatarId,
    mainImgUrl,
    miniImgUrl,
    weaponId = 13,
    health = 100
  ) {
    this.name = name;
    this.avatarId = avatarId;
    this.mainImgUrl = mainImgUrl;
    this.miniImgUrl = miniImgUrl;
    this.weaponId = weaponId;
    this.health = health;
  }
}

export class Board {
  constructor(grids = 10, element = 'section') {
    this.grids = grids;
    this.element = element;
  }
  createGrid() {
    const documentFragment = document.createDocumentFragment();
    const gameBoard = document.createElement('section');
    gameBoard.classList.add('game-board');
    for (let i = 0; i < this.grids; i += 1) {
      const parentSection = document.createElement(this.element);
      parentSection.classList.add('outer-box');
      for (let j = 0; j < this.grids; j += 1) {
        const childSection = document.createElement(this.element);
        childSection.classList.add('inner-box');
        parentSection.appendChild(childSection);
      }
      gameBoard.appendChild(parentSection);
      documentFragment.appendChild(gameBoard);
    }
    return documentFragment;
  }
}
