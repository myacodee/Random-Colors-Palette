const randomColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10', 'color-11', 'color-12', 'color-13', 'color-14'];
let customColors = [];

const container = document.querySelector('.palette');
const customContainer = document.querySelector('.custom-palette');
const changeBtn = document.querySelector('.btn-change');


/*  CREATE TEMPLATE - 14 COLORS  */
function logArrayElements() {
    let template = `
    <div class="palette__container">
        <div class="palette__colors">
        <ion-icon name="add-circle"></ion-icon></div>
        <span></span>
    </div>
    `;
    container.insertAdjacentHTML("beforeend", template);

    let getColors = document.querySelectorAll('.palette__colors');
    getHex(getColors);
}

/*  GENERATE RANDOM HEX COLOR  */  
function getRandomColor() {
    let color = '#';
    let hex = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];}
    return color;
}

/*  CHANGE RGB TO HEX */
rgbToHex = (rgb) => { 
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex += "0";}
    return hex;
};

/*  GET THE FULL HEX (FOR THE SPAN ELEMENT) */
fullColorHex = (r,g,b) => {   
    let red = rgbToHex(r),
        green = rgbToHex(g),
        blue = rgbToHex(b);
    return red + green + blue;
};

/*  GET THE HEX CODE */
getHex = (colors) => {
    for(let i = 0; i < colors.length; i++)  {
        colors[i].style.background  = getRandomColor();
        let getColors = colors[i].style.background;
        let rgb = /rgb\((\d+), (\d+), (\d+)\)/.exec(getColors);
        let r = rgb[1],
            g = rgb[2],
            b = rgb[3];

        /* text span element */
        colors[i].nextElementSibling.textContent = "#" + fullColorHex(r, g, b);
    }
}

randomColors.forEach(logArrayElements);

/*  CLICK TO CHANGE RANDOM COLORS */
changeBtn.addEventListener('click', (e)  => {
    let getColors = document.querySelectorAll('.palette__colors');
    getHex(getColors);
});


/*  MESSAGE WHEN IS EMPTY THE CUSTOM PALETTE   */
message = () => {
    let text = document.querySelector('.text');
    if(customColors.length === 0) {
        text.style.display = "block";
    } else if(customColors.length !== 0){
        text.style.display = "none";
    };
};
message();

/*  CREATE TEMPLATE CUSTOM PALETTE */
let getColors = document.querySelectorAll('.palette__colors');
getColors.forEach(function(check) {
  check.addEventListener('click', (e) => {

      let index = Array.from(getColors).indexOf(e.target);
      let selected = getColors[index];
      if(customColors.length < 6) {

        customColors.push(selected);

        let template = `
        <div class="custom__box" style="background:${selected.style.background};"><ion-icon name="trash"></ion-icon></div>
        <span>${selected.nextElementSibling.textContent}
        </span>
        `;
        customContainer.insertAdjacentHTML('beforeend', template);
      };
      
      message();
  });
});

/*  DELETE TEMPLATE CUSTOM  */
document.querySelector('body').addEventListener('click', (e) => {
    if(e.target.classList.contains('custom__box')) {

        let selected = e.target.nextElementSibling;
        e.target.classList.add('animate');
        selected.classList.add('animate');
        let index = Array.from(e.target).indexOf(e.target);
        customColors.splice(index);

        setTimeout(() => {
            e.target.parentNode.removeChild(e.target);
            selected.parentNode.removeChild(selected);
            message();
        }, 200);
    };
    console.log(customColors.length)
  });