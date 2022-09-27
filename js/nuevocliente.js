(function() {
    let DB;

    const formulario = document.querySelector('#formulario');
    
    document.addEventListener('DOMContentLoaded', function() {
        formulario.addEventListener('submit', validarCliente)
        conectarDB();
    });



    function validarCliente(e) {
        e.preventDefault();
        
        // Leer todo los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlertar('Todo los campos son obligatorios', 'error');

            return;
        }

        // Crear un objeto con la infomacion 
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        cliente.id = Date.now();

        console.log(cliente);
        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlertar('Este correo esta usado', 'error');
        };

        transaction.oncomplete = function() {
            console.log('Cliente Agregado');

            imprimirAlertar('El cliente se agrego correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            },3000);
        };
    }


})();