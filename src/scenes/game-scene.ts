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
  public girlMap: Phaser.Physics.Arcade.Sprite;


  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    // this.cameras.main.setBounds(-2074, 0, 3574, 666);
    // this.physics.world.setBounds(-2074, 0, 3574, 666);
    // this.cameras.main.fadeIn(4000);
    // this.cameras.main.startFollow(this.girlMap);
    // this.girlMap.body.allowGravity = false;

// this.girlMap.setCollideWorldBounds(true);
// this.girlMap.body.setAllowGravity(false)
// body.allowGravity = false
// this.girlMap.body.allowGravity(false)

    //  Resize the Spine dimensions because the original skeleton includes the shine bone,
    //  rendering a simple bounds check useless. Not all Spine objects will require this, but this one does.
  //
    // this.girlMap.body.allowGravity = false
// this.girlMap.body.allowGravity(false)

// this.physics.add.overlap(this.girlMap, this.doors, function(girlMap: Phaser.Physics.Arcade.Image, doors: Phaser.Physics.Arcade.Image)  {
//   girlMap.body.x < 399 ? doors.alpha = 0.5 : doors.alpha = 1
// });

    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5);
  this.physics.add.existing(this.girlMap);
    this.girlMap.setScale(0.4)
    this.add.image(-300, 350, 'bg').setDepth(-54);
    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.aKey = this.input.keyboard.addKey('A');
    this.tKey = this.input.keyboard.addKey('T');

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start:1, end: 4}),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "goback",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start:1, end: 7}),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start:1, end: 5}),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start:1, end: 5}),
      frameRate: 5,
      repeat: 0
    });

    var keyObj = this.input.keyboard.addKey('W');  // Get key object
keyObj.on('down', function(event) {
  console.log("DOOOWN")
});
keyObj.on('up', function(event) { console.log("UPPP") });
  }

  public update(): void {


    // var frameNames = this.textures.get('dessinatrice1').getFrameNames();


// console.log(this.girlMap.texture.get());
    this.cursorKeys.left.isDown ? (this.girlMap.setVelocityX(-300), this.girlMap.flipX = true, this.girlMap.anims.play('walk')/*, this.girlMap.play('walk')*/) :
      this.cursorKeys.right.isDown ? (this.girlMap.setVelocityX(300), this.girlMap.flipX = false, this.girlMap.anims.play('walk') /*, this.girlMap.play('walk')*/) :
        this.girlMap.setVelocityX(0)

    if (this.cursorKeys.up.isDown) {
      if (this.girlMap.x < 605 /*&& this.girlMap.y > 405*/) {
        this.girlMap.scale = this.girlMap.scale - 0.003;
        this.girlMap.y -= 2;
        this.girlMap.depth = this.girlMap.depth - 1;
        this.girlMap.anims.play('goback')
      }
      if (this.girlMap.x > 605 /*&& this.girlMap.scale >= 0.223*/) {
        this.girlMap.scale = this.girlMap.scale - 0.003;
        this.girlMap.y -= 2;
        this.girlMap.depth = this.girlMap.depth - 1;
        this.girlMap.anims.play('goback')
      }
    }

    //bigger
    if (this.cursorKeys.down.isDown ) {
      this.girlMap.scale = this.girlMap.scale + 0.003;
      this.girlMap.y += 2;
      this.girlMap.depth += 1;
        this.girlMap.anims.play('front')
    }


    if (this.aKey.isDown) {
      // alert("coucou")
      // this.girlMap.play('attack1');
      this.girlMap.anims.play('attack');
      this.girlMap.on('animationcomplete', () => {
  console.log("FINI")

  this.girlMap.setFrame('attack1')


      })


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
    // We normalize the velocity so that the this.girlMap is always moving at the same speed, regardless of direction.
    // this.girlMap.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
