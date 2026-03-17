process.stdout.setEncoding('utf8');
const readline = require('readline-sync');

// ================================
// CLASES
// ================================
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
        this.energia = 100;
        this.vidas = 3;
        this.ataque = 15;
    }

    descansar() {
        this.energia += 20;
        if (this.energia > 100) this.energia = 100;
        console.log(`\n[Zzz] ${this.nombre} descanso y recupero energia. Energia actual: ${this.energia}`);
    }

    comer() {
        const comidaEncontrada = Math.floor(Math.random() * 21) + 10; // 10 a 30
        this.energia += comidaEncontrada;
        if (this.energia > 100) this.energia = 100;
        console.log(`\n[COMIDA] ${this.nombre} encontro comida y recupero ${comidaEncontrada} de energia.`);
        console.log(`Energia actual: ${this.energia}`);
    }

    recibirDanio(cantidad) {
        this.energia -= cantidad;
        if (this.energia < 0) this.energia = 0;
        console.log(`[DANIO] ${this.nombre} recibio ${cantidad} de danio. Energia restante: ${this.energia}`);
    }

    perderVida() {
        this.vidas--;
        this.energia = 50;

        if (this.vidas > 0) {
            console.log(`\n[VIDA PERDIDA] ${this.nombre} perdio una vida.`);
            console.log(`Vidas restantes: ${this.vidas}`);
            console.log(`La energia se restablecio a ${this.energia}.`);
        }
    }

    mostrarEstado() {
        console.log('\n========== ESTADO DEL PERSONAJE ==========');
        console.log(`Nombre  : ${this.nombre}`);
        console.log(`Energia : ${this.energia}`);
        console.log(`Vidas   : ${this.vidas}`);
        console.log(`Ataque  : ${this.ataque}`);
        console.log('==========================================\n');
    }
}

class Mono extends Animal {
    constructor(nombre) {
        super(nombre);
        this.ataque = 18;
    }

    habilidadEspecial() {
        this.energia -= 15;
        if (this.energia < 0) this.energia = 0;
        console.log(`[ACCION] ${this.nombre} trepo agilmente a un arbol y avanzo por el bosque. Energia: ${this.energia}`);
    }
}

class Oso extends Animal {
    constructor(nombre) {
        super(nombre);
        this.ataque = 20;
    }

    habilidadEspecial() {
        this.energia -= 18;
        if (this.energia < 0) this.energia = 0;
        console.log(`[ACCION] ${this.nombre} mueve arboles caidos y se abre camino por el bosque. Energia: ${this.energia}`);
    }
}

class Tigre extends Animal {
    constructor(nombre) {
        super(nombre);
        this.ataque = 22;
    }

    habilidadEspecial() {
        this.energia -= 17;
        if (this.energia < 0) this.energia = 0;
        console.log(`[ACCION] ${this.nombre} da zarpasos a ramas y arbustos, abriendose camino por el bosque. Energia: ${this.energia}`);
    }
}

class Zorro extends Animal {
    constructor(nombre) {
        super(nombre);
        this.ataque = 14;
    }

    habilidadEspecial() {
        this.energia -= 10;
        if (this.energia < 0) this.energia = 0;
        console.log(`[ACCION] ${this.nombre} se escabulle rápidamente entre los arbustos. Energia: ${this.energia}`);
    }
}

class Conejo extends Animal {
    constructor(nombre) {
        super(nombre);
        this.ataque = 14;
    }

    habilidadEspecial() {
        this.energia -= 10;
        if (this.energia < 0) this.energia = 0;
        console.log(`[ACCION] ${this.nombre} dio un gran salto entre los arbustos. Energia: ${this.energia}`);
    }
}

class Enemigo {
    constructor(nombre, energia, ataque) {
        this.nombre = nombre;
        this.energia = energia;
        this.ataque = ataque;
    }

    recibirDanio(cantidad) {
        this.energia -= cantidad;
        if (this.energia < 0) this.energia = 0;
    }
}

// ================================
// FUNCIONES DEL JUEGO
// ================================
function crearEnemigoAleatorio() {
    const enemigos = [
        new Enemigo('Lobo Salvaje', 40, 12),
        new Enemigo('Oso Hambriento', 45, 13),
        new Enemigo('Pantera Sigilosa', 30, 15),
        new Enemigo('Araña Gigante', 25, 9),
        new Enemigo('Perro Rabioso', 35, 10),
        new Enemigo('Escorpion Venenoso', 30, 11),
        new Enemigo('Serpiente Gigante', 35, 10),
        new Enemigo('Jabali Furioso', 50, 14),
        new Enemigo('Aguila Cazadora', 30, 11)
    ];

    const indice = Math.floor(Math.random() * enemigos.length);
    return enemigos[indice];
}

function combate(jugador, enemigo) {
    console.log('\n==================================');
    console.log(`¡Ha aparecido un enemigo: ${enemigo.nombre}!`);
    console.log(`Energia del enemigo: ${enemigo.energia}`);
    console.log('==================================\n');

    while (jugador.energia > 0 && enemigo.energia > 0) {
        console.log('\n--- TURNO DE COMBATE ---');
        console.log(`Tu energia: ${jugador.energia}`);
        console.log(`Energia de ${enemigo.nombre}: ${enemigo.energia}`);
        console.log('\n1. Atacar');
        console.log('2. Defender');
        console.log('3. Huir');

        const opcion = readline.question('Elige una opcion: ');

        if (opcion === '1') {
            const golpeJugador = Math.floor(Math.random() * 11) + jugador.ataque; // ataque base + random
            enemigo.recibirDanio(golpeJugador);
            console.log(`\n[ATAQUE] ${jugador.nombre} ataco a ${enemigo.nombre} y le hizo ${golpeJugador} de danio.`);

            if (enemigo.energia > 0) {
                const golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;
                jugador.recibirDanio(golpeEnemigo);
                console.log(`[CONTRAATAQUE] ${enemigo.nombre} te ataco e hizo ${golpeEnemigo} de danio.`);
            }

        } else if (opcion === '2') {
            const golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;
            const reducido = Math.floor(golpeEnemigo / 2);
            jugador.recibirDanio(reducido);
            console.log(`\n[DEFENSA] ${jugador.nombre} se defendio.`);
            console.log(`[ATAQUE ENEMIGO] ${enemigo.nombre} hizo ${golpeEnemigo}, pero solo recibiste ${reducido}.`);

        } else if (opcion === '3') {
            const escapar = Math.random();

            if (escapar < 0.5) {
                console.log(`\n[HUIDA] ${jugador.nombre} logro escapar del ${enemigo.nombre}.`);
                return 'huida';
            } else {
                console.log(`\n[HUIDA FALLIDA] No pudiste escapar.`);
                const golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;
                jugador.recibirDanio(golpeEnemigo);
                console.log(`${enemigo.nombre} te golpeo mientras intentabas huir.`);
            }

        } else {
            console.log('\nOpcion invalida.');
        }
    }

    if (jugador.energia <= 0) {
        jugador.perderVida();

        if (jugador.vidas <= 0) {
            console.log(`\n${jugador.nombre} ya no tiene vidas.`);
            return 'derrota_total';
        } else {
            return 'vida_perdida';
        }
    }

    if (enemigo.energia <= 0) {
        console.log(`\n[VICTORIA] Derrotaste a ${enemigo.nombre}.`);
        return 'victoria';
    }
}

function explorar(jugador) {
    console.log('\nTe adentras en el bosque...');
    jugador.habilidadEspecial();

    if (jugador.energia <= 0) {
        jugador.perderVida();

        if (jugador.vidas <= 0) {
            return 'derrota_total';
        }
        return 'continuar';
    }

    const evento = Math.random();

    if (evento < 0.3) {
        console.log('\nEl bosque esta tranquilo. No encontraste enemigos.');
        return 'sin_evento';
    } else if (evento < 0.5) {
        console.log('\n¡Caíste en una trampa! Recibes 20 de daño.');
        jugador.recibirDanio(20);
        if (jugador.energia <= 0) {
            jugador.perderVida();
            if (jugador.vidas <= 0) {
                return 'derrota_total';
            }
        }
        return 'trampa';
    } else if (evento < 0.7) {
        console.log('\nEncontraste frutas y agua fresca.');
        jugador.comer();
        return 'comida';
    } else if (evento < 0.8) {
    console.log('\n¡Una tormenta repentina te golpea! Recibes daño por el clima.');
    const danoClima = Math.floor(Math.random() * 15) + 5;
    jugador.recibirDanio(danoClima);
    if (jugador.energia <= 0) {
        jugador.perderVida();
        if (jugador.vidas <= 0) {
            return 'derrota_total';
        }
    }
    return 'clima_malo';
    } else if (evento < 1.0) {
    console.log('\n¡Descubriste un tesoro escondido! Recuperas energía y ganas un bonus.');
    jugador.energia += 30;
    if (jugador.energia > 100) jugador.energia = 100;
    jugador.ataque += 2;  // Bonus permanente
    return 'tesoro';
    } else {
        const enemigo = crearEnemigoAleatorio();
        return combate(jugador, enemigo);
    }
}

// ================================
// INICIO DEL JUEGO
// ================================
console.log('\n================================================');
console.log('        AVENTURA EN EL BOSQUE INFINITO');
console.log('================================================');
console.log('Objetivo: sobrevivir y ganar 3 exploraciones exitosas.\n');

console.log('Elige tu personaje:');
console.log('5. El Zorro Astuto');
console.log('4. El Tigre Feroz');
console.log('3. El Oso Fuerte');
console.log('1. El Mono Agil');
console.log('2. El Conejo Veloz');
console.log('0. Salir');

const opcionPersonaje = readline.question('\nIngresa una opcion: ');

if (opcionPersonaje === '0') {
    console.log('\nDecidiste no entrar al bosque. Hasta luego.');
    process.exit();
}

let jugador;

if (opcionPersonaje === '1') {
    jugador = new Mono('George');
} else if (opcionPersonaje === '2') {
    jugador = new Conejo('Bugs');
} else if (opcionPersonaje === '3') {
    jugador = new Oso('Banjo');
} else if (opcionPersonaje === '4') {
    jugador = new Tigre('Terry');
} else if (opcionPersonaje === '5') {
    jugador = new Zorro('Jake');
} else {
    console.log('\nOpcion invalida. El juego se cerrara.');
    process.exit();
}

let exploracionesGanadas = 0;
const metaExploraciones = 3;

console.log(`\n¡Bienvenido al bosque, ${jugador.nombre}!`);
jugador.mostrarEstado();

// ================================
// BUCLE PRINCIPAL
// ================================
while (jugador.vidas > 0) {
    console.log('\n============== MENU PRINCIPAL ==============');
    console.log('1. Explorar el bosque');
    console.log('2. Descansar');
    console.log('3. Buscar comida');
    console.log('4. Ver estado');
    console.log('0. Salir del juego');
    console.log('============================================');

    const accion = readline.question('Que deseas hacer ahora? ');

    if (accion === '1') {
        const resultado = explorar(jugador);

        if (resultado === 'victoria' || resultado === 'sin_evento' || resultado === 'comida' || resultado === 'huida' || resultado === 'trampa') {
            exploracionesGanadas++;
            console.log(`\n[PROGRESO] Exploraciones superadas: ${exploracionesGanadas} de ${metaExploraciones}`);
        }

        if (resultado === 'derrota_total') {
            console.log('\nHas perdido todas tus vidas.');
            console.log('FIN DEL JUEGO.');
            break;
        }

        if (exploracionesGanadas >= metaExploraciones) {
            console.log('\n==========================================');
            console.log(`¡FELICIDADES, ${jugador.nombre}!`);
            console.log('Has sobrevivido al bosque infinito.');
            console.log('GANASTE EL JUEGO.');
            console.log('==========================================\n');
            break;
        }

    } else if (accion === '2') {
        jugador.descansar();

    } else if (accion === '3') {
        jugador.comer();

    } else if (accion === '4') {
        jugador.mostrarEstado();

    } else if (accion === '0') {
        console.log(`\n${jugador.nombre} decidio salir del bosque y volver a casa a salvo.`);
        break;

    } else {
        console.log('\nOpcion invalida. Intenta de nuevo.');
    }
}

console.log('\n================================================');
console.log('              GRACIAS POR JUGAR');
console.log('================================================\n');