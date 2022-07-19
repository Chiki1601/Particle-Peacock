jQuery(document).ready(function($){
  var angles = [90, 75, 60, 45, 30, 15];
  var feathersl = gsap.utils.toArray('.feather.left');
  var feathers = gsap.utils.toArray('.feather');
  var feathersr = gsap.utils.toArray('.feather.right');
  var randomrotate = gsap.utils.random(-10, 10, 5, true);
  
let feathersonload = gsap.timeline({paused: true,});
  feathersonload
     .to(feathers, {
  rotation: randomrotate,
  duration:0.2, 
  ease:'none',
  transformOrigin:'center bottom',
    repeat: 1,
    yoyo: true,
})
  ;

  
    let featherstll = gsap.timeline({paused: true,});
   
  featherstll 
    .to(feathersl, {
  rotation:function(i, target, list) {
    return angles[i]},
  duration:function(i, target, list) {
    return 0.5 + (i*0.01)}, 
  ease:'none',
  transformOrigin:'center bottom',
})
      .to(feathersr, {
  rotation:function(i, target, list) {
    return -angles[i]},
  duration:function(i, target, list) {
    return 0.5 + (i*0.01)}, 
  ease:'none',
  transformOrigin:'center bottom',
},"<")
  ;
  

var target = $(".peacock-body");

  
 target.on('mouseenter', function(e) { 
featherstll.restart();
$(".peacock-body").addClass("hover");
});

 target.on('mouseleave', function(e) { 
featherstll.reverse();
$(".peacock-body").removeClass("hover");
});
  
    
      /* flutter logic */
      function flutterLogic() {
        var r = Math.random();
        
        // single blink
        if (r<0.5) {
          flutterFeathers();
        }
        
        // slow double blink
        else if (r < 0.8) {
          
          flutterFeathers();
          setTimeout(flutterFeathers, 500 + Math.random()*400);
        }
      }
  
        function flutterFeathers() {
 if ( !$(".peacock-body").hasClass("hover") ) {
   gsap.set(".feather", {
     rotate: 0,
   });
        feathersonload.restart();
        setTimeout(function() {
         feathersonload.restart();
        }, 100);
          }
      }
        /* check  logic every 5200 ms */
      setInterval(flutterLogic, 5200);  
  
  var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {x:0,y:0},
  radius = 0.3;

var colors = ["#3F10A1","#6540B4", "#004645", "#064273", "#104032", "#03213A",];

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x,y){
  this.x =  Math.random()*ww;
  this.y =  Math.random()*wh;
  this.dest = {
    x : x,
    y: y
  };
  this.r =  Math.random()*5 + 1;
  this.vx = (Math.random()-0.5)*10;
  this.vy = (Math.random()-0.5)*10;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random()*0.05 + 0.94;

  this.color = colors[Math.floor(Math.random()*6)];
}

Particle.prototype.render = function() {


  this.accX = (this.dest.x - this.x)/1500;
  this.accY = (this.dest.y - this.y)/1500;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y +=  this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt( a*a + b*b );
  if(distance<(radius*100)){
    this.accX = (this.x - mouse.x)/500;
    this.accY = (this.y - mouse.y)/500;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e){
  if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

  var img = new Image();
  img.src = "https://assets.codepen.io/588944/peacock-body-only-01.svg";
  img.crossOrigin = "Anonymous";

  
function initScene(){

  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
        var wrh = img.width / img.height;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
					newHeight = canvas.height;
        	newWidth = newHeight * wrh;
      	}
        var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

  ctx.clearRect(0, 0, ww, wh);
  ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);

  var data  = ctx.getImageData(0, 0,  ww, wh).data;
  ctx.clearRect(0, 0,  ww, wh);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for(var i=0;i<ww;i+=Math.round(ww/500)){
    for(var j=0;j<wh;j+=Math.round(ww/500)){
      if(data[ ((i + j*ww)*4) + 3] > 150){
        particles.push(new Particle(i,j));
      }
    }
  }
  amount = particles.length;

}



function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
  
};

window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);
  setTimeout(function (){
    initScene();
  requestAnimationFrame(render);

}, 1000);

    gsap.to(".peacock-area", {
   opacity: 1,
    duration: 2.5,
      delay: 6,
  });
  
});