function imagedata_to_image(imagedata) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
}


window.onload = function () {
    //canvas
    let inputImg = document.getElementById('inputImg');
    let cnv = document.getElementById('canvas');
    let ctx = cnv.getContext('2d');
    let img = new Image()//img
    let current_img = new Image()
    let reader =  new FileReader();
    cnv.width = 400;
    cnv.height = 550;
    let width = 400;
    let height = 550;
    inputImg.addEventListener('input', image, false);

    //функция фильтра сеппия
    let sepia = function (imageData) {
      // получаем одномерный массив, описывающий все пиксели изображения
    let pixels = imageData.data;
      // циклически преобразуем массив, изменяя значения красного, зеленого и синего каналов
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        pixels[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
        pixels[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
        pixels[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }
    return imageData;
    };
    
    //загрузка img в canvas
    function image(e) {
        ctx.clearRect(0, 0, cnv.width, cnv.height);//очистить контекст перед загрузкой img
        reader.onload = function (e) {
            img.onload = function () {
                let ratio = img.width / img.height; //соотношение сторон img
                height = width / ratio;
                cnv.width = width;
                cnv.height = height;
                current_img = img; //Сохраняем неизмененное изображение для возвращения
                console.log(current_img)
                ctx.drawImage(img, 0, 0, width, height);//помещение изображения в контекст

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
            //фильтры
                let sepia_button=document.querySelector('#sepia');
                sepia_button.addEventListener('input', updateFilterVal);

                function updateFilterVallet(){
                    let img_data = sepia(ctx.getImageData(0, 0, width, height))
                    ctx.putImageData(img_data, 0, 0);
                    img = imagedata_to_image(img_data)
                }


                }//img.onload
                img.src = e.target.result;
                console.log(reader.result);
            }//reader.onload
            reader.readAsDataURL(e.target.files[0])
        }//image

    //cохранить изображение
    document.getElementById('dowload').addEventListener('click', () => {
    let aElement = document.createElement('a')
    aElement.setAttribute('download', "img.jpg")
    aElement.href = cnv.toDataURL("image/jpg")
    aElement.click()
})

document.getElementById('clear').addEventListener('click', () => {
    img = current_img;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
})
}//onload