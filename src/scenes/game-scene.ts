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
  public mKey: Phaser.Input.Keyboard.Key;
  public aKey: Phaser.Input.Keyboard.Key;
  public pKey: Phaser.Input.Keyboard.Key;
  public tKey: Phaser.Input.Keyboard.Key;
  public ombre: Phaser.GameObjects.Ellipse
  public protect: Phaser.GameObjects.Ellipse
  public pannelRight: Phaser.GameObjects.Rectangle
  public pannelBottom: Phaser.GameObjects.Rectangle
  public keyObj: Phaser.Input.Keyboard.Key
  public keyObj2: Phaser.Input.Keyboard.Key
  public keyObj3: Phaser.Input.Keyboard.Key
  public count: number;
  public ctrlKey: Phaser.Input.Keyboard.Key
  public cKey: Phaser.Input.Keyboard.Key
  private spaceBar: Phaser.Input.Keyboard.Key
  public ennemy: Phaser.Physics.Arcade.Sprite;
  public ennemy2: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;
  public graphic: Phaser.GameObjects.Graphics;
  public graphic2: Phaser.GameObjects.Graphics;
  public gfx: Phaser.GameObjects.Graphics;
  public barrel: Phaser.Physics.Arcade.Image;
  public ennemyGroup: Phaser.Physics.Arcade.Group;
  public follow: boolean;
  public carryBarrel: boolean;
  public info: Phaser.GameObjects.Text;
  public barrelGroup: Phaser.Physics.Arcade.Group;
  private zone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  public map: any;



  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
    // FIXME: Property 'add' does not exist on type 'Function | BasePlugin'
    // FIXME: Property 'moveTo' does not exist on type 'Image'.
  }


  public create(): void {
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(1);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(1);
    console.log("___________________")
    console.log(this.game.scale.gameSize)

    this.count = 0;
     this.barrelGroup = this.physics.add.group({
      allowGravity: false
    });

this.graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });
this.graphic2 = this.add.graphics({ lineStyle: { color: 0x00ffff } });
this.gfx = this.add.graphics();

    // var ennemyGroup = {}
    this.ennemyGroup = this.physics.add.group()
    this.ennemy = this.physics.add.sprite(500, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setTintFill(0x310803, 0x311605).setVelocityY(203);
    var block1 = this.barrelGroup.create(-1562, 672, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true);
    var block2 = this.barrelGroup.create(-1620, 540, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true).setDepth(0.5);
    var block3 = this.barrelGroup.create(-1662, 700, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true);

    this.carryBarrel = false;
    this.follow = true;
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setVelocityY(203);
    this.barrel = this.physics.add.image(1250, 680, 'barrel').setOrigin(0.5, 0.5).setScale(0.2).setDragX(200).setImmovable(true).setCollideWorldBounds(true)
    // this.ennemy.anims.play('idle_attack', true)
    this.add.image(940, 390, 'bg').setDepth(-54);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.ctrlKey = this.input.keyboard.addKey('CTRL');
    this.aKey = this.input.keyboard.addKey('A');
    this.yKey = this.input.keyboard.addKey('Y');
    this.tKey = this.input.keyboard.addKey('T');
    this.pKey = this.input.keyboard.addKey('P');
    this.cKey = this.input.keyboard.addKey('C');
    this.mKey = this.input.keyboard.addKey('M');

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
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 1 }),
      frameRate: 1,
      repeat: 0
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
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body) {
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
    this.physics.add.collider(this.girlMap, this.zone);
    this.physics.add.collider(this.girlMap, this.barrelGroup);
    this.physics.add.collider(this.ennemy, this.ennemyzone);
    this.physics.add.overlap(this.girlMap, this.barrel, function(girl: Phaser.Physics.Arcade.Sprite, barrel: Phaser.Physics.Arcade.Sprite) {

      if (girl.depth > barrel.depth - 10 && girl.depth < barrel.depth + 10) {
        this.carryBarrel = true;
      }
    })

    this.ennemy.anims.play('idle_attack', true)

    var following = this.yKey

    following.on('down', function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false) : (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    }, this)


    this.ombre = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);
    this.protect = this.add.ellipse(this.zone.x, this.zone.y - 200, 1, 1, 0xeceae4).setAlpha(0);

    // this.barrel.moveTo = this.plugins.get('rexmovetoplugin').add(this.barrel, {
    //   speed: 400,
    //   rotateToTarget: false
    // }).on('complete', function() {
    //   this.barrel.setImmovable(false)
    //   this.barrel.allowGravity = true
    //   this.barrel.setVelocityY(100)
    //   this.barrel.body.friction.x = 1
    //   // setAnangularVelocity= 60
    //   this.barrel.setAngularVelocity(60)
    //   this.physics.add.collider(this.girlMap, this.barrel)
    // }, this)

  }
  public update(time, delta): void {
    var pointer = this.input.activePointer;
    console.log(pointer)
var closest = this.physics.closest(this.zone);
var furthest = this.physics.furthest(this.girlMap);

    this.physics.moveTo(this.ennemy, closest.x, 1000);
this.gfx.clear()
    .lineStyle(2, 0xff3300)
    .lineBetween(closest.x, closest.y, this.ennemy.x, this.ennemy.y)
    .lineStyle(2, 0x0099ff)
    .lineBetween(furthest.x, furthest.y, this.ennemy.x, this.ennemy.y);
    // console.log(this.girlMap.body.y)
    var dist = Phaser.Math.Distance.Snake(this.girlMap.x, this.girlMap.y, this.ennemy.x, this.ennemy.y);

    this.graphic
    .clear()
    .strokePoints([
        { x: this.girlMap.x + dist, y: this.girlMap.y },
        { x: this.girlMap.x, y: this.girlMap.y + dist },
        { x: this.girlMap.x - dist, y: this.girlMap.y },
        { x: this.girlMap.x , y: this.girlMap.y - dist },
    ], true, true)

    var dist2 = Phaser.Math.Distance.BetweenPoints(this.girlMap, this.ennemy);
    // console.log(dist)
    //196 dis2

this.graphic2
    .clear()
    .strokeCircle(this.girlMap.x, this.girlMap.y, dist2);

    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y
    this.ennemyzone.x = this.ennemy.x

    if (this.aKey.isDown) {
      this.girlMap.setVelocityX(0);
      this.barrel.setImmovable(false)
      if (this.girlMap.anims.getFrameName().includes("attack4")
      && this.girlMap.depth < this.ennemy.depth + 10
      && this.girlMap.depth  > this.ennemy.depth - 10 && dist2 < 196) {
        if (this.count == 1) {
          if (this.ennemy.alpha < 0.3) {
            this.ennemy.setTintFill(0xffffff)
            this.tweens.add({
              targets: this.ennemy,
              alpha: 0,
              y: -100,
              repeat: 0,
              duration: 900,
              onComplete: function(a, e) { console.log('FIN'); arguments[1][0].setAlpha(0); },
            });

          }
          this.ennemy.alpha -= 0.03
          this.count = 0;
        } else {
          this.count++
        }
      }
      this.girlMap.anims.play("attack", true)

    }
    else if (this.cursors.left.isDown) {
      this.physics.moveTo(this.ennemy, this.girlMap.x, 800);

      this.zone.x = this.girlMap.x;
      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30

      this.girlMap.flipX = true;
      if (this.ctrlKey.isDown) {
        this.girlMap.anims.play('run', true);
        this.girlMap.setVelocityX(-400);
      } else {
        this.girlMap.anims.play('walk', true);
        this.girlMap.setVelocityX(-300);
      }




    }
    else if (this.cursors.right.isDown) {
    this.physics.moveTo(this.ennemy, this.girlMap.x, 800);
      this.zone.x = this.girlMap.x;
      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30


      this.girlMap.flipX = false;
      if (this.ctrlKey.isDown) {
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
      if (!this.tweens.isTweening(this.ombre)) {
        this.tweens.add({
          targets: this.ombre,
          scaleX: 0.25,
          scaleY: 0.5,
          yoyo: true,
          repeat: 0,
          duration: 600,
        });
      }

      this.zone.x = this.girlMap.x;


      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30

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
      this.ombre.depth -= 1;
      this.girlMap.depth -= 1;
      this.ombre.y = this.zone.y - 30
      this.ombre.x = this.zone.x

      // if (!this.girlMap.anims.getFrameName().includes("dos")) {
      this.girlMap.anims.play('goback', true);
      this.ennemy.on('animationcomplete', () => {
        this.ennemy.anims.play('idle_attack', true)
      })

      // }


    } else if (this.cursors.down.isDown && this.girlMap.body.touching.down) {

      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.y += 2;
        this.ombre.depth += 1;
        this.girlMap.depth += 1;
        this.ombre.y = this.zone.y - 30
        this.ombre.x = this.zone.x
        this.zone.y += 2;
      }
    }



    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
      if (this.girlMap.depth > this.barrel.depth - 10
        && this.girlMap.depth < this.barrel.depth + 10) {
        this.barrel.allowGravity = false
        this.barrel.moveTo.moveTo(this.girlMap.x, this.girlMap.y - 340);



        console.log("porter")
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
      console.log(this.protect.displayWidth)
      console.log(this.protect.displayHeight)
      this.protect.alpha === 0.5 ?
            this.tweens.add({
              targets: this.protect,
              alpha: 0,
              repeat: 0,
              displayWidth: 0,
              displayHeight: 0,
              duration: 300,
              onComplete: function(a, e) { console.log('FIN'); arguments[1][0].setAlpha(0); },
            }) : this.tweens.add({
              targets: this.protect,
              alpha: 0.5,
              displayWidth: 220,
              displayHeight: 420,
              repeat: 0,
              duration: 300,
              onComplete: function(a, e) { console.log('FIN'); arguments[1][0].setAlpha(0.5); },
            })
    }

    if (this.tKey.isDown) {
      if (this.ennemy.isTinted) {
        this.ennemy.clearTint();
      }
      else {
        this.ennemy.setTintFill(0xffffff);
      }

      // this.barrel.alpha = 0.4;
      // this.barrel.x = this.girlMap.x
      // this.physics.moveToObject(this.barrel, this.girlMap, 200);


  }


    if (Phaser.Input.Keyboard.JustDown(this.mKey)) {
      console.log("ofdisqjfkldsmq")
    // this.pannelRight.alpha === 1 ? (this.pannelBottom.setAlpha(0), this.pannelRight.setAlpha(0), this.info.setAlpha(0))
    // :  (this.pannelBottom.setAlpha(1), this.pannelRight.setAlpha(1), this.info.setAlpha(1));

      this.pannelBottom.alpha === 1 ?
            this.tweens.add({
              targets: this.pannelBottom,
              alpha: 0,
              repeat: 0,
              duration: 300,
              onComplete: (a, e) => { this.pannelRight.setAlpha(0); this.info.setAlpha(0)},
            }) : this.tweens.add({
              targets: this.pannelBottom ,
              alpha: 1,
              repeat: 0,
              duration: 300,
              onComplete: (a, e) => { this.pannelRight.setAlpha(1); this.info.setAlpha(1)},
            })
            ;
            this.info.setAlpha(0);
            console.log(this.pannelRight.alpha)



    }

    var distance = Phaser.Math.Distance.Between(this.ennemy.x, this.ennemy.y, this.girlMap.x, this.girlMap.y);

    //  4 is our distance tolerance, i.e. how close the source can get to the target
    //  before it is considered as being there. The faster it moves, the more tolerance is required.
    if (distance < 5) {
      this.ennemy.body.reset(this.girlMap.x, this.girlMap.y);
      this.ennemy.anims.play("attack", true)
      this.girlMap.on('animationcomplete', () => {
        this.ennemy.anims.play("idle_attack", true)
      })
    } else {
    }





    // console.log(this.barrel.depth)
    // console.log("_______________")
    // console.log(this.ombre.depth)
  }
}
