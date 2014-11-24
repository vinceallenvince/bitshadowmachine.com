var base = new TinyTornado.Vortex.Base({
  perlinSpeed: 0.002
});
var debris = new TinyTornado.Vortex.DebrisBit();
var spine = new TinyTornado.Vortex.Spine({
  density: 10
});
var shell = new TinyTornado.Vortex.ShellBit();

var vortex = new TinyTornado.Vortex.RunnerBit(base, debris, spine, shell);
vortex.init({
  el: document.getElementById('worldA')
});

var playerLow = new SoundBed.Player();
playerLow.init({
  perlin: true,
  reverb: 5,
  oscAFreq: 60,
  oscBFreq: 120,
  oscARate: 0.1,
  oscBRate: 0.12,
  freqMin: 60,
  freqMax: 120,
  volumeMin: 0.5,
  volumeMax: 1
});