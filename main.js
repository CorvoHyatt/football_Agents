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
    if (this.x > 1320 || !this.x_move) {
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
        velocidad = 40
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

var direccionesX = [];
var direccionesY = [];
var ajijiX = [];
var ajijiY = [];
for(let i = 0; i < 7; i++) {
    direccionesX[i] = Math.floor(Math.random() * 8) - 1;
    direccionesY[i] = Math.floor(Math.random() * 8) - 1;
    ajijiX[i] = (Math.floor(Math.random() * 8) - 1) * -1;
    ajijiY[i] = (Math.floor(Math.random() * 8) - 1) * -1;
}

team_1[0].bind("UpdateFrame", function (eventData) {
    if (this.x + direccionesX[0] < 20|| this.x + direccionesX[0] > 300 ) {
        direccionesX[0] = -direccionesX[0]; // Cambia de dirección en el eje x
      }
      if (this.y + direccionesY[0] <200 || this.y + direccionesY[0] > 600) {
        direccionesY[0] = -direccionesY[0]; // Cambia de dirección en el eje y
      }
      this.x += direccionesX[0];
      this.y += direccionesY[0];
});
team_1[1].bind("UpdateFrame", function (eventData) {
    if (this.x + direccionesX[1] < 200|| this.x + direccionesX[1] > ancho - 90 ) {
        direccionesX[1] = -direccionesX[1]; // Cambia de dirección en el eje x
      }
      if (this.y + direccionesY[1] <0 || this.y + direccionesY[1] > alto - 90) {
        direccionesY[1] = -direccionesY[1]; // Cambia de dirección en el eje y
      }
      this.x += direccionesX[1];
      this.y += direccionesY[1];
});

team_1[2].bind("UpdateFrame", function (eventData) {
  if (this.x + direccionesX[2] < 200|| this.x + direccionesX[2] > ancho - 90 ) {
      direccionesX[2] = -direccionesX[2]; // Cambia de dirección en el eje x
    }
    if (this.y + direccionesY[2] <0 || this.y + direccionesY[2] > alto - 90) {
      direccionesY[2] = -direccionesY[2]; // Cambia de dirección en el eje y
    }
    this.x += direccionesX[2];
    this.y += direccionesY[2];
});

team_1[3].bind("UpdateFrame", function (eventData) {
  if (this.x + direccionesX[3] < 200|| this.x + direccionesX[3] > ancho - 90 ) {
      direccionesX[3] = -direccionesX[3]; // Cambia de dirección en el eje x
    }
    if (this.y + direccionesY[3] <0 || this.y + direccionesY[3] > alto - 90) {
      direccionesY[3] = -direccionesY[3]; // Cambia de dirección en el eje y
    }
    this.x += direccionesX[3];
    this.y += direccionesY[3];
});
team_1[4].bind("UpdateFrame", function (eventData) {
  if (this.x + direccionesX[4] < 200|| this.x + direccionesX[4] > ancho - 90 ) {
      direccionesX[4] = -direccionesX[4]; // Cambia de dirección en el eje x
    }
    if (this.y + direccionesY[4] <0 || this.y + direccionesY[4] > alto - 90) {
      direccionesY[4] = -direccionesY[4]; // Cambia de dirección en el eje y
    }
    this.x += direccionesX[4];
    this.y += direccionesY[4];
});
team_1[5].bind("UpdateFrame", function (eventData) {
  if (this.x + direccionesX[5] < 200|| this.x + direccionesX[5] > ancho - 90 ) {
      direccionesX[5] = -direccionesX[5]; // Cambia de dirección en el eje x
    }
    if (this.y + direccionesY[5] <0 || this.y + direccionesY[5] > alto - 90) {
      direccionesY[5] = -direccionesY[5]; // Cambia de dirección en el eje y
    }
    this.x += direccionesX[5];
    this.y += direccionesY[5];
});
team_1[6].bind("UpdateFrame", function (eventData) {
  if (this.x + direccionesX[6] < 200|| this.x + direccionesX[6] > ancho - 90 ) {
      direccionesX[6] = -direccionesX[6]; // Cambia de dirección en el eje x
    }
    if (this.y + direccionesY[6] <0 || this.y + direccionesY[6] > alto - 90) {
      direccionesY[6] = -direccionesY[6]; // Cambia de dirección en el eje y
    }
    this.x += direccionesX[6];
    this.y += direccionesY[6];
});

//equipo 2 
team_2[0].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[0] < ancho-350|| this.x + ajijiX[0] > ancho -50 ) {
      ajijiX[0] = -ajijiX[0]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[0] <200 || this.y + ajijiY[0] > 600) {
      ajijiY[0] = -ajijiY[0]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[0];
    this.y += ajijiY[0];
});
team_2[1].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[1] < 0|| this.x + ajijiX[1] > ancho - 350 ) {
      ajijiX[1] = -ajijiX[1]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[1] <0 || this.y + ajijiY[1] > alto - 90) {
      ajijiY[1] = -ajijiY[1]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[1];
    this.y += ajijiY[1];
});
team_2[2].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[2] < 0|| this.x + ajijiX[2] > ancho - 350 ) {
      ajijiX[2] = -ajijiX[2]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[2] <0 || this.y + ajijiY[2] > alto - 90) {
      ajijiY[2] = -ajijiY[2]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[2];
    this.y += ajijiY[2];
});
team_2[3].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[3] < 0|| this.x + ajijiX[3] > ancho - 350 ) {
      ajijiX[3] = -ajijiX[3]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[3] <0 || this.y + ajijiY[3] > alto - 90) {
      ajijiY[3] = -ajijiY[3]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[3];
    this.y += ajijiY[3];
});
team_2[4].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[4] < 0|| this.x + ajijiX[4] > ancho - 350 ) {
      ajijiX[4] = -ajijiX[4]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[4] <0 || this.y + ajijiY[4] > alto - 90) {
      ajijiY[4] = -ajijiY[4]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[4];
    this.y += ajijiY[4];
});
team_2[5].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[5] < 0|| this.x + ajijiX[5] > ancho - 350 ) {
      ajijiX[5] = -ajijiX[5]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[5] <0 || this.y + ajijiY[5] > alto - 90) {
      ajijiY[5] = -ajijiY[5]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[5];
    this.y += ajijiY[5];
});
team_2[6].bind("UpdateFrame", function (eventData) {
  if (this.x + ajijiX[6] < 0|| this.x + ajijiX[6] > ancho - 350 ) {
      ajijiX[6] = -ajijiX[6]; // Cambia de dirección en el eje x
    }
    if (this.y + ajijiY[6] <0 || this.y + ajijiY[6] > alto - 90) {
      ajijiY[6] = -ajijiY[6]; // Cambia de dirección en el eje y
    }
    this.x += ajijiX[6];
    this.y += ajijiY[6];
});


// for(let i = 1; i < 7 ; i++) {
//     team_1[i].bind("UpdateFrame", function (eventData) {
//         if (this.x + ajijiX[i] < 300|| this.x + ajijiX[i] > ancho -100) {
//             ajijiX[i] = -ajijiX[i]; // Cambia de dirección en el eje x
//           }
//           if (this.y + ajijiY[i] <0 || this.y + direccionesY[i] > 600) {
//             direccionesY[i] = direccionesY[i]; // Cambia de dirección en el eje y
//           }
//           this.x += direccionesX[i];
//           this.y += direccionesY[i];
//     });
// }