import { shuffle } from './game-utilities.js';

export const galleryImgs = [
  {
    image: 'assets/img/gallery/1-select-avatar.png',
    caption: 'Enter a Cool Code Name and Select an Avatar'
  },
  {
    image: 'assets/img/gallery/2-highlighted-moves.png',
    caption: 'Available Moves are Highlighted in Purple or Green'
  },
  {
    image: 'assets/img/gallery/3-highlighted-moves2.png',
    caption: 'Available Moves are Highlighted in Purple or Green'
  },
  {
    image: 'assets/img/gallery/4-highlighted-moves3.png',
    caption: 'Available Moves are Highlighted Purple or Green'
  },
  {
    image: 'assets/img/gallery/5-weapons1.png',
    caption: 'Select the best Weapon on the Board'
  },
  {
    image: 'assets/img/gallery/6-weapons2.png',
    caption:
      'The best Weapon would be the one with the highest Maximum Attack Points(AP)'
  },
  {
    image: 'assets/img/gallery/7-weapons3.png',
    caption:
      'Selecting the best Weapon is the first step to winning your Battle'
  },
  {
    image: 'assets/img/gallery/8-replace-weapons.png',
    caption: 'Move to a Weapon Square to pick it up'
  },
  {
    image: 'assets/img/gallery/9-battle-condition.png',
    caption: 'Move to your opponents Adjacent Square to start a battle'
  },
  {
    image: 'assets/img/gallery/10-battle-condition2.png',
    caption: 'Try to Start a Battle before your opponent replaces their weapon'
  },
  {
    image: 'assets/img/gallery/11-battle-condition3.png',
    caption: 'Move to your opponents Adjacent Square to start a battle'
  },
  {
    image: 'assets/img/gallery/12-attack1.png',
    caption: 'Weapons are activated in Battle Mode'
  },
  {
    image: 'assets/img/gallery/13-attack2.png',
    caption: 'Click on your weapon to launch it at your opponent'
  },
  {
    image: 'assets/img/gallery/14-attack3.png',
    caption: 'A turn is completed when your opponent responds to your attack'
  },
  {
    image: 'assets/img/gallery/15-raise-shields1.png',
    caption: 'Click on your Shield to activate it'
  },
  {
    image: 'assets/img/gallery/16-raise-shields2.png',
    caption: 'Use shields to reduce potential damage by half'
  }
];

export const avatars = [
  {
    name: 'Detective',
    id: 1,
    imgUrl: 'assets/img/avatar/detective.png',
    miniImgUrl: 'assets/img/avatar-mini/detective-mini.png'
  },
  {
    name: 'Dragon Queen',
    id: 2,
    imgUrl: 'assets/img/avatar/dragon-queen.png',
    miniImgUrl: 'assets/img/avatar-mini/dragon-queen-mini.png'
  },
  {
    name: 'Madame Driver',
    id: 3,
    imgUrl: 'assets/img/avatar/driver-f.png',
    miniImgUrl: 'assets/img/avatar-mini/driver-f-mini.png'
  },
  {
    name: 'Monsieur Driver',
    id: 4,
    imgUrl: 'assets/img/avatar/driver-m.png',
    miniImgUrl: 'assets/img/avatar-mini/driver-m-mini.png'
  },
  {
    name: 'Fierce',
    id: 5,
    imgUrl: 'assets/img/avatar/fierce.png',
    miniImgUrl: 'assets/img/avatar-mini/fierce-mini.png'
  },
  {
    name: 'Fire Fighter',
    id: 6,
    imgUrl: 'assets/img/avatar/fire-fighter.png',
    miniImgUrl: 'assets/img/avatar-mini/fire-fighter-mini.png'
  },
  {
    name: 'Golden Soldier',
    id: 7,
    imgUrl: 'assets/img/avatar/golden-soldier.png',
    miniImgUrl: 'assets/img/avatar-mini/golden-soldier-mini.png'
  },
  {
    name: 'Madame Guard',
    id: 8,
    imgUrl: 'assets/img/avatar/guard-f.png',
    miniImgUrl: 'assets/img/avatar-mini/guard-f-mini.png'
  },
  {
    name: 'Monsieur Guard',
    id: 9,
    imgUrl: 'assets/img/avatar/guard-m.png',
    miniImgUrl: 'assets/img/avatar-mini/guard-m-mini.png'
  },
  {
    name: 'King Walker',
    id: 10,
    imgUrl: 'assets/img/avatar/king-walker.png',
    miniImgUrl: 'assets/img/avatar-mini/king-walker-mini.png'
  },
  {
    name: 'Mean Face',
    id: 11,
    imgUrl: 'assets/img/avatar/mean-face.png',
    miniImgUrl: 'assets/img/avatar-mini/mean-face-mini.png'
  },
  {
    name: 'Queen',
    id: 12,
    imgUrl: 'assets/img/avatar/queen.png',
    miniImgUrl: 'assets/img/avatar-mini/queen-mini.png'
  },
  {
    name: 'Snow',
    id: 13,
    imgUrl: 'assets/img/avatar/snow.png',
    miniImgUrl: 'assets/img/avatar-mini/snow-mini.png'
  },
  {
    name: 'Squeak',
    id: 14,
    imgUrl: 'assets/img/avatar/squeak.png',
    miniImgUrl: 'assets/img/avatar-mini/squeak-mini.png'
  },
  {
    name: 'Starfish',
    id: 15,
    imgUrl: 'assets/img/avatar/starfish.png',
    miniImgUrl: 'assets/img/avatar-mini/starfish-mini.png'
  },
  {
    name: 'SWAT',
    id: 16,
    imgUrl: 'assets/img/avatar/swat.png',
    miniImgUrl: 'assets/img/avatar-mini/swat-mini.png'
  },
  {
    name: 'Wander Woman',
    id: 17,
    imgUrl: 'assets/img/avatar/wander-woman.png',
    miniImgUrl: 'assets/img/avatar-mini/wander-woman-mini.png'
  },
  {
    name: 'Body Builder',
    id: 18,
    imgUrl: 'assets/img/avatar/body-builder.png',
    miniImgUrl: 'assets/img/avatar-mini/body-builder-mini.png'
  }
];
const weaponItems = [
  {
    name: 'Steel Boots',
    id: 1,
    description: 'These boots will boost your Max. AP to 16',
    weaponUrl: 'assets/img/items/weapons/steel-boots.png',
    miniImgUrl: 'assets/img/items/weapons-mini/steel-boots-mini.png',
    damage: 16,
    default: false
  },
  {
    name: 'Ice Strike',
    id: 2,
    description: 'From Deep Ice. You get Max. AP of 18',
    weaponUrl: 'assets/img/items/weapons/ice.png',
    miniImgUrl: 'assets/img/items/weapons-mini/ice-mini.png',
    damage: 18,
    default: false
  },
  {
    name: 'Ice Sword',
    id: 3,
    description: 'Cut through anything for a Max. 20 AP',
    weaponUrl: 'assets/img/items/weapons/ice-sword.png',
    miniImgUrl: 'assets/img/items/weapons-mini/ice-sword-mini.png',
    damage: 20,
    default: false
  },
  {
    name: 'Flame Ice',
    id: 4,
    description: 'A rare item that raises Max. AP to 22',
    weaponUrl: 'assets/img/items/weapons/ice-fire.png',
    miniImgUrl: 'assets/img/items/weapons-mini/ice-fire-mini.png',
    damage: 22,
    default: false
  },
  {
    name: 'Grapes',
    id: 5,
    description: 'Food Fight!!! Raises Max. AP to 14',
    weaponUrl: 'assets/img/items/weapons/grapes.png',
    miniImgUrl: 'assets/img/items/weapons-mini/grapes-mini.png',
    damage: 14,
    default: false
  },
  {
    name: 'Fire Ball',
    id: 6,
    description: 'It Burns!!! Your Max. AP rises to 18',
    weaponUrl: 'assets/img/items/weapons/flame.png',
    miniImgUrl: 'assets/img/items/weapons-mini/flame-mini.png',
    damage: 18,
    default: false
  },
  {
    name: 'Flame Sword',
    id: 7,
    description: 'The bane of the dark. Raises AP to 20',
    weaponUrl: 'assets/img/items/weapons/flame-sword.png',
    miniImgUrl: 'assets/img/items/weapons-mini/flame-sword-mini.png',
    damage: 20,
    default: false
  },
  {
    name: 'Dual Axe',
    id: 8,
    description: 'Strikes both ways! You get 16 Max. AP',
    weaponUrl: 'assets/img/items/weapons/dual-ax.png',
    miniImgUrl: 'assets/img/items/weapons-mini/dual-ax-mini.png',
    damage: 16,
    default: false
  },
  {
    name: 'Drumsticks',
    id: 9,
    description: 'Tasty! Able to dish out up to 14 AP',
    weaponUrl: 'assets/img/items/weapons/drumsticks.png',
    miniImgUrl: 'assets/img/items/weapons-mini/drumsticks-mini.png',
    damage: 14,
    default: false
  },
  {
    name: 'Dark Spear',
    id: 10,
    description: 'Nothing is safe from its potential 22 AP',
    weaponUrl: 'assets/img/items/weapons/dragon-glass-spear.png',
    miniImgUrl: 'assets/img/items/weapons-mini/dragon-glass-spear-mini.png',
    damage: 22,
    default: false
  },
  {
    name: 'Gold Cheese',
    id: 11,
    description: 'You get to hit for a Max. 14 AP',
    weaponUrl: 'assets/img/items/weapons/cheese.png',
    miniImgUrl: 'assets/img/items/weapons-mini/cheese-mini.png',
    damage: 14,
    default: false
  },
  {
    name: 'Blue Blade',
    id: 12,
    description: 'Unbreakable! Can deal a Max. 16 AP',
    weaponUrl: 'assets/img/items/weapons/blue-blade.png',
    miniImgUrl: 'assets/img/items/weapons-mini/blue-blade-mini.png',
    damage: 16,
    default: false
  },
  {
    name: 'Red Axe',
    id: 13,
    description: 'A basic weapon. It has a 10 AP',
    weaponUrl: 'assets/img/items/weapons/ax.png',
    miniImgUrl: 'assets/img/items/weapons-mini/ax-mini.png',
    damage: 10,
    default: true
  }
];

const imgSrc = shuffle(
  avatars.map(avatar => {
    return avatar.miniImgUrl;
  })
);

const inputId = imgSrc.map(img => {
  for (const avatar of avatars) {
    if (img === avatar.miniImgUrl) {
      return `av-${avatar.id}`;
    }
  }
});

export const weapons = weaponItems
  .filter(weapon => weapon.default === false)
  .map(weapon => weapon);

export const defaultWeapon = weaponItems
  .filter(weapon => weapon.default === true)
  .map(weapon => weapon);

export function setAvatarInputOptions(images) {
  images.each((index, img) => {
    $(img).attr('src', imgSrc[index]);
    $(img)
      .prev()
      .attr('id', inputId[index]);
    $(img)
      .parent()
      .attr('for', inputId[index]);
  });
}
