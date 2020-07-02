window.onload=function(){
    let inputImg = document.getElementById('inputImg');
    inputImg.addEventListener('change', image, false);
    let cnv = document.getElementById('canvas');
    let ctx = cnv.getContext('2d');
    canvas.width = 650;
    canvas.height = 650;
    
    function image(e){
        let reader = new FileReader();
        reader.onload = function(e){
            let img = new Image();
            img.onload = function(){
            ctx.drawImage(img,0,0);
            }
            img.src = e.target.result;
        }
            reader.readAsDataURL(e.target.files[0]);    
    }
}