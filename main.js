changeBoton = () => {
    if (document.getElementById('pausa').innerHTML == 'Pausa') {
        document.getElementById('pausa').innerHTML = 'Continuar';
    } else { document.getElementById('pausa').innerHTML = 'Pausa'; }
}
let go1 = 0;
let go2 = 0;
let time = 0;
let ancho = 1366;
let alto = 900;
//Inicialización del campo
Crafty.init(ancho, alto, document.getElementById('game'));
//!Timer
var Tiempo = Crafty.e('2D, DOM, Text')
    .attr({ x: 1000, y: 30, w: 300, h: 20 })
    .text("00:00:00")
    .textFont({ size: '40px' })
    .textColor('black');

Tiempo.bind("UpdateFrame", function (e) {
    time += e.dt / 1000;
    let minutos = parseInt((time / 60), 10);
    if (minutos < 10) minutos = '0' + minutos;
    let segundos = parseInt((time % 60), 10);
    if (segundos < 10) segundos = '0' + segundos;
    if (minutos == 10) {
        Crafty.stop(); go1 = 0; go2 = 0; time = 0;
    } else {
        this.text('Tiempo: ' + minutos + ':' + segundos);
    }
})
// Ubicación del Marcador
let marcador = Crafty.e("2D, DOM, Text")
    .attr({ x: 500, y: 30, w: 500, h: 50 })

// Formato Marcador de goles
marcador.textFont({
    size: '40px',
}).textColor('black');

marcador.text('Tilines: ' + go1 + ' vs Yolks: ' + go2);

//Inicialización de los jugadores

// Equipo_1
let assetsObj = {
    "sprites": {
        "equipo_1.png": {
            tile: 104,
            tileh: 114,
            map: {
                walker_start: [0, 0],
                walker_middle: [7, 0],
                walker_end: [7, 1]
            }
        }
    }
};
Crafty.load(assetsObj);

//Equipo 2
let assetsObj2 = {
    "sprites": {
        "equipo_2.png": {
            tile: 104,
            tileh: 114,
            map: {
                walker2_start: [0, 0],
                walker2_middle: [7, 0],
                walker2_end: [7, 1]
            }
        }
    }
};
Crafty.load(assetsObj2);

//Inicialización del balon
let assetsObjBall = {
    "sprites": {
        "balon.png": {
            tile: 306,
            tileh: 306,
            map: {
                ball_start: [0, 0],
                ball_middle: [0, 0],
                ball_end: [0, 0]
            }
        }
    }
}
Crafty.load(assetsObjBall);

//! Cración de las Porterias
let red1 = Crafty
    .e("2D, Canvas, Color, Collision")
    .attr({ x: 22, y: 320, w: 40, h: 270 })
    .color('red')
    .collision()
    .checkHits("ball_start")
    .bind("HitOn", function (hitData) {
        if ((hitData = this.hit('ball_start'))) {
            go2 += 1;
            Crafty.stop();
            initPosition();
            setTimeout(function () { Crafty.init(); }, 1000);
            marcador.text('Tilines: ' + go1 + ' vs Yolks: ' + go2);
        }
    });
let red2 = Crafty
    .e("2D, Canvas, Color, Collision")
    .attr({ x: ancho - 60, y: 320, w: 40, h: 270 })
    .color('red')
    .collision()
    .checkHits("ball_start")
    .bind("HitOn", function (hitData) {
        if ((hitData = this.hit('ball_start'))) {
            go1 += 1;
            Crafty.stop();
            initPosition();
            setTimeout(function () { Crafty.init(); }, 1000);
            marcador.text('Tilines: ' + go1 + ' vs Yolks: ' + go2);
        }
    })

//! Cración del Balon
let ball = Crafty
    .e('2D, Canvas, ball_start,SpriteAnimation, Collision')
    .attr({ x: (1366 / 2) - 20, y: 430, w: 40, h: 40 })
    .collision()
    .checkHits('Collision')
    .bind("HitOn", function (hitData) {
        //desplazamientos
        if ((hitData = this.hit('arriba'))) {
            this.y_move = false;
            this.y_tiro = false;
        }
        if ((hitData = this.hit('abajo'))) {
            this.y_move = true;
            this.y_tiro = false;
        }
        if ((hitData = this.hit('centro'))) {
            this.y_tiro = true;
        }
        if ((hitData = this.hit('walker_start'))) {
            this.x_move = true;
        }
        if ((hitData = this.hit('walker2_start'))) {
            this.x_move = false;
        }
    });
ball.reel("walking", 500, [
    [0, 0]
]);
ball.animate("walking", -1);

//! Creación de los jugadores
let team_1 = []
let team_2 = []

// Equipo_1
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 100, y: 400, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, arriba").attr({ x: 300, y: 300, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, abajo").attr({ x: 300, y: 500, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 570, y: 150, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, arriba").attr({ x: 570, y: 400, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, abajo").attr({ x: 570, y: 650, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 850, y: 400, w: 85, h: 85 }).collision())

// Equipo_2
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 1240, y: 400, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 970, y: 300, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 970, y: 500, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 150, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 400, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 650, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 420, y: 400, w: 85, h: 85 }).collision())


//Posicionamiento de los jugadores
//Equipo 1
function initPosition() {
    team_1[0].attr({ x: 100, y: 400, w: 85, h: 85 })
    team_1[1].attr({ x: 300, y: 300, w: 85, h: 85 })
    team_1[2].attr({ x: 300, y: 500, w: 85, h: 85 })
    team_1[3].attr({ x: 570, y: 150, w: 85, h: 85 })
    team_1[4].attr({ x: 570, y: 400, w: 85, h: 85 })
    team_1[5].attr({ x: 570, y: 650, w: 85, h: 85 })
    team_1[6].attr({ x: 850, y: 400, w: 85, h: 85 })

    //Equipo 2
    team_2[0].attr({ x: 1240, y: 400, w: 85, h: 85 })
    team_2[1].attr({ x: 970, y: 300, w: 85, h: 85 })
    team_2[2].attr({ x: 970, y: 500, w: 85, h: 85 })
    team_2[3].attr({ x: 720, y: 150, w: 85, h: 85 })
    team_2[4].attr({ x: 720, y: 400, w: 85, h: 85 })
    team_2[5].attr({ x: 720, y: 650, w: 85, h: 85 })
    team_2[6].attr({ x: 420, y: 400, w: 85, h: 85 })
    ball.attr({ x: (1366 / 2) - 20, y: 430, w: 40, h: 40 })


}
// Espacio de desplazamiento establedo para cada jugador
for (let i = 0; i < 7; i++) {
    // Espacio jugador equipo1
    team_1[i].reel("walking", 500, [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    ]);
    team_1[i].animate("walking", -1);

    //Espacio jugador equipo2
    team_2[i].reel("walking", 500, [
        [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
        [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]
    ]);
    team_2[i].animate("walking", -1);
}
//Movimiento del balón
let xball;
let yball;
ball.origin("center");
ball.bind("UpdateFrame", function (eventData) {
    if (this.x > 950 || !this.x_move) {
        xball = true;
        this.x_move = false;
    }
    if (this.x < 55 || this.x_move) {
        xball = false;
        this.x_move = true;
    }
    if (xball) {
        this.x = this.x - 222 * (eventData.dt / 1000) * 0.8;
        this.rotation = this.rotation - 8;
    }
    else {
        this.x = this.x + 222 * (eventData.dt / 1000) * 0.8;
        this.rotation = this.rotation + 8;
    }
    if (this.y >= 595 || this.y_move) {
        yball = true;
        this.y_move = true;
    }
    if (this.y <= 17 || !this.y_move) {
        yball = false;
        this.y_move = false;
    }
    let velocidad = 200;
    if (this.y_tiro) {
        velocidad = 22
    }
    if (yball) {
        this.y = this.y - velocidad * (eventData.dt / 1000) * 0.8;
    }
    else {
        this.y = this.y + velocidad * (eventData.dt / 1000) * 0.8;
    }
});

//Movimiento de los jugadores

let y1;
let x1;
var direccionX =Math.floor(Math.random() * 8) - 1;
var direccionY = Math.floor(Math.random() * 8) - 1;
var direccionesX = [];
var direccionesY = [];
for(let i = 0; i < 7; i++) {
    direccionesX[i] = Math.floor(Math.random() * 10) - 1;
    direccionesY[i] = Math.floor(Math.random() * 10) - 1;
}

team_1[0].bind("UpdateFrame", function (eventData) {
    if (this.x + direccionX < 20|| this.x + direccionX > 300 ) {
        direccionX = -direccionX; // Cambia de dirección en el eje x
      }
      if (this.y + direccionY <200 || this.y + direccionY > 600) {
        direccionY = -direccionY; // Cambia de dirección en el eje y
      }
      this.x += direccionX;
      this.y += direccionY;
});
team_1[1].bind("UpdateFrame", function (eventData) {
    if (this.x + direccionesX[1] < 300|| this.x + direccionesX[1] > ancho -100) {
        direccionesX[1] = -direccionesX[1]; // Cambia de dirección en el eje x
      }
      if (this.y + direccionesY[1] <200 || this.y + direccionesY[1] > 600) {
        direccionesY[1] = direccionesY[1]; // Cambia de dirección en el eje y
      }
      this.x += direccionesX[1];
      this.y += direccionesY[1];
});
for(let i = 1; i < 7 ; i++) {
    team_1[i].bind("UpdateFrame", function (eventData) {
        if (this.x + direccionesX[i] < 300|| this.x + direccionesX[i] > ancho -100) {
            direccionesX[i] = -direccionesX[i]; // Cambia de dirección en el eje x
          }
          if (this.y + direccionesY[i] <200 || this.y + direccionesY[i] > 600) {
            direccionesY[i] = direccionesY[i]; // Cambia de dirección en el eje y
          }
          this.x += direccionesX[i];
          this.y += direccionesY[i];
    });
}