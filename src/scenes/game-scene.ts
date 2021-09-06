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
  private girlImage: Phaser.Physics.Arcade.Sprite;
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
    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.aKey = this.input.keyboard.addKey('A');
    this.tKey = this.input.keyboard.addKey('T');

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start:1, end: 4})
      // 'profil2', 'position_a1', 'position_a2', 'position_a3', 'profil2'
    });
  }

  public update(): void {


    this.cursorKeys.left.isDown ? (this.girlMap.setVelocityX(-300), this.girlMap.flipX = true/*, this.girlMap.play('walk')*/) :
      this.cursorKeys.right.isDown ? (this.girlMap.setVelocityX(300), this.girlMap.flipX = false/*, this.girlMap.play('walk')*/) :
        this.girlMap.setVelocityX(0)

    if (this.cursorKeys.up.isDown) {
      if (this.girlMap.x < 605 /*&& this.girlMap.y > 405*/) {
        this.girlMap.scale = this.girlMap.scale - 0.003;
        this.girlMap.y -= 2;
        this.girlMap.depth = this.girlMap.depth - 1;
        // this.girlMap.play('goback')
      }
      if (this.girlMap.x > 605 /*&& this.girlMap.scale >= 0.223*/) {
        this.girlMap.scale = this.girlMap.scale - 0.003;
        this.girlMap.y -= 2;
        this.girlMap.depth = this.girlMap.depth - 1;
        // this.girlMap.play('goback')
      }
    }

    //bigger
    if (this.cursorKeys.down.isDown ) {
      this.girlMap.scale = this.girlMap.scale + 0.003;
      this.girlMap.y += 2;
      this.girlMap.depth += 1;
    }


    if (this.aKey.isDown) {
      // alert("coucou")
      // this.girlMap.play('attack1');
      this.girlMap.anims.play('attack');
      this.girlMap.setSize(900, 900);
      console.log("ccc")
      // this.girlMap.attack = true;
      // this.girlMap.wall = true;
    }

    if (this.tKey.isDown) {
      // this.girlMap.play('heal');
    }

    if (this.cursorKeys.space.isDown) {
      // console.log('espace');
    }






    // Every frame, we create a new velocity for the sprite based on what keys the this.girlMap is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    // We normalize the velocity so that the this.girlMap is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    // this.girlMap.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
