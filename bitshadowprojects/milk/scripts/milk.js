  var getRandomNumber = BitShadowMachine.Utils.getRandomNumber;

  /**
   * Tell BitShadowMachine where to find classes.
   */
  BitShadowMachine.Classes = {
    Box: Box
  };

  var worldA = new BitShadowMachine.World(document.getElementById('worldA'), {
    width: 700,
    height: 450,
    resolution: 4,
    colorMode: 'rgba',
    backgroundColor: [113, 142, 66],
    noMenu: true,
    gravity: new BitShadowMachine.Vector()
  });

  BitShadowMachine.System.zSort = 1;

  /**
   * Create a new BitShadowMachine system.
   */
  BitShadowMachine.System.init(function() {

    for (var i = 0; i < 10; i++) {
      this.add('Box', {
        color: [106, 130, 66],
        zIndex: 2,
        location: new BitShadowMachine.Vector(getRandomNumber(1, worldA.width - 8), getRandomNumber(40, worldA.height - 8)),
        acceleration: new BitShadowMachine.Vector(-2, 0)
      });
    }

    this.add('Anim', {
      location: new BitShadowMachine.Vector(30, 38),
      frameDuration: 1,
      zIndex: 50,
      frames: frames
    });

    this.add('Anim', {
      location: new BitShadowMachine.Vector(100, 4),
      frameDuration: 1,
      zIndex: 2,
      frames: framesBarn
    });

    //

    var container = document.getElementById('container_world');
    container.style.boxShadow = 'inset 0px 132px 0 0 rgb(192, 240, 255)';

  }, worldA);