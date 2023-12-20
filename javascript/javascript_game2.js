const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {

        this.velocity = {
            x: 0
        }

        this.image = new Image()
        this.image.src = '/imigas/rsz_depositphotos_385102866-stock-illustration-american-fighter-raptor-vector-icon.png'
        this.image.onload = () => {
            this.width = 100;
            this.height = 100;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height / 2
            };
            this.draw();  
            
        }
    }

    draw() {
        //cxt.fillStyle = 'red'
        //cxt.fillRect(this.position.x, this.position.y, this.width, this.height)
        cxt.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}


const player = new Player()
player.draw()


function animate(){
    requestAnimationFrame(animate)
    cxt.fillStyle = 'back'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()

}

addEventListener('keydown', () => {
    console.log('keydown')
})

animate()