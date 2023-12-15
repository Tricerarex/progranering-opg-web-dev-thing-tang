const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200 
        }
        this.velocity = {
            x: 0
        }

        this.image = new Image()
        this.image.src = '/imigas/depositphotos_385102866-stock-illustration-american-fighter-raptor-vector-icon.png'
        this.image.onload = () => {
            this.draw()
        }

        this.width = 100
        this.height = 100 
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

animate()