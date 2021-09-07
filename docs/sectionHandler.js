let sections = document.getElementsByTagName("section");
let dots = document.getElementsByClassName("dot");
let sectionIndex = 0;
let arrowDown = document.querySelector(".arrow-down");

function updateDots(){
    Array.prototype.forEach.call(dots, dot => {
        dot.style.background = "transparent";
    });
    dots[sectionIndex].style.background = "#ffffff";
    if(sectionIndex+1==dots.length){
        arrowDown.classList.toggle('hidden');
        arrowDown.style.opacity = 0;
    }
    else{
        arrowDown.classList.toggle('hidden');
        arrowDown.style.opacity = 1;
    }
}

function changeSection(index){
    Array.prototype.forEach.call(sections, section => {
        section.style.visibility = "hidden";
    })
    sectionIndex = index;
    sections[sectionIndex].style.visibility = "visible";
    updateDots();
}

document.addEventListener("wheel", e => {
    if(e.deltaY>0 && sectionIndex+1 < sections.length){
        changeSection(sectionIndex+1);        
    }
    else if(e.deltaY<0 && sectionIndex > 0){
        changeSection(sectionIndex-1);                
    }
})

Array.prototype.forEach.call(dots, dot => {
    dot.addEventListener("click", e => {
        id = e.target.id
        index = id.substr(id.length - 1)-1;
        changeSection(index);
    });
});

document.querySelector(".invite-button").onclick = function(){
    location.href = "https://discord.com/oauth2/authorize?client_id=819316891062763540&scope=bot&permissions=4050113";
};