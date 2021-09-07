import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;

  public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  public yKey: Phaser.Input.Keyboard.Key;
  public aKey: Phaser.Input.Keyboard.Key;
  public tKey: Phaser.Input.Keyboard.Key;
  // public followed: Phaser.Input.Keyboard.Key;
  public ennemy: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;
  public follow: boolean;


  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    // this.cameras.main.fadeIn(4000);
    // this.cameras.main.setBounds(-2074, 0, 3574, 666);
    // this.physics.world.setBounds(-2074, 0, 3574, 666);

    // this.physics.add.overlap(this.girlMap, this.doors, function(girlMap: Phaser.Physics.Arcade.Image, doors: Phaser.Physics.Arcade.Image)  {
    //   girlMap.body.x < 399 ? doors.alpha = 0.5 : doors.alpha = 1
    // });
    this.follow = true;

    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5);


    this.ennemy = this.physics.add.sprite(356, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setDragX(900)


    this.physics.add.existing(this.girlMap);
    this.physics.add.existing(this.ennemy);
    // this.physics.accelerateToObject(self.bird, self.player, );

    this.girlMap.setScale(0.4)
    this.ennemy.setScale(0.4)
    // this.ennemy.anims.play('walk')
    this.ennemy.anims.play('walk', true)


    // function col(e) {}
    this.add.image(940, 390, 'bg').setDepth(-54);


    // this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.yKey = this.input.keyboard.addKey('Y');
    this.aKey = this.input.keyboard.addKey('A');
    this.tKey = this.input.keyboard.addKey('T');



    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 4 }),
      frameRate: 6,
      repeat: 1
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
    var following = this.yKey

      this.ennemy.anims.play('walk', true)
    following.on('down' ,function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false): (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    },this)

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
      this.girlMap.anims.play('idle_walk')
    }, this);


    goBack.on('down', function() {
      this.girlMap.anims.play('goback')

    }, this);
    goBack.on('up', function() {
      this.girlMap.setVelocityY(0)
    }, this);


    goFront.on('down', function() {
      this.girlMap.anims.play('front')
    }, this);
    goFront.on('up', function() {
      this.girlMap.setVelocityY(0)
      this.girlMap.anims.play('idle')
    }, this);
    // self.physics.add.existing(self.zone);
// this.girlMap.body.friction.x = 0;
// this.girlMap.body.allowGravity = false;
// this.girlMap.body.immovable = true;





var collider = this.physics.add.overlap(this.girlMap, this.ennemy, function (e: Phaser.Physics.Arcade.Sprite,n)
{

e.setAlpha(0.8)
  // if (.anim == 'attack1') {
  //   count++;
  //   console.log(count);
  //   if (count == 20) {
  //     player2.alpha = player2.alpha - 0.2;
  //     count = 0;
  //   }
  // }


    this.ennemy.body.stop();
    this.ennemy.anims.play('attack')
    this.ennemy.on('animationcomplete', () => {
    this.ennemy.anims.play('walk')

  this.goToTarget()
this.stopTarget()
})

    // this.followed = false
    console.log("Touché")

    // this.physics.world.removeCollider(collider);
}, null, this);

this.goToTarget()
  }

  public goToTarget() {
    this.physics.accelerateToObject(this.ennemy, this.girlMap, 200, 200, 0)
  }

  public stopTarget() {
    this.physics.add.collider(this.girlMap, this.ennemy)
  }

  public update(): void {
    // this.followed ?  : this.followed = false

    // console.log(this.ennemy.x)
  //   if (this.ennemy.x < this.girlMap.x) {
  //   this.ennemy.body.stop()
  //   this.ennemy.x += 4
  // } else if(this.ennemy.x > this.girlMap.x) {
  //   this.ennemy.x -= 4
  // }

        if (this.cursorKeys.up.isDown) {
          // if (this.girlMap.x < 605) {
          //   this.girlMap.scale = this.girlMap.scale - 0.001;
          //   this.girlMap.depth = this.girlMap.depth - 1;
          // }


          if (this.girlMap.x > 605) {
            this.girlMap.y = this.girlMap.y - 2;
            this.girlMap.scale = this.girlMap.scale - 0.001;
            this.girlMap.depth = this.girlMap.depth - 1;
          this.girlMap.on('animationcomplete', () => {
            this.girlMap.setFrame('dos7')
          })

          }
        }

        if (this.cursorKeys.down.isDown ) {
          this.girlMap.scale = this.girlMap.scale + 0.001;
          this.girlMap.y += 2;
          this.girlMap.depth += 1;
          this.girlMap.on('animationcomplete', () => {
            this.girlMap.setFrame('face1')
          })
        }


        if (this.aKey.isDown) {
          this.girlMap.anims.play('attack');
          // this.girlMap.setSize(900, 900);
          this.girlMap.on('animationcomplete', () => {
            this.girlMap.setFrame('pas_jkd')
          })
        }

        if (this.tKey.isDown) {
        }

        if (this.cursorKeys.space.isDown) {
          this.goToTarget()
          this.stopTarget()
        }
  }
}
