import 'bootstrap';
import { gsap } from 'gsap';
import './scenes';
document.addEventListener('DOMContentLoaded',()=>{
  gsap.from('.reveal',{y:28,opacity:0,duration:.85,stagger:.12,ease:'power3.out'});
  const cards=[...document.querySelectorAll('.spec-card,.news-card,.glass-panel')];
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){gsap.fromTo(e.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:'power2.out'});io.unobserve(e.target)}}),{threshold:.12});
    cards.forEach(c=>io.observe(c));
  }
});