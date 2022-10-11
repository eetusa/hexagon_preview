

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const matrix_form = document.getElementById('matrix_setup')
const matrix_button = document.getElementById('matrixbutton')

var width_m = 1;
var height_m = 0.8;

canvas.width = window.innerWidth*width_m;
canvas.height = window.innerHeight*height_m;

let mouse = {
    x: 0,
    y: 0
}


// Eventlisteners
addEventListener("mousemove", function(event){
    let a = getMousePos(canvas, event);
    mouse.x = a.x;
    mouse.y = a.y;
});

addEventListener("resize",function(){
    canvas.width = window.innerWidth*width_m;
    canvas.height = window.innerHeight*height_m;
});

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }


// Objects
//let hexagon = new Hexagon(mouse.x,mouse.y,50,"red");
let _SIDE_LENGTH = 40;
let imageloader = new ImageLoader();
let imagedisplay = new ImageDisplay(imageloader.getImages(), _SIDE_LENGTH);
let hexgrid = new HexGrid(_SIDE_LENGTH);
let select_many = false;



function init(){

    // addEventListener('resize', (e) => {
    //     canvas.width = window.innerWidth*95;
    //     canvas.height = window.innerHeight*80;
    // })

    matrix_button.addEventListener('click', (e) => {
        let row_count = matrix_form[0].value;
        let col_count = matrix_form[1].value;
        let side_len = matrix_form[2].value;

        if (isPositiveInteger(row_count) && isPositiveInteger(col_count) && isPositiveInteger(side_len)){
            hexgrid.changeRowAndColCount(row_count, col_count, side_len);
        }
        
    })

    addEventListener('keydown', (e) =>{
        if (e.key === 'Enter'){
            let row_count = matrix_form[0].value;
            let col_count = matrix_form[1].value;
            let side_len = matrix_form[2].value;
    
            if (isPositiveInteger(row_count) && isPositiveInteger(col_count) && isPositiveInteger(side_len)){
                hexgrid.changeRowAndColCount(row_count, col_count, side_len);
            }
        }
    })


    addEventListener('keyup', function(e){
        if (e.keyCode == 82){
            hexgrid.setSelectedRandom(imageloader.getImages(), imagedisplay.getRandomImages())
        }
    })

    canvas.addEventListener('click', function(e){
        let imd = imagedisplay.selectHexagon(mouse.x, mouse.y);
        if (select_many && imd){
            let i = imd.i;
            imagedisplay.toggleRandomImage(i);
        }
        if (imd){
            if (!select_many)
                hexgrid.setSelectedImage(imd.image)
        } else{
            hexgrid.selectHexagon(mouse.x, mouse.y);
        }
    })

    addEventListener('keydown', function(e){
        if (e.keyCode == 16){
            select_many = true;
        }
    })

    addEventListener('keyup', function(e){
        if (e.keyCode == 16){
            select_many = false;
        }
    })

    addEventListener('keydown', function(e){
        if (e.keyCode == 17){
            ctrl = true;
        }
    })

    addEventListener('keyup', function(e){
        if (e.keyCode == 17){
            ctrl = false;
        }
    })

    addEventListener('keyup', function(e){
        if (e.keyCode == 65){
            if (select_many){
                hexgrid.selectAll();
            }
        }
    })


    addEventListener('keydown', function(e){{
        switch(e.keyCode){
            case 49:
                if (imageloader.getImages().length > 0){
                    hexgrid.setSelectedImage(imageloader.getImages()[0])
                }
                break;
            case 50:
                if (imageloader.getImages().length > 1){
                    hexgrid.setSelectedImage(imageloader.getImages()[1])
                }
                break;
            case 51:
                if (imageloader.getImages().length > 2)
                    hexgrid.setSelectedImage(imageloader.getImages()[2])
                break;
            case 52:
                if (imageloader.getImages().length > 3)
                    hexgrid.setSelectedImage(imageloader.getImages()[3])
                break;
            case 53:
                if (imageloader.getImages().length > 4)
                    hexgrid.setSelectedImage(imageloader.getImages()[4])
                break;
            case 54:
                if (imageloader.getImages().length > 5)
                    hexgrid.setSelectedImage(imageloader.getImages()[5])
                break;
            case 55:
                if (imageloader.getImages().length > 6)
                    hexgrid.setSelectedImage(imageloader.getImages()[6])
                break;
            case 56:
                if (imageloader.getImages().length > 7)
                    hexgrid.setSelectedImage(imageloader.getImages()[7])
                break;
            case 57:
                if (imageloader.getImages().length > 8)
                    hexgrid.setSelectedImage(imageloader.getImages()[8])
                break;
            case 48:
                if (imageloader.getImages().length > 9)
                    hexgrid.setSelectedImage(imageloader.getImages()[9])
                break;
        }
    }})



}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
   // hexagon.setCoordinates(mouse.x, mouse.y);
  //  hexagon.draw();
    hexgrid.update();
    imagedisplay.update();


}


init();
animate();

