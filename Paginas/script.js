function createNumber22() {
    const flowerContainer = document.querySelector(".flower-container");

    // Coordenadas para formar un "22"
    const number22Coordinates = [
        // Primer "2"
        { x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 70 },
        { x: 150, y: 120 }, { x: 100, y: 150 }, { x: 50, y: 250 },
        { x: 50, y: 200 }, { x: 100, y: 250 }, { x: 150, y: 250 },

        // Segundo "2"
        { x: 250, y: 50 }, { x: 300, y: 50 }, { x: 350, y: 70 },
        { x: 350, y: 100 }, { x: 300, y: 150 }, { x: 250, y: 250 },
        { x: 250, y: 200 }, { x: 300, y: 250 }, { x: 350, y: 250 },
    ];

    const colors = [
        { petal: '#FF69B4', center: '#FFD700' },
        { petal: '#FF4500', center: '#FFFF00' },
        { petal: '#1E90FF', center: '#FFA500' },
        { petal: '#32CD32', center: '#FF6347' }
    ];

    function createFlower(x, y) {
        const flower = document.createElement("div");
        flower.classList.add("flower");

        // Seleccionar colores aleatorios para los pétalos y el centro
        const color = colors[Math.floor(Math.random() * colors.length)];
        flower.style.setProperty('--petal-color', color.petal);
        flower.style.setProperty('--center-color', color.center);

        // Crear los pétalos
        for (let i = 1; i <= 8; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal", `p${i}`);
            flower.appendChild(petal);
        }

        // Crear el centro de la flor
        const center = document.createElement("div");
        center.classList.add("center");
        flower.appendChild(center);

        flower.style.position = "absolute";
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;

        flowerContainer.appendChild(flower);

        // Hacer desaparecer la flor y luego eliminarla
        setTimeout(() => {
            flower.remove();
        }, 5000);
    }

    function generateFlowers() {
        number22Coordinates.forEach(coord => {
            createFlower(coord.x, coord.y);
        });
    }

    // Generar las flores inicialmente y luego cada 5 segundos
    generateFlowers();
    setInterval(generateFlowers, 5000);
}

function createRandomFlowers() {
    const randomFlowerContainer = document.querySelector(".random-flower-container");

    // Número máximo de flores en pantalla
    const maxRandomFlowersOnScreen = 15;

    // Verificar si ya hay flores en pantalla
    if (document.querySelectorAll(".random-flower").length >= maxRandomFlowersOnScreen) {
        return; // No crear más flores
    }

    // Número máximo de flores a crear simultáneamente (entre 1 y 5)
    const maxRandomFlowers = Math.ceil(Math.random() * 5 + 1);
    const randomFlowerSize = 100; // Tamaño de la flor

    // Arrays para almacenar las posiciones de las flores existentes
    const randomFlowerPositions = [];

    for (let j = 0; j < maxRandomFlowers; j++) {
        let positionValid = false;
        let randomX, randomY;

        // Generar posiciones aleatorias y verificar que no se superpongan con las existentes
        while (!positionValid) {
            randomX = Math.random() * (window.innerWidth - randomFlowerSize);
            randomY = Math.random() * (window.innerHeight - randomFlowerSize);

            positionValid = true;

            // Verificar si la nueva posición está lo suficientemente alejada de las posiciones existentes
            for (const position of randomFlowerPositions) {
                const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
                if (distance < 100) { // Ajusta el rango según sea necesario
                    positionValid = false;
                    break;
                }
            }
        }

        // Agregar la nueva posición a la lista de posiciones existentes
        randomFlowerPositions.push({ x: randomX, y: randomY });

        const flower = document.createElement("div");
        flower.classList.add("random-flower");
        flower.style.animation = "fadeInRandomFlower 1s ease-in-out both"; // Agregar animación de entrada a la flor

        for (let i = 1; i <= 10; i++) {
            const petal = document.createElement("div");
            petal.classList.add("random-petal", `random-p${i}`);
            flower.appendChild(petal);

            // Tiempo aleatorio de desaparición entre 2 y 5 segundos
            const disappearanceTime = Math.random() * 3000 + 2000;

            // Agrega una animación de salida a los pétalos con el tiempo aleatorio de desaparición
            petal.style.animation = `fadeOutRandomPetal 0.5s ease-in-out both ${i * 0.1}s, fadeOutRandomFlower 0.5s ease-in-out both ${disappearanceTime}s`;
        }

        flower.style.position = "fixed";
        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;

        randomFlowerContainer.appendChild(flower);

        // Tiempo aleatorio de desaparición entre 2 y 5 segundos
        const disappearanceTime = Math.random() * 3000 + 2000;

        setTimeout(() => {
            randomFlowerContainer.removeChild(flower);

            // Remover la posición de la flor que desapareció de la lista de posiciones existentes
            randomFlowerPositions.splice(randomFlowerPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
        }, disappearanceTime);
    }
}

// Iniciar la función de flores aleatorias y de "22" cuando el documento esté cargado
document.addEventListener("DOMContentLoaded", () => {
    createNumber22();
    setInterval(() => {
        console.log("Generating random flowers...");
        createRandomFlowers();
    }, 1000); // Nuevas flores aleatorias cada 1 segundo
});
