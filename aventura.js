// Importamos la librería para leer las respuestas del jugador
const readline = require('readline-sync');

// 1. Clases de personajes (Nuestro "molde")
class Animal {
    constructor(nombre) { 
        this.nombre = nombre; 
        this.energia = 100; // Energía inicial
    }
    
    // Nueva acción genérica
    descansar() {
        this.energia += 20;
        console.log(`[Zzz] ${this.nombre} tomó una siesta. Recuperó energía. (Energía: ${this.energia})`);
    }
}

class Mono extends Animal {
    trepar() { 
        this.energia -= 15; 
        console.log(`[ACCIÓN] ${this.nombre} trepó ágilmente a la copa de un árbol. (Energía: ${this.energia})`);
    }
}

class Conejo extends Animal {
    saltar() { 
        this.energia -= 10; 
        console.log(`[ACCIÓN] ${this.nombre} dio un salto gigante. (Energía: ${this.energia})`);
    }
}

// 2. INICIO DEL JUEGO
console.log('\n==================================');
console.log('   AVENTURA EN EL BOSQUE INFINITO');
console.log('==================================\n');

// Selección de personaje
const opcionesPersonaje = ['El Mono Ágil', 'El Conejo Veloz'];
const indicePersonaje = readline.keyInSelect(opcionesPersonaje, '¿A quién eliges para esta aventura?');

if (indicePersonaje === -1) {
    console.log('Decidiste no entrar al bosque. ¡Hasta luego!');
    process.exit(); 
}

let jugador = (indicePersonaje === 0) ? new Mono('George') : new Conejo('Bugs');
console.log(`\n¡Bienvenido al bosque, ${jugador.nombre}! Tu energía inicial es ${jugador.energia}.\n`);

// 3. EL BUCLE DE JUEGO (GAME LOOP)
// Esto se repetirá infinitamente MIENTRAS la energía sea mayor que 0
while (jugador.energia > 0) {
    console.log('----------------------------------');
    
    // Opciones del menú principal
    const opcionesAccion = ['Explorar el bosque', 'Descansar', 'Huir del bosque (Salir)'];
    const accion = readline.keyInSelect(opcionesAccion, '¿Qué deseas hacer ahora?');

    // Evaluamos la decisión del jugador
    if (accion === 0) {
        // Explorar gasta energía usando la habilidad especial del animal
        console.log('\nDecides adentrarte en la maleza...');
        if (jugador instanceof Mono) {
            jugador.trepar();
        } else {
            jugador.saltar();
        }
        
    } else if (accion === 1) {
        // Descansar recupera energía
        console.log('\nEncuentras un lugar seguro...');
        jugador.descansar();
        
    } else if (accion === 2 || accion === -1) {
        // El jugador decide rendirse o presiona 0 (Cancelar)
        console.log(`\n${jugador.nombre} decidió salir del bosque y volver a casa a salvo.`);
        break; // La palabra 'break' rompe el bucle 'while' inmediatamente
    }

    // Verificamos si el jugador se quedó sin energía después de la acción
    if (jugador.energia <= 0) {
        console.log(`\nOh no... ${jugador.nombre} se quedó sin energía y se desmayó en el bosque.`);
        console.log('FIN DEL JUEGO.');
    }
}

console.log('\n==================================');
console.log('   GRACIAS POR JUGAR');
console.log('==================================\n');