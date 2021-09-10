const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;

  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public yKey: Phaser.Input.Keyboard.Key;
  public controls: any;
  public aKey: Phaser.Input.Keyboard.Key;
  public pKey: Phaser.Input.Keyboard.Key;
  public tKey: Phaser.Input.Keyboard.Key;
  public r4: Phaser.GameObjects.Ellipse
  public keyObj: Phaser.Input.Keyboard.Key
  public keyObj2: Phaser.Input.Keyboard.Key
  public keyObj3: Phaser.Input.Keyboard.Key
  public cKey: Phaser.Input.Keyboard.Key
  private spaceBar: Phaser.Input.Keyboard.Key
  public ennemy: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;
  public barrel: Phaser.Physics.Arcade.Image;
  public follow: boolean;
  public carryBarrel: boolean;
  private zone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  public map: any;



  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public preload() {
  this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
}


  public create(): void {
    console.log(sceneConfig)
    this.carryBarrel = false;
    this.follow = true;
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setVelocityY(203);
    this.ennemy = this.physics.add.sprite(-200, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setTintFill(0x310803, 0x311605 );


    this.barrel = this.physics.add.image(1250, 680, 'barrel').setOrigin(0.5, 0.5).setScale(0.2).setDragX(200).setImmovable(true)
    // this.cameras.main.setBounds(0, 0, 1920, 1080);
    this.girlMap.setScale(0.4)
    this.ennemy.setScale(0.4)
    // this.physics.moveToObject(this.ennemy, this.girlMap, 200);
    this.ennemy.anims.play('walk', true)
    this.add.image(940, 390, 'bg').setDepth(-54);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.cKey = this.input.keyboard.addKey('CTRL');
    this.aKey = this.input.keyboard.addKey('A');
    this.yKey = this.input.keyboard.addKey('Y');
    this.tKey = this.input.keyboard.addKey('T');
    this.pKey = this.input.keyboard.addKey('P');
    const controlConfig = {
    camera: this.cameras.main,
    left: this.cursors.left,
    right: this.cursors.right,
    up: this.cursors.up,
    down: this.cursors.down,
    acceleration: 0.06,
    drag: 0.0005,
    maxSpeed: 1.0
};

this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

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
      key: "jump",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 5 }),
      frameRate: 7,
      repeat: 0
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

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 4 }),
      frameRate: 6,
      repeat: -1
    })

    this.zone = this.add.zone(956, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    this.ennemyzone = this.add.zone(356, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    this.physics.add.existing(this.ennemyzone);
    this.physics.world.enableBody(this.zone);
    this.physics.world.enableBody(this.ennemyzone);
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body ) {
      this.zone.body.friction.x = 0;
      this.zone.body.allowGravity = false;
      this.zone.body.immovable = true;
      this.zone.depth = 30;
    }
    if (this.ennemyzone.body instanceof Phaser.Physics.Arcade.Body) {
      this.ennemyzone.body.friction.x = 0;
      this.ennemyzone.body.allowGravity = false;
      this.ennemyzone.body.immovable = true;
      this.ennemyzone.depth = 30;
    }
    if (this.barrel.body instanceof Phaser.Physics.Arcade.Body) {
      this.barrel.body.allowGravity = false;
    }
    this.physics.add.collider(this.girlMap, this.zone);
    this.physics.add.collider(this.girlMap, this.barrel);
    this.physics.add.collider(this.ennemy, this.ennemyzone);
    var t = this.physics.add.collider(this.girlMap, this.barrel, function(g:Phaser.Physics.Arcade.Sprite, b: Phaser.Physics.Arcade.Sprite) {
    //
    //   if(g.anims.getFrameName() === "attack1") {
    //     b.setAngularVelocity(100)
    console.log(b.body.touching)
        // if(b.body.touching.up) {
          // console.log("immmm")
          // b.setImmovable(true)
        // } else if (b.body.touching.left || b.body.touching.right) {
          // b.setImmovable(false)
        // }
        this.carryBarrel = true;
        if (g.anims.getFrameName().includes("attack1")) {
          // b.setImmovable(false)
        }
    //     // b.body.touching.right && b.setAngularVelocity(-100).setDragX(-60).setVelocityX(-100)
    //   }
    //   this.r4.y = this.girlMap.y + 210
    //
    }, null, this);

        this.ennemy.anims.play('walk', true)
        this.physics.moveToObject(this.ennemy, this.girlMap, 10, 4000)

    var following = this.yKey

    following.on('down' ,function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false): (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    },this)

    this.r4 = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);

    // console.log(r4)


    this.barrel.moveTo = this.plugins.get('rexmovetoplugin').add(this.barrel, {
        speed: 400,
        rotateToTarget: false
    }).on('complete', function(){
        console.log('Reach target');
    })
    this.input.on('pointerdown', function (pointer) {
        var touchX = pointer.x;
        var touchY = pointer.y;
        this.barrel.moveTo.moveTo(touchX, touchY);
    },this);






  }



  public update(time, delta): void {


        // this.ennemyzone.y - 30
        this.ennemyzone.x = this.ennemy.x

    if (this.aKey.isDown) {
      this.girlMap.setVelocityX(0);
      this.barrel.setImmovable(false)
      if (!this.girlMap.anims.getFrameName().includes("attack1")) {
        this.girlMap.anims.play("attack", true)
      }
    }
    else if (this.cursors.left.isDown) {
      this.zone.x = this.girlMap.x;
      this.r4.x = this.zone.x
      this.r4.y = this.zone.y - 30
      this.girlMap.flipX = true;
      if (this.cKey.isDown) {
      this.girlMap.anims.play('run', true);
      this.girlMap.setVelocityX(-400);
    } else {
      this.girlMap.anims.play('walk', true);
      this.girlMap.setVelocityX(-300);
    }




    }
    else if (this.cursors.right.isDown) {
      this.zone.x = this.girlMap.x;
      this.r4.x = this.zone.x
      this.r4.y = this.zone.y - 30

      this.girlMap.flipX = false;
      if (this.cKey.isDown) {
      this.girlMap.anims.play('run', true);
      this.girlMap.setVelocityX(400);
    } else {
      this.girlMap.anims.play('walk', true);
      this.girlMap.setVelocityX(300);
    }
    }
    else if (this.spaceBar.isDown) {
      // this.cameras.main.shake(100);
      // this.controls.update(delta)
      if (!this.tweens.isTweening(this.r4)) {
        this.tweens.add({
          targets: this.r4,
          scaleX: 0.25,
          scaleY: 0.5,
          yoyo: true,
          repeat: 0,
           duration: 600,
        });
      }

      this.zone.x = this.girlMap.x;
      this.r4.x = this.zone.x
      this.r4.y = this.zone.y - 30
      if (!this.girlMap.anims.getFrameName().includes("jump")) {
        this.girlMap.anims.play('jump');
        this.ennemy.on('animationcomplete', () => {
          this.ennemy.anims.play('walk')
        })

      }
      if (this.girlMap.body.touching.down) {
        this.girlMap.setVelocityY(-590);
      }

    }
    else {
      this.girlMap.setVelocityX(0);

      this.girlMap.anims.play('idle_walk');
    }

    if (this.cursors.up.isDown && this.girlMap.body.touching.down) {
      this.zone.body.position.y -= 2
      this.r4.depth -= 1;
      this.girlMap.depth -= 1;
      this.r4.y = this.zone.y - 30
      this.r4.x = this.zone.x
      // if (!this.girlMap.anims.getFrameName().includes("dos")) {
      this.girlMap.anims.play('goback', true);
      this.ennemy.on('animationcomplete', () => {
        this.ennemy.anims.play('walk')
      })

      // }


    } else if (this.cursors.down.isDown && this.girlMap.body.touching.down) {

      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.y += 2;
        this.r4.depth += 1;
        this.girlMap.depth += 1;
        this.r4.y = this.zone.y - 30
        this.r4.x = this.zone.x
        this.zone.y += 2;
      }
    }

    if (this.tKey.isDown) {
      if (this.ennemy.isTinted)
{
    this.ennemy.clearTint();
}
else
{
    this.ennemy.setTintFill(0xffffff);
}

      // this.barrel.alpha = 0.4;
      // this.barrel.x = this.girlMap.x
      // this.physics.moveToObject(this.barrel, this.girlMap, 200);

    }

    this.ennemyzone.y = this.zone.y

    var distance = Phaser.Math.Distance.Between(this.ennemy.x, this.ennemy.y, this.girlMap.x, this.girlMap.y);

    //  4 is our distance tolerance, i.e. how close the source can get to the target
    //  before it is considered as being there. The faster it moves, the more tolerance is required.
    if (distance < 5)
    {
        this.ennemy.body.reset(this.girlMap.x, this.girlMap.y);
        this.ennemy.anims.play("attack",true)
    } else {
    }

    if (this.pKey.isDown && this.carryBarrel === true) {
      // this.carryBarrel = true;
      console.log("porter")
    }





    // console.log(this.barrel.depth)
    // console.log("_______________")
    // console.log(this.r4.depth)
  }
}
