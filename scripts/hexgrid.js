class HexGrid{
    constructor(side_length){
        this.side_length = side_length;
        this.grid = [];
        this.grid_width = 8;
        this.grid_height = 8;
        this.x_offset = 0;
        this.y_offset = 0;
        this.start_x = 380;
        this.start_y = 100;
        this.c = Math.cos(0.523598776) * (this.side_length*2);
        this.selected = [];
        this.init();
        matrix_form[0].value = this.grid_height;
        matrix_form[1].value = this.grid_width;
        matrix_form[2].value = this.side_length;

    }

    init(){
        let new_grid = [];
        let temp_grid = [...this.grid];
        this.grid.length = 0;
        this.grid = []

        // while(this.grid.length > 0){
        //     this.grid.pop();
        // }
        this.selected.length = 0;

        for (let i = 0; i < this.grid_height; i++){
            new_grid.push([]);
            for (let j = 0; j < this.grid_width; j++){

                if (i % 2 === 0){
                    if (j % 2 === 0){
                        let x = this.start_x + (3*j)*this.side_length;
                        let y = this.start_y + (i)*this.c;
                        new_grid[i].push(new Hexagon(x, y, this.side_length, "red"));
                      //  console.log(JSON.parse(JSON.stringify(new_grid.length + " " + i)))

                        if (temp_grid.length === 0) continue;

                        if ( (new_grid.length <= temp_grid.length) && new_grid[i].length <= temp_grid[i].length){
                            new_grid[i][new_grid[i].length-1].img.src = temp_grid[i][new_grid[i].length-1].img.src
                        } 
                    }
                } else {
                    if (j % 2 === 0){
                        let x = this.start_x + 3*this.side_length + (3*j)*this.side_length;
                        let y = this.start_y +this.c + (i-1)*this.c;
                        new_grid[i].push(new Hexagon(x, y, this.side_length, "red"));

                        if (temp_grid.length === 0) continue;

                        if ( (new_grid.length <= temp_grid.length) && new_grid[i].length <= temp_grid[i].length){
                            new_grid[i][new_grid[i].length-1].img.src = temp_grid[i][new_grid[i].length-1].img.src
                        } 
                    }
                }
            }
        }

        this.grid = [...new_grid];
    }

    getGrid(){
        return this.grid;
    }

    update(){ 
        this.grid.forEach(row =>{
            row.forEach(hex => hex.drawImageWithMask())
        })
    }

    distance(fromX, fromY, toX, toY){
        return Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2));
    }

    selectHexagon(x, y){
        let closest = {ii: -1, jj: -1};
        let closest_d = 999999;

        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                let d = this.distance(x, y, this.grid[i][j].x, this.grid[i][j].y);
                if (d < closest_d){
                    closest_d = d;
                    closest = {ii: i, jj: j};
                }
            }
        }
        if (closest_d < 2*this.side_length){
            if (!select_many){
                this.deselectAll();
            }
            if (this.grid[closest.ii][closest.jj].selected && select_many){
                this.grid[closest.ii][closest.jj].selected = false;
            } else {
                this.grid[closest.ii][closest.jj].selected = true;
            }
        } else{
            if (!select_many) this.deselectAll();
        }
    }

    deselectAll(){
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                this.grid[i][j].selected = false;
            }
        }
    }

    selectAll(){
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                this.grid[i][j].selected = true;
            }
        }
    }

    setSelected(){
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                if (i === this.selected.i && j === this.selected.j){
                    this.grid[i][j].selected = true;
                } else{
                    this.grid[i][j].selected = false;
                }
            }
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    setSelectedRandom(images, random_array){
        let temp = [];
        for (let i = 0; i < random_array.length; i++){
            if (random_array[i]){
                temp.push(i);
            }
        }


        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                if (this.grid[i][j].selected){
                    let random = temp[this.getRandomInt(temp.length)];
            
                    this.grid[i][j].changeImage(images[random]);
                }
            }
        }
    }

    setSelectedImage(image){
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                if (this.grid[i][j].selected){
                    this.grid[i][j].changeImage(image);
                }
            }
        }
        
    }

    changeRowAndColCount(row_count, col_count, side_len){
        this.grid_height = row_count;
        this.grid_width = col_count;
        this.side_length = parseInt(side_len);
        this.c = Math.cos(0.523598776) * (this.side_length*2);
        
        this.init();
    }
}