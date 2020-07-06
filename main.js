window.onload = function () {
    //canvas
    let inputImg = document.getElementById('inputImg');
    let cnv = document.getElementById('canvas');
    let ctx = cnv.getContext('2d');
    let img = new Image()//img, получаемое при загрузке
    let reader = new FileReader();
    cnv.width = 650;
    cnv.height = 650;
    inputImg.addEventListener('change', image, false);

    //загрузка img в canvas
    function image(e) {
        ctx.clearRect(0, 0, cnv.width, cnv.height);//очистить контекст перед загрузкой img
        reader.onload = function (e) {
            img.onload = function () {
                console.log(this.width + 'x' + this.height);
                let ratio = this.width / this.height; //соотношение сторон img
                let width = 650;
                let height = width / ratio;
                ctx.drawImage(img, 0, 0, width, height);//помещение изображения в контекст
            }//img.onload
            img.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
        //console.log(img);
    }//image
    
    //drop menu 
    let dropMenu = document.getElementsByClassName("dmElement");
    for (let i = 0; i < dropMenu.length; i++) {
        dropMenu[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        })
    }
    //Панель фильров
    
}//onload

