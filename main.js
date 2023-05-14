changeBoton = () => {
    if (document.getElementById('pausa').innerHTML == 'Pausa') {
        document.getElementById('pausa').innerHTML = 'Continuar';
    } else { document.getElementById('pausa').innerHTML = 'Pausa'; }
}
//Inicialización del campo
Crafty.init(1366, 900, document.getElementById('game'));
//!Timer
// Obtén una referencia al elemento de texto del contador de tiempo
var timer = Crafty("h1#timer");
var tiempoPausado = false;
// Variables para el contador de tiempo
var tiempo = 0;
var intervalo;

// Función para formatear el tiempo en formato HH:MM:SS
function formatearTiempo(tiempo) {
    var horas = Math.floor(tiempo / 3600);
    var minutos = Math.floor((tiempo % 3600) / 60);
    var segundos = tiempo % 60;

    // Asegurarse de tener dos dígitos para cada componente de tiempo
    var tiempoFormateado =
        ("0" + horas).slice(-2) +
        ":" +
        ("0" + minutos).slice(-2) +
        ":" +
        ("0" + segundos).slice(-2);

    return tiempoFormateado;
}

// Función para iniciar el contador de tiempo
function iniciarTiempo() {
    intervalo = setInterval(function () {
        tiempo++;
        timer.text(formatearTiempo(tiempo));
    }, 1000); // Actualizar cada segundo (1000 ms)
}
function pausarTiempo() {
    clearInterval(intervalo);
    tiempoPausado = true;
}
function reanudarTiempo() {
    if (tiempoPausado) {
        intervalo = setInterval(function () {
            tiempo++;
            timer.text(formatearTiempo(tiempo));
        }, 1000); // Actualizar cada segundo (1000 ms)
        tiempoPausado = false;
    }
}
// Función para detener el contador de tiempo
function detenerTiempo() {
    clearInterval(intervalo);
}

// Evento click para el botón "Iniciar Juego"
Crafty("button#iniciar-juego").bind("click", function () {
    initPosition();
    Crafty.init();
    ball.attr({ x: (1366 / 2) - 20, y: 430, w: 40, h: 40 });
    iniciarTiempo();
  });
  
  Crafty("button#parar-juego").bind("click", function () {
    time = 0;
    initPosition();
    Crafty.stop();
    goles1 = 0;
    goles2 = 0;
    marcador.text('Equipo1: ' + goles1 + '  Equipo2: ' + goles2);
    detenerTiempo();
  });
  
  Crafty("button#pausa").bind("click", function () {
    if (!tiempoPausado) {
      pausarTiempo();
    } else {
      reanudarTiempo();
    }
  });
  

// Ubicación del Marcador

// Formato Marcador de goles


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
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 30, y: 400, w: 85, h: 85 }).collision())
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
 function initPosition () {
    team_1[0].attr({ x: 30, y: 400, w: 85, h: 85 })
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
ball.bind("UpdateFrame",function(eventData) {
    if (this.x > 950 || !this.x_move) {
        xball = true;
        this.x_move = false;
    }
    if (this.x < 55 || this.x_move) {
        xball = false;
        this.x_move = true;
    }
    if (xball) {
        this.x = this.x - 222 * (eventData.dt / 1000);
        this.rotation = this.rotation - 8;
    }
    else {
        this.x = this.x + 222 * (eventData.dt / 1000);
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
        this.y = this.y - velocidad * (eventData.dt / 1000);
    }
    else {
        this.y = this.y + velocidad * (eventData.dt / 1000);
    }
});

//Movimiento de los jugadores

let y1;
let x1;
team_1[0].bind("UpdateFrame", (eventData) => {
    if (this.x > 68) {
        x1 = true;
    }
    if (this.x < 28) {
        x1 = false;
    }
    if (x1)
        this.x = this.x - 30 * (eventData.dt / 1000);
    else
        this.x = this.x + 30 * (eventData.dt / 1000);

    if (this.y >= 350) {
        y1 = true;
    }
    if (this.y <= 190) {
        y1 = false;
    }
    if (y1) {
        this.y = this.y - 68 * (eventData.dt / 1000);
    }
    else {
        this.y = this.y + 73 * (eventData.dt / 1000);
    }
});