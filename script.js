/* PARTICLES */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    dx:(Math.random()-0.5),
    dy:(Math.random()-0.5)
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx;
    p.y+=p.dy;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle="#2563eb";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

/* GLOBE */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,400/400,0.1,1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(400,400);
document.getElementById("globe-container").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2,32,32);
const material = new THREE.MeshBasicMaterial({
  color:0x2563eb,
  wireframe:true
});
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);
camera.position.z=5;

function animateGlobe(){
  requestAnimationFrame(animateGlobe);
  sphere.rotation.y+=0.01;
  renderer.render(scene,camera);
}
animateGlobe();

/* FORM LOGIC */
const role = document.getElementById("role");
const researcherFields = document.getElementById("researcherFields");
const clientFields = document.getElementById("clientFields");

researcherFields.style.display="none";
clientFields.style.display="none";

role.addEventListener("change",function(){
  researcherFields.style.display =
    this.value==="Researcher"?"block":"none";
  clientFields.style.display =
    this.value==="Client"?"block":"none";
});