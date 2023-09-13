console.log("Ejercicio 1: Promesas Encadenadas");
function numeroAleatorio() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random_num = Math.floor(Math.random() * 100) + 1;
            resolve(random_num);
            console.log("Tu número aleatorio es:", random_num)
        }, 2000);
    }).then((numero) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const cuadrado = (numero * numero)
                resolve(cuadrado);
                console.log(`El cuadrado de ${numero} es ${cuadrado}`)
            }, 1000);
        });
    }).then((resultado) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const raiz = Math.sqrt(resultado);
                resolve(raiz);
                console.log("La raíz del último número es: ", raiz)
            }, 1000);
        });
    });
}

numeroAleatorio().then(() => {
    console.log();
}).catch((error) => {
    console.error(error);
});

//---------------------------------------------------------------

function promesasMultiples(urls) {
    const promesas = urls.map(url => {
        return fetch(url).then(response => response.json());
    });

    return Promise.all(promesas);
}

const urls = ['https://reqres.in/api/users?page=1', 'https://reqres.in/api/users?page=2', 'https://reqres.in/api/users?page=3'];
promesasMultiples(urls).then(promesasArray => {
    console.log("Ejercicio 2: Promesa de Múltiples Solicitudes");
    console.log(promesasArray);
}).catch(error => {
    console.error(error);
});

//----------------------------------------------------------------

function promesasParalelo(funcionesPromesa) {
    const promesasParalelo = funcionesPromesa.map(func => func());
    return Promise.all(promesasParalelo);
}

const promesa1 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 1'), 3000));
const promesa2 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 2'), 3000));
const promesa3 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 3'), 3000));

const allPromises = [promesa1, promesa2, promesa3];

promesasParalelo(allPromises).then(resultado => {
    console.log("Ejercicio 3: Promesas Paralelas");
    console.log(resultado);
}).catch(error => {
    console.error(error);
});

// ----------------------------------------------------------------

console.log("Ejercicio 4: Promesas en Cadena con Retraso");
function NPromesas(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i = 1; i <= n; i++) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(i);
                        resolve();
                    }, i * n * 1000);
                }).then(() => {
                    if (i === n) {
                        resolve("Todas las promesas se resolvieron");
                    }
                });
            }
        });
    });
}

NPromesas(5).then(resultado => {
    console.log(resultado);
}).catch(error => {
    console.error(error);
});

// ----------------------------------------------------------------

function promesaCanceladaOCompletada() {
    let cancelPromise = false;
    const promesaCompletada = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cancelPromise === false) {
                resolve("Promesa completada");
            }
        }, 5000);
    });

    const promesaCancelada = () => {
        cancelPromise = true;
        console.log("Promesa cancelada");
    };
    return { promesaCompletada, promesaCancelada };
}
const { promesaCompletada, promesaCancelada } = promesaCanceladaOCompletada();

promesaCompletada.then((resultado) => {
    console.log(resultado);
})

setTimeout(() => {
    console.log("Ejercicio 5: Promesa con Cancelación");
    promesaCancelada();
}, 1000); // Ajustar el tiempo > 5000 para que se cancele la promesa 