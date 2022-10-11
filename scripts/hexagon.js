class Hexagon{
    constructor(x, y, d, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = "hexagon";
        this.pos = new Point(this.x,this.y);
        this.vertices = []
        this.a = d;
        this._c = Math.cos(0.523598776) * (this.a*2);
        this.setVertices()
        this.selected = false;
       // this.printDistanceFromCenter()
        this.width = 4*this.a;
        this.height = 2*this._c;
        this.init();
        this.text = "";
    }

    init(){
        this.img = new Image();
        this.img.src = "images/3.png"
        //console.log(this.img.width)
        //this.scale = (2*this._c / this.img.height)
    }

    changeSideLen(side_len){
        this.a = side_len;
        this._c = Math.cos(0.523598776) * (this.a*2);
    }

    setVertices(){
        this.vertices = []

        this.vertices.push(new Point( (this.x - this.a), (this.y - this._c) ) )
        this.vertices.push(new Point( (this.x + this.a), (this.y - this._c) ) )
        this.vertices.push(new Point( (this.x + 2*this.a), (this.y) ) )
        this.vertices.push(new Point( (this.x + this.a), (this.y + this._c) ) )
        this.vertices.push(new Point( (this.x - this.a), (this.y + this._c) ) )
        this.vertices.push(new Point( (this.x - 2*this.a), (this.y) ) )
    }

    printDistanceFromCenter(){
        for (let i = 0; i < this.vertices.length; i++){
            let d = Math.sqrt(Math.pow(this.x - this.vertices[i].x, 2) + Math.pow(this.y - this.vertices[i].y, 2));
            console.log(d)
        }
    }
    draw(){
        c.globalAlpha = 1;
        c.strokeStyle = this.color;
        c.beginPath();
        c.lineWidth = 1;
        c.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++){
            c.lineTo(this.vertices[i].x, this.vertices[i].y);
        } 
        c.moveTo(this.vertices[0].x, this.vertices[0].y);
        c.closePath();
       // c.stroke();
       // if (this.drawFill){
            c.fillStyle = this.color;
            c.fill();
      //  }
       // }
        c.globalAlpha = 1;
    }

    drawImageWithMask(randOn = true){
        
        c.save()
        c.beginPath();
        c.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++){
            c.lineTo(this.vertices[i].x, this.vertices[i].y);
        } 
        c.moveTo(this.vertices[0].x, this.vertices[0].y);
        c.closePath();
        c.clip()
        // c.setTransform(this.scale, 0, 0, this.scale, 0, 0);
       // console.log(this.img, this.x-(this.width/2), this.y-(this.height/2), this.width, this.height)
        c.drawImage(this.img, this.x-(this.width/2), this.y-(this.height/2), this.width, this.height)
        // c.setTransform(1, 0, 0, 1, 0, 0); // restore default

        c.restore()

        if (this.selected){
            c.globalAlpha = 1;
            c.strokeStyle = this.color;
            c.beginPath();
            c.lineWidth = 4;
            c.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (let i = 1; i < this.vertices.length; i++){
                c.lineTo(this.vertices[i].x, this.vertices[i].y);
            } 
            c.lineTo(this.vertices[0].x, this.vertices[0].y);
            c.closePath();
            c.stroke();
            c.globalAlpha = 1;
        }
        //console.log(this.text.length)
        if (this.text.length > 0){
            let textx = this.x-13;
            let texty = this.y+10;
            c.fillStyle = "#000000"
            c.font = "40px Arial";
            let bg = "█"
            bg = bg.repeat(this.text.length);
            c.fillText(bg, textx, texty);
            c.fillStyle = "#FFFFFF"
           // c.fillText(this.text, this.x + this._c + 30, this.y);
        //   c.fillText(this.text, this.x, this.y + this.a*2 + 30);
            c.fillText(this.text, textx+3, texty);
        }

        if (!randOn){
        //     let textx = this.x-10;
        //     let texty = this.y+10;
        //     c.fillStyle = "#000000"
        //     c.font = "40px Arial";
        //     let bg = "█"
        //     bg = bg.repeat(this.text.length);
        //     c.fillText(bg, textx, texty);
        //     c.fillStyle = "#FFFFFF"
        //    // c.fillText(this.text, this.x + this._c + 30, this.y);
        // //   c.fillText(this.text, this.x, this.y + this.a*2 + 30);
        //     c.fillText("MORO", textx+3, texty);
            c.strokeStyle = "red";
            c.beginPath();
            c.lineWidth = 6;
            c.moveTo(this.x-10, this.y+30);
            c.lineTo(this.x+10, this.y+50);
            c.closePath()
            c.stroke()

            c.beginPath();
            c.lineWidth = 6;
            c.moveTo(this.x-10, this.y+50);
            c.lineTo(this.x+10, this.y+30);
            c.closePath()
            c.stroke()

        }
    }

    setCoordinates(x,y){
        this.x = x;
        this.y = y;
        this.pos.x = x;
        this.pos.y = y;
        this.setVertices()
    }

    changeImage(path){
        this.img = new Image();
        this.img.src = path;
    }

}