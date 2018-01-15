import sayHello from './lib/sayHello.js';

sayHello();
import $ from 'jquery';

let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = 40;

let x, y;

function Draw(t) {
  // ctx.clearRect(0,0,canvas.width,900);

  // for (var j=1; j<2; j++) {
  x = t*4.5;
  y = 20;
  ctx.fillStyle = 'hsl('+9*t/2+',100%,50%)';
  // ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI);
  // ctx.closePath();
  ctx.fill();
  // }
}

let t = 0;
function Render() {
  t++;
  Draw(t);
  window.requestAnimationFrame(Render);
}

Render();


import { TimelineMax } from 'gsap';

var tl = new TimelineMax;

tl
  .staggerFromTo('.js-danke-top span', 1.5, {y:-200,opacity:0},{y:0,opacity:1},0.25,0)
  .staggerFromTo('.js-tank-top span', 1.5, {y:-200,opacity:0,rotation:0,scale:0.1},{y:0,opacity:1,rotation:720,scale:1},0.25,0)
  .staggerFromTo('.js-kiitos-top span', 1.5, {y:-200,opacity:0},{y:0,opacity:1},0.25,0)
  .staggerFromTo('.js-center-top span', 0.5, {y:-100, opacity:0}, {y:0, opacity:1},0.25)
  .staggerFromTo('.js-bottom-top .list__item', 0.5, {y:200,opacity:0,scale:0},{y:0,opacity:1,scale:1},0.25);


$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  $('.js-content-top').each(function() {
    // $(this).addClass('is-inviewport');
    var myel = $(this);
    if (myel.isInViewport()) {
      // myel.addClass('is-in');
      if (!$(this).hasClass('already-animated')) {
        let tl = new TimelineMax(
          {
            onComplete: function() {
              myel.addClass('already-animated');
            }
          }
        );
        tl
          .fromTo(myel, 1, 
            { y: -100, opacity: 0}, 
            { y: 0, opacity: 1}
          )
          .fromTo('.js-h1-bottom', 1.5, 
            {x: -1000, opacity: 0}, 
            {x: 0, opacity: 1}, 0
          )
          .fromTo('.js-h2-bottom', 2,
            {y: 100, opacity: 0, scale: 0.1},
            {y: 0, opacity: 1, scale: 1}, 0
          )
          .fromTo('.js-h4-bottom', 2,
            {y: 100, opacity: 0, scale: 0.1},
            {y: 0, opacity: 1, scale: 1}, 0
          );
      }
    // } else {
    //   myel.removeClass('is-in');
    }
  });
});
