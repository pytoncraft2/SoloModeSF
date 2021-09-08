import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;
  body!: Phaser.Physics.Arcade.Body


  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public yKey: Phaser.Input.Keyboard.Key;
  public aKey: Phaser.Input.Keyboard.Key;
  public tKey: Phaser.Input.Keyboard.Key;
  public keyObj: Phaser.Input.Keyboard.Key
  public keyObj2: Phaser.Input.Keyboard.Key
  public keyObj3: Phaser.Input.Keyboard.Key
  // public followed: Phaser.Input.Keyboard.Key;
  public ennemy: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;
  public follow: boolean;
  private zone: Phaser.Physics.Arcade.Body
  public map: any;



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
    // const objects = this.map.getObjectLayer("objects").objects as any[];

    // console.log(objects)

    this.follow = true;

    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setVelocityY(203);


    this.ennemy = this.physics.add.sprite(356, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setDragX(-100).setImmovable(false)


  // self.zone.body.move = false;
// self.players.add(self.player);


    this.physics.add.existing(this.girlMap);
    // this.physics.add.existing(this.ennemy);
    this.physics.world.enable(this.girlMap);

    // this.physics.accelerateToObject(this.bird, this.this.girlMap, );

    this.girlMap.setScale(0.4)
    this.ennemy.setScale(0.4)
    // this.ennemy.anims.play('walk')
    this.ennemy.anims.play('walk', true)


    // function col(e) {}
    this.add.image(940, 390, 'bg').setDepth(-54);






    // this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.yKey = this.input.keyboard.addKey('Y');
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


    this.zone = this.add.zone(956, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5) ;

    // self.zone = this.add.zone(playerInfo.x, playerInfo.y +210).setSize(150, 40).setOrigin(0.5, 0.5);

  // self.zone.body.move = false;
// self.players.add(self.player);
this.physics.add.existing(this.zone);
this.zone.body.friction.x = 0;
this.zone.body.allowGravity = false;
this.zone.body.immovable = true;
this.zone.depth = 30;
// this.physics.add.collider(this.player, this.zone);

    // this.zone.body.velocity.x = 0;
    // this.zone.body.gameObject = false;
    // this.zone.body = true;
    // this.zone.body.setDepth(3,3)
    this.physics.add.existing(this.zone);
    this.physics.world.enable(this.zone);

      // console.log(this.zone.);
    // this.players.add(this.player);
    this.physics.add.collider(this.girlMap, this.zone);

    this.keyObj = this.input.keyboard.addKey('SPACE');  // Get key object
    this.keyObj.on('down', function(event) { this.girlMap.setVelocityY(-400); });

    this.keyObj2 = this.input.keyboard.addKey('UP');  // Get key object
    this.keyObj2.on('down', function(event) {
      // if (keyObj.isDown) {
      this.zone.body.velocity.y = -300;
      this.girlMap.body.velocity.y = 0;
      this.girlMap.body.allowGravity = false;
    // }
  },this);

    this.keyObj2.on('up', function(event) {
      // if (keyObj.isDown) {
      this.zone.body.velocity.y = 0;
      this.girlMap.body.velocity.y = 0;
      this.girlMap.body.allowGravity = true;

    // }
  },this);

  this.keyObj3 = this.input.keyboard.addKey('DOWN');  // Get key object
    this.keyObj3.on('down', function(event) {
      // if (keyObj.isDown) {
      this.zone.body.velocity.y = 300;
    // }
  },this);

    this.keyObj3.on('up', function(event) {
      // if (keyObj.isDown) {
      this.zone.body.velocity.y = 0;
    // }
  },this);

    // var goLeft = this.cursors.left
    // var goRight = this.cursors.right
    // var goFront = this.cursors.down
    // var goBack = this.cursors.up
    // var following = this.yKey

      this.ennemy.anims.play('walk', true)
    // following.on('down' ,function() {
    //   this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false): (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    // },this)

    // goLeft.on('down', function() {
    //   this.girlMap.setVelocityX(-300);
    //   this.girlMap.flipX = true
    //   this.girlMap.anims.play('walk', true)
    // }, this);
    // goLeft.on('up', function() {
    //   this.girlMap.setVelocityX(0)
    //   this.girlMap.anims.play('idle_walk')
    // }, this);
    //
    //
    // goRight.on('down', function() {
    //   this.girlMap.setVelocityX(300);
    //   this.girlMap.flipX = false
    //   this.girlMap.anims.play('walk', true)
    // }, this);
    // goRight.on('up', function() {
    //   this.girlMap.setVelocityX(0)
    //   this.girlMap.anims.play('idle_walk')
    // }, this);
    //
    //
    // goBack.on('down', function() {
    //   this.girlMap.anims.play('goback')
    //
    // }, this);
    // goBack.on('up', function() {
    //   this.girlMap.setVelocityY(0)
    // }, this);
    //
    //
    // goFront.on('down', function() {
    //   this.girlMap.anims.play('front')
    // }, this);
    // goFront.on('up', function() {
    //   this.girlMap.setVelocityY(0)
    //   this.girlMap.anims.play('idle')
    // }, this);
    // this.physics.add.existing(this.zone);
// this.girlMap.body.friction.x = 0;
// this.girlMap.body.allowGravity = false;
// this.girlMap.body.immovable = true;





var collider = this.physics.add.overlap(this.girlMap, this.ennemy, function (e: Phaser.Physics.Arcade.Sprite,n: Phaser.Physics.Arcade.Sprite)
{

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
    // if (e.anims.getFrameName() === "attack1") {
    e.setAlpha(0.4)
    // this.ennemy.flipX = !n.flipX
    // }
    console.log()


  this.goToTarget()
this.stopTarget()
// e.body.velocity.x > 0 ? n.flipX = true : n.flipX = false

// this.physics.world.removeCollider(collider);

})

    // this.followed = false

    // this.physics.world.removeCollider(collider);
}, null, this);

this.goToTarget()
}

  public goToTarget() {
    this.physics.accelerateToObject(this.ennemy, this.girlMap, 200, 200, 200)
  }

  public stopTarget() {
    this.physics.add.overlap(this.girlMap, this.ennemy)
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
/*
        if (this.cursors.up.isDown) {
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

        if (this.cursors.down.isDown ) {
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

        if (this.cursors.space.isDown) {
        }
        // if (this.ennemy.body.touching.right) {
        //   this.ennemy.flipX = false;
        // }

        if (this.girlMap.body.touching.left && this.girlMap.flipX === true) {
          this.ennemy.flipX = false;
        } else if (this.girlMap.body.touching.left && this.girlMap.flipX === false) {
          this.ennemy.flipX = true;
        }

        if (this.girlMap.body.touching.right && this.girlMap.flipX === true) {
          this.ennemy.flipX = true;
        } else if (this.girlMap.body.touching.right && this.girlMap.flipX === false) {
          this.ennemy.flipX = false;
        }
        */

        if (this.cursors.left.isDown)
{
    this.girlMap.setVelocityX(-160);

    this.girlMap.anims.play('walk', true);
}
else if (this.cursors.right.isDown)
{
    this.girlMap.setVelocityX(160);

    this.girlMap.anims.play('walk', true);
}
else
{
    this.girlMap.setVelocityX(0);

    this.girlMap.anims.play('idle_walk');
}

if (this.cursors.up.isDown && this.girlMap.body.touching.down)
{
    this.girlMap.setVelocityY(-330);
}
  }
}
