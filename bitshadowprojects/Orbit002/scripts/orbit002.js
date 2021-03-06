var palette = new BitShadowMachine.ColorPalette();
      palette.addColor({
        min: 12,
        max: 24,
        startColor: [248, 215, 173],
        endColor: [230, 186, 131]
      }).addColor({
        min: 12,
        max: 24,
        startColor: [244, 192, 157],
        endColor: [218, 149, 103]
      }).addColor({
        min: 12,
        max: 24,
        startColor: [255, 243, 216],
        endColor: [230, 210, 167]
      }).addColor({
        min: 12,
        max: 24,
        startColor: [250, 219, 142],
        endColor: [222, 182, 84]
      }).addColor({
        min: 12,
        max: 24,
        startColor: [252, 221, 205],
        endColor: [219, 164, 134]
      });

      var totalItems = 500;
      var getRandomNumber = BitShadowMachine.Utils.getRandomNumber;

      function Box(opt_options) {
        var options = opt_options || {};
        options.name = 'Box';
        BitShadowMachine.Item.call(this, options);
      }
      BitShadowMachine.Utils.extend(Box, BitShadowMachine.Item);

      Box.minAmp = 10;
      Box.maxAmp = 40;
      Box.minAccel = 0.025;
      Box.maxAccel = 0.15;
      Box.minSize = 1;
      Box.maxSize = 7;

      // An init() method is required.
      Box.prototype.init = function(options) {

        this.color = options.color || [100, 100, 100];
        this.location = options.location || new BitShadowMachine.Vector(this.world.width / 2, this.world.height / 2);
        this.lastLocation = new BitShadowMachine.Vector();
        this.velocity = new BitShadowMachine.Vector();
        this.maxSpeed = Box.maxAmp;

        this.initialLocation = options.initialLocation ||
            new BitShadowMachine.Vector(this.world.width / 2, this.world.height / 2);
        this.amplitude = options.amplitude || new BitShadowMachine.Vector(this.world.width / 2 - this.width,
            this.world.height / 2 - this.height);
        this.acceleration = options.acceleration || new BitShadowMachine.Vector(0.05, 0.05);
        this.aVelocity = options.aVelocity || new BitShadowMachine.Vector();

        //

        this.amplitude = options.amplitude || new BitShadowMachine.Vector(40, 40);

        this.scale = BitShadowMachine.Utils.map(this.acceleration.mag(), Box.minAccel, Box.maxAccel,
            Box.minSize, Box.maxSize);
        this.opacity = BitShadowMachine.Utils.map(this.acceleration.mag(), Box.minAccel, Box.maxAccel,
            1, 0.5);

        this.pointToDirection = true;

      };

      Box.prototype.step = function () {

        var world = this.world, velDiff;

        if (this.beforeStep) {
          this.beforeStep.apply(this);
        }

        this.aVelocity.add(this.acceleration); // add acceleration

        this.location.x = this.initialLocation.x + Math.cos(this.aVelocity.x) * this.amplitude.x;
        this.location.y = this.initialLocation.y + Math.sin(this.aVelocity.y) * this.amplitude.y;

        if (this.pointToDirection) { // object rotates toward direction
          var velDiff = BitShadowMachine.Vector.VectorSub(this.location, this.lastLocation);
          this.angle = BitShadowMachine.Utils.radiansToDegrees(Math.atan2(velDiff.y, velDiff.x));
        }

        this.velocity.x = this.amplitude.x;
        this.velocity.y = this.amplitude.y;

        if (this.pointToDirection) {
          this.lastLocation.x = this.location.x;
          this.lastLocation.y = this.location.y;
        }
      }
      /**
       * Tell BitShadowMachine where to find classes.
       */
      BitShadowMachine.Classes = {
        Box: Box
      };

      /**
       * Passes a reference to a DOM element as the world.
       */
      var worldA = new BitShadowMachine.World(document.getElementById('worldA'), {
        resolution: 4,
        width: 960,
        height: 540,
        backgroundColor: [0, 0, 0],
        colorMode: 'rgba',
        hue: 0,
        saturation: 0,
        lightness: 0
      });

      /**
       * Create a new BitShadowMachine system.
       */
      BitShadowMachine.System.init(function() {
        for (var i = 0; i < totalItems; i++) {

          var amp = new BitShadowMachine.Vector(1, 1);
          amp.normalize();
          amp.mult(getRandomNumber(Box.minAmp, Box.maxAmp));
          amp.rotate(BitShadowMachine.Utils.degreesToRadians(getRandomNumber(0, 180)));

          var accel = new BitShadowMachine.Vector(1, 1);
          accel.normalize();
          accel.mult(getRandomNumber(Box.minAccel * 1000, Box.maxAccel * 1000) * 0.001);
          accel.rotate(BitShadowMachine.Utils.degreesToRadians(0));

          this.add('Box', {
            color: palette.getColor(),
            hue: getRandomNumber(0, 30, true),
            saturation: 0,
            lightness: 1,
            amplitude: amp,
            acceleration: accel,
            aVelocity: new BitShadowMachine.Vector(getRandomNumber(0, 4, true), getRandomNumber(0, 4, true))
          });
        }
      }, worldA, Modernizr);