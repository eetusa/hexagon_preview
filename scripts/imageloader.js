class ImageLoader{
    constructor(){
        this.images = [];
        this.load();

    }

    load(){
        for (let i = 1; i < 20; i++){
            let img = new Image();
            let url = "images/" + i + ".png";
            
            img.src = url;
            
            console.log(img)

            if (img.width === 0){
                break;
            }
            this.images.push(url)
        }
        console.log(this.images)
    }

    getImages(){
        return [...this.images];
    }
}