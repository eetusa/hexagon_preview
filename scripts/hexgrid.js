class HexGrid{
    constructor(side_length){
        this.side_length = side_length;
        this.grid = [];
        this.grid_width = 10;
        this.grid_height = 10;
        this.x_offset = 0;
        this.y_offset = 0;
        this.start_x = 400;
        this.start_y = 200;
        this.c = Math.cos(0.523598776) * (this.side_length*2);
        this.init();
        this.selected = [];
    }

    init(){
        for (let i = 0; i < this.grid_height; i++){
            this.grid.push([]);
            for (let j = 0; j < this.grid_width; j++){

                if (i % 2 === 0){
                    if (j % 2 === 0){
                        let x = this.start_x + (3*j)*this.side_length;
                        let y = this.start_y + (i)*this.c;
                         this.grid[i].push(new Hexagon(x, y, this.side_length, "red"));
                    }
                } else {
                    if (j % 2 === 0){
                        let x = this.start_x + 3*this.side_length + (3*j)*this.side_length;
                        let y = this.start_y +this.c + (i-1)*this.c;
                        this.grid[i].push(new Hexagon(x, y, this.side_length, "red"));
                    }
                }
            }
        }
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
          //  this.setSelected()
            if (this.grid[closest.ii][closest.jj].selected && select_many){
                this.grid[closest.ii][closest.jj].selected = false;
            } else {
                this.grid[closest.ii][closest.jj].selected = true;
            }
            // console.log(this.selected)
            // console.log(this.grid[this.selected.i][this.selected.j])
           // this.grid[this.selected.i][this.selected.j].changeImage("images/test2.png");
            
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

    setSelectedImage(image){
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                if (this.grid[i][j].selected){
                    this.grid[i][j].changeImage(image);
                }
            }
        }
        
    }
}