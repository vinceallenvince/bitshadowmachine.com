/**
 * Tell BitShadowMachine where to find classes.
 */
BitShadowMachine.Classes = {
  Box: Box
};

var worldA = new BitShadowMachine.World();

/**
 * Create a new BitShadowMachine system.
 */
BitShadowMachine.System.init(function() {
  this.add('Box');
}, null, Modernizr);