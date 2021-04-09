import Phaser from 'phaser';

let player;
let cursors;

 export default class Town extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    this.load.image('tiles', 'src/assets/top-down-town-tileset.png');
    this.load.tilemapTiledJSON('map', 'src/assets/itsworking.json');
    this.load.spritesheet('player', 'src/assets/player.png', { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    // environment
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town', 'tiles')

    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    const border = map.createStaticLayer("border", tileset, 0, 0);
    const shadows = map.createStaticLayer("shadows", tileset, 0, 0);
    const path = map.createStaticLayer("path", tileset, 0, 0);
    const trees = map.createStaticLayer("trees", tileset, 0, 0);
    const houses = map.createStaticLayer("houses", tileset, 0, 0);


    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    player = this.physics.add.sprite(200, 200, 'player');
    player.setScale(1.2);
    // make camera follow player
    this.cameras.main.startFollow(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (cursors.left.isDown) {
      player.setVelocityY(0);
      player.setVelocityX(-200);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityY(0);
      player.setVelocityX(200);
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.setVelocityX(0);
      player.setVelocityY(-200);
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.setVelocityX(0);
      player.setVelocityY(200);
      player.anims.play('down', true);
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play('turn');
    }
  }
}


