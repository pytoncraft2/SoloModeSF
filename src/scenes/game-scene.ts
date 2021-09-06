import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private aKey: Phaser.Input.Keyboard.Key;
  private tKey: Phaser.Input.Keyboard.Key;
  private player: Phaser.Physics.Arcade.Sprite
  // private girlImage: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;


  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(4000);

    // Add a this.girlMap sprite that can be moved around. Place him in the middle of the screen.
    // this.girlImage = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'girl');
    // this.girlMap.attack = true;
    // this.girlMap.wall = true;
    // this.girlMap = this.physics.add.sprite(, 'girl');
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5);
    this.add.image(-300, 350, 'bg').setDepth(-54);
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.aKey = this.input.keyboard.addKey('A');
    this.tKey = this.input.keyboard.addKey('T');

    this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
  key: 'attack1',
  frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start:1, end: 2})
});

this.player.setBounce(0.2);
this.player.setCollideWorldBounds(true);
this.add.image(956, 490,'dessinatrice1', 'face2');


  }

  public update(): void {

    // Every frame, we create a new velocity for the sprite based on what keys the this.girlMap is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
// and later in your game ...
    if (this.cursorKeys.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursorKeys.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursorKeys.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }

    // We normalize the velocity so that the this.girlMap is always moving at the same speed, regardless of direction.
  }
}
