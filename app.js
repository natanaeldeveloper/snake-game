const screen = document.getElementById('screen')
const context = screen.getContext('2d')
const currentPlayerId = 'player01'

const game = {
    players: {
        'player01': { x: 1, y: 1 },
        'player02': { x: 3, y: 7 },
        'player03': { x: 2, y: 2 },
        'player04': { x: 3, y: 3 },
    },
    fruits: {
        'fruit01': { x: 1, y: 9 },
        'fruit02': { x: 7, y: 3 },
        'fruit03': { x: 8, y: 8 },
    }
}

handleEventKeydown()
renderScreen()

function renderScreen() {

    context.fillStyle = 'white'
    context.clearRect(0, 0, 100, 100)

    for (const playerId in game.players) {
        const player = game.players[playerId]
        context.fillStyle = 'grey'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const player = game.players[currentPlayerId]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)

    requestAnimationFrame(renderScreen)
}

const commands = {
    ArrowUp({ playerId, x, y }) {
        movePlayer(playerId, x, y - 1)
    },
    ArrowDown({ playerId, x, y }) {
        movePlayer(playerId, x, y + 1)
    },
    ArrowLeft({ playerId, x, y }) {
        movePlayer(playerId, x - 1, y)
    },
    ArrowRight({ playerId, x, y }) {
        movePlayer(playerId, x + 1, y)
    }
}

function movePlayer(playerId, x, y) {

    let busy = true

    for (const playerId in game.players) {
        const player = game.players[playerId]

        if (player.x == x && player.y == y) {
            busy = false
        }
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId]

        if (fruit.x == x && fruit.y == y) {
            delete game.fruits[fruitId]
        }
    }

    if(x < screen.width && x >= 0 && busy === true) {       
        game.players[playerId].x = x
    }

    if(y < screen.height && y >= 0 && busy === true) {
        game.players[playerId].y = y
    }
}

function handleEventKeydown() {
    window.addEventListener('keydown', (e) => {
        const command = commands[e.key]

        if (command) {
            const player = game.players[currentPlayerId]
            command({
                playerId: currentPlayerId,
                x: player.x,
                y: player.y
            })
        }
    })
}