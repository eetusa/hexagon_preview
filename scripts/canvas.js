

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height= innerHeight;

// Variables
let mouse = {
    x: 0,
    y: 0
}


// Eventlisteners

addEventListener("mousemove", function(event){

    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize",function(){
    canvas.width = innerWidth;
    canvas.height= innerHeight;

    init();
});




// Objects
//let hexagon = new Hexagon(mouse.x,mouse.y,50,"red");
let _SIDE_LENGTH = 50;
let imageloader = new ImageLoader();
let imagedisplay = new ImageDisplay(imageloader.getImages(), _SIDE_LENGTH);
let hexgrid = new HexGrid(_SIDE_LENGTH);
let select_many = false;
let ctrl = false;




function init(){

    // hexagons.push(new Hexagon(mouse.x,mouse.y,50,"yellow"));
    addEventListener('keyup', function(e){
        if (e.keyCode==69){
            // hexagons.push(new Hexagon(mouse.x,mouse.y,50,"red"));
            
        }
    });

    addEventListener('click', function(e){
        hexgrid.selectHexagon(mouse.x, mouse.y);
    })

    addEventListener('keydown', function(e){
        if (e.keyCode == 16){
            select_many = true;
           // console.log(select_many)
        }
    })

    addEventListener('keyup', function(e){
        if (e.keyCode == 16){
            select_many = false;
          //  console.log(select_many)

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
            if (ctrl){
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

