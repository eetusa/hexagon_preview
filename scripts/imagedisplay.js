class ImageDisplay{
    constructor(images, side_length){
        this.images = images;
        this.grid = [];
        this.start_x = 100;
        this.start_y = 100;
        this.side_length = side_length;
        this._c = Math.cos(0.523598776) * (this.side_length*2);
        this.init();
    }

    init(){
        for (let i = 0; i < this.images.length; i++){
            let x = this.start_x + i*this.side_length*4+50;
           // let y = this.start_y + i*this._c*2 + 30;
            let y = this.start_y;
            this.grid.push(new Hexagon(x, y, this.side_length, "red"));
            this.grid[i].changeImage(this.images[i]);
            this.grid[i].text = "" + (i+1);
            // this.grid.push([]);
            // for (let j = 0; j < this.grid_width; j++){

            //     if (i % 2 === 0){
            //         if (j % 2 === 0){
            //             let x = this.start_x + (3*j)*this.side_length;
            //             let y = this.start_y + (i)*this.c;
            //              this.grid[i].push(new Hexagon(x, y, this.side_length, "red"));
            //         }
            //     } else {
            //         if (j % 2 === 0){
            //             let x = this.start_x + 3*this.side_length + (3*j)*this.side_length;
            //             let y = this.start_y +this.c + (i-1)*this.c;
            //             this.grid[i].push(new Hexagon(x, y, this.side_length, "red"));
            //         }
            //     }
            // }
        }
        console.log(this.grid)
    }

    update(){ 
        this.grid.forEach(hex =>{
            hex.drawImageWithMask()
        })
    }

}