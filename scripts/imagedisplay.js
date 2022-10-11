class ImageDisplay{
    constructor(images, side_length){
        this.images = images;
        this.grid = [];
        this.start_x = 80;
        this.start_y = 100;
        this.side_length = side_length;
        this._c = Math.cos(0.523598776) * (this.side_length*2);
        this.random_images = [];
        this.init();
    }

    init(){
        for (let i = 0; i < this.images.length; i++){
          //  let x = this.start_x + i*this.side_length*4+50;
          //  let x = this.start_x + i*this.side_length*3;
            let x = this.start_x;
           // let y = this.start_y + i*this._c*2 + 30;
            let y = this.start_y + this._c*i;
            if (i%2 !== 0){
                x += this.side_length*3;
            }
            this.grid.push(new Hexagon(x, y, this.side_length, "red"));
            this.grid[i].changeImage(this.images[i]);
            this.random_images.push(true);
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
        for (let i = 0; i < this.grid.length; i++){
            let hex = this.grid[i];
            let random = this.random_images[i];
            hex.drawImageWithMask(random);
        }
        // this.grid.forEach(hex =>{
        //     hex.drawImageWithMask()
        // })
    }

    distance(fromX, fromY, toX, toY){
        return Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));
    }

    selectHexagon(x, y){
        let closest = {ii: -1};
        let closest_d = 999999;

        for (let i = 0; i < this.grid.length; i++){
                let d = this.distance(x, y, this.grid[i].x, this.grid[i].y);
                if (d < closest_d){
                    closest_d = d;
                    closest = {ii: i};
                }
        }
        if (closest_d < 2*this.side_length){
            return {"image": this.images[closest.ii], "i": closest.ii};
        } 
    }

    getRandomImages(){
        return this.random_images;
    }

    addToRandomImages(i){
        this.random_images[i] = true;
    }

    toggleRandomImage(i){
        this.random_images[i] = !this.random_images[i];
    }

    deleteFromRandomImages(i){
        console.log(this.random_images)
        this.random_images[i] = false;
        console.log(this.random_images)
    }


}