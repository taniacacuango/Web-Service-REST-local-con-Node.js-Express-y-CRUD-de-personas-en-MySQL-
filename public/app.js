const API_URL = '/api/personas';

const form = document.getElementById('personaForm');
const tabla = document.getElementById('tablaPersonas');

let cedulaEditando = null;

async function cargarPersonas() {

    const response = await fetch(API_URL);

    const result = await response.json();

    tabla.innerHTML = '';

    result.data.forEach(persona => {

        tabla.innerHTML += `
            <tr>
                <td>${persona.cedula}</td>
                <td>${persona.apellidos}</td>
                <td>${persona.nombres}</td>
                <td>${persona.fechaNacimiento.substring(0,10)}</td>
                <td>${persona.direccion}</td>
                <td>${persona.ciudad}</td>

                <td>
                    <button onclick="editarPersona('${persona.cedula}')">
                        Editar
                    </button>

                    <button onclick="eliminarPersona('${persona.cedula}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const persona = {

        cedula: document.getElementById('cedula').value,

        apellidos: document.getElementById('apellidos').value,

        nombres: document.getElementById('nombres').value,

        fechaNacimiento: document.getElementById('fechaNacimiento').value,

        direccion: document.getElementById('direccion').value,

        ciudad: document.getElementById('ciudad').value
    };

    const url = cedulaEditando
        ? `${API_URL}/${cedulaEditando}`
        : API_URL;

    const metodo = cedulaEditando
        ? 'PATCH'
        : 'POST';

    const response = await fetch(url, {

        method: metodo,

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(persona)
    });

    if(response.ok){

        form.reset();

        cedulaEditando = null;

        document.querySelector(
            '#personaForm button'
        ).textContent = 'Guardar';

        cargarPersonas();

    }else{

        const error = await response.json();

        alert(error.error);
    }

});

async function editarPersona(cedula){

    const response = await fetch(
        `${API_URL}/${cedula}`
    );

    const result = await response.json();

    const persona = result.data;

    document.getElementById('cedula').value =
        persona.cedula;

    document.getElementById('apellidos').value =
        persona.apellidos;

    document.getElementById('nombres').value =
        persona.nombres;

    document.getElementById('fechaNacimiento').value =
        persona.fechaNacimiento.substring(0,10);

    document.getElementById('direccion').value =
        persona.direccion;

    document.getElementById('ciudad').value =
        persona.ciudad;

    cedulaEditando = cedula;

    document.querySelector(
        '#personaForm button'
    ).textContent = 'Actualizar';
}

async function eliminarPersona(cedula){

    if(!confirm('¿Eliminar registro?')){
        return;
    }

    await fetch(`${API_URL}/${cedula}`,{
        method:'DELETE'
    });

    cargarPersonas();
}
window.editarPersona = editarPersona;
window.eliminarPersona = eliminarPersona;
cargarPersonas();