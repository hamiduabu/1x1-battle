import './jquery-3.4.1.js';

// General DOM variables
export const game = {
  landingPage: $('.landing-container'),
  gameContainer: $('.game-container'),

  playerOptionsBtn: $('button.game-btn'),
  playerOptionsCancelBtn: $('button.close-btn'),
  playerOptionsModal: $('section.modal.player-input'),

  gallery: $('.gallery figure'),
  galleryImg: $('.gallery figure img'),
  galleryImgCaption: $('.gallery figure figcaption'),

  gameBoardContainer: $('.game-board-container'),
  combatants: $('#combatants'),
  gameBoardBattle: $('.battle-zone'),

  avatarImgs: $('.avatar-options img'),
  playerOneNameInput: $('#player-one'),
  playerTwoNameInput: $('#player-two'),
  playerInputForm: $('form'),

  startGameBtn: $('#start-game'),

  playerOneScreenKeysContainer: $('.onscreen-keys-one'),
  playerTwoScreenKeysContainer: $('.onscreen-keys-two'),
  onScreenKeys: $('.player-keys button'),

  movementErrorMsg: $('.error-msg'),

  shieldAlert: $('.shield-alert'),
  homeBtn: $('#game-over'),

  gameBoard: function() {
    return this.gameBoardContainer.find('.game-board');
  },
  playerOneAvatarSelect: function() {
    return $('.player1 .avatar-options input:checked');
  },
  playerTwoAvatarSelect: function() {
    return $('.player2 .avatar-options input:checked');
  },

  toggleMovementError: function() {
    this.movementErrorMsg.removeClass('hide');
    this.movementErrorMsg.removeClass('invisible');
    setTimeout(() => {
      this.movementErrorMsg.addClass('invisible');
    }, 1000);
    setTimeout(() => {
      this.movementErrorMsg.addClass('hide');
    }, 2000);
  },
  toggleShieldAlert: function() {
    this.shieldAlert.removeClass('hide');
    this.shieldAlert.removeClass('invisible');
    setTimeout(() => {
      this.shieldAlert.addClass('invisible');
    }, 1000);
    setTimeout(() => {
      this.shieldAlert.addClass('hide');
    }, 2000);
  },
  clearScreen: function() {
    this.landingPage.addClass('hide');
    this.gameContainer.removeClass('hide');
  },
  closeModal: function(modal) {
    modal.removeClass('modal-display');
  },
  playerBoxOne: $('.player-box-1'),
  playerBoxTwo: $('.player-box-2')
};

// Variables about players information
export const playerBox = {
  playerOneImg: game.playerBoxOne.find('#avatar1'),
  playerTwoImg: game.playerBoxTwo.find('#avatar2'),

  playerOneName: game.playerBoxOne.find('figcaption.name'),
  playerTwoName: game.playerBoxTwo.find('figcaption.name'),

  playerOneHpValue: game.playerBoxOne.find('.hp-meter-value'),
  playerTwoHpValue: game.playerBoxTwo.find('.hp-meter-value'),

  playerOneWeapon: game.playerBoxOne.find('#player-one-weapon'),
  playerOneShield: game.playerBoxOne.find('#player-one-shield'),
  playerOneWeaponImg: game.playerBoxOne.find('img.weapon'),
  playerOneWeaponName: game.playerBoxOne.find('figcaption.weapon-name'),
  playerOneWeaponDesc: game.playerBoxOne.find('p.weapon-description'),
  playerOneWeaponAp: game.playerBoxOne.find('span.attack-points'),
  playerOneWeaponProjectile: game.playerBoxOne.find('#player-one-projectile'),

  playerTwoWeapon: game.playerBoxTwo.find('#player-two-weapon'),
  playerTwoShield: game.playerBoxTwo.find('#player-two-shield'),
  playerTwoWeaponImg: game.playerBoxTwo.find('img.weapon'),
  playerTwoWeaponName: game.playerBoxTwo.find('figcaption.weapon-name'),
  playerTwoWeaponDesc: game.playerBoxTwo.find('p.weapon-description'),
  playerTwoWeaponAp: game.playerBoxTwo.find('span.attack-points'),
  playerTwoWeaponProjectile: game.playerBoxTwo.find('#player-two-projectile')
};
