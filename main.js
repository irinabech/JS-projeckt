window.onload=function(){
    //canvas
    let inputImg = document.getElementById('inputImg');
    inputImg.addEventListener('change', image, false);
    let cnv = document.getElementById('canvas');
    let ctx = cnv.getContext('2d');
    canvas.width = 650;
    canvas.height = 650;
    
    //загрузка img в canvas
    let img = new Image();
    let reader = new FileReader();
    function image(e){
        reader.onload = function(e){
            img.onload = function(){
            ctx.drawImage(img,0,0);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
        console.log(reader);
        console.log(img);
    
    }//image 
    
    //drop menu 
    let dropMenu = document.getElementsByClassName("dmElement");
    for (let i = 0; i < dropMenu.length; i++) {
        dropMenu[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
        })
    }
}//onload

