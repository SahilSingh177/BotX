const btn = document.getElementsByClassName('button')[0];
const links = document.getElementsByClassName('links')[0];

btn.addEventListener('click', ()=>{
    links.classList.toggle('active');
})