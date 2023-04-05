//Marycruy Yong Tencio, change the position of the M changing 
//the x and the y. Use mouse pressed for a surprise!

let x= 100;
let y= 100;


//Random colors of the shapes

let color1;
let color2;
let color3;
let color4;




function setup() {
  createCanvas(600, 600);

  staticolor = color(255, 255, 255);

}

function draw() {
  
  background(0);
  
  
  if (mouseIsPressed) {

    //Random Color when maouse pressing  

    color1= color(random(255), random(255), random(255));
    color2= color(random(255), random(255), random(255));
    color3= color(random(255), random(255), random(255));
    color4= color(random(255), random(255), random(255));

  } else {

    //If mouse not pressing just stay black 
   color1= staticolor;
   color2= staticolor;
   color3= staticolor;
   color4= staticolor;

  }
  
  //Left rectangle
  
  fill(color1);
  rect (x-30,y-20,60,300);
  
  //Left quad
  
  fill (color2);
  quad (x-30,y-20,x+30,y-20,x+180,y+180,x+115,y+180);
  
  //Right quad
  
  fill (color3);
  quad (x+280,y-20,x+340,y-20,x+180,y+180,x+115,y+180);
  
   //Right rectangle
  
  fill (color4);
  rect (x+280,y-20,60,300);
}

