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
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 4 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "goback",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 1, end: 7 }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 1, end: 5 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 1, end: 5 }),
      frameRate: 5,
      repeat: -1
    });


    this.anims.create({
      key: "idle_walk",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 5, end: 5 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "idle_attack",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 1 }),
      frameRate: 1,
      repeat: -1
    });


    var goLeft = this.cursorKeys.left
    var goRight = this.cursorKeys.right
    var goFront = this.cursorKeys.down
    var goBack = this.cursorKeys.up

    goLeft.on('down', function() {
      this.girlMap.setVelocityX(-300);
      this.girlMap.flipX = true
      this.girlMap.anims.play('walk', true)
    }, this);
    goLeft.on('up', function() {
      this.girlMap.setVelocityX(0)
      this.girlMap.anims.play('idle_walk')
    }, this);


    goRight.on('down', function() {
      this.girlMap.setVelocityX(300);
      this.girlMap.flipX = false
      this.girlMap.anims.play('walk', true)
    }, this);
    goRight.on('up', function() {
      this.girlMap.setVelocityX(0)
      this.girlMap.anims.play('idle')
    }, this);


    goBack.on('down', function() {
      this.girlMap.setVelocityY(-100)
      this.girlMap.anims.play('goback')

    }, this);
    goBack.on('up', function() {
      this.girlMap.setVelocityY(0)
      this.girlMap.anims.play('idle')
    }, this);


    goFront.on('down', function() {
      this.girlMap.setVelocityY(100)
      this.girlMap.anims.play('front')
    }, this);
    goFront.on('up', function() {
      this.girlMap.setVelocityY(0)
      this.girlMap.anims.play('idle')
    }, this);



  }

  public update(): void {

        if (this.cursorKeys.up.isDown) {
          if (this.girlMap.x < 605) {
            this.girlMap.scale = this.girlMap.scale - 0.003;
            this.girlMap.depth = this.girlMap.depth - 1;
          }
          if (this.girlMap.x > 605) {
            this.girlMap.scale = this.girlMap.scale - 0.003;
            this.girlMap.depth = this.girlMap.depth - 1;
          }
        }

        if (this.cursorKeys.down.isDown ) {
          this.girlMap.scale = this.girlMap.scale + 0.003;
          this.girlMap.depth += 1;
        }


        if (this.aKey.isDown) {
          this.girlMap.anims.play('attack');
          this.girlMap.setSize(900, 900);
          this.girlMap.on('animationcomplete', () => {
            this.girlMap.setFrame('pas_jkd')
          })


        }

        if (this.tKey.isDown) {
        }

        if (this.cursorKeys.space.isDown) {
        }
  }
}
