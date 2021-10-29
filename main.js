//loclizacion de lo elementos
const form = $("#form");
const name = $("#nombre");
const mail = $("#correo");
const telefono = $("#tel");
const gen = $("#genero");
const agen = $("#agencia");
const act = $("#entrenamiento");
const dia = $("#fecha");
const horariosSelect = $("#horario");
const reseteo = $("#reset");

//construccion del objeto formulario
const formularioValido = {
    nombre: false,
    email: false,
    telefono: false,
    genero: false,
    agencia: false,
    actividad: false,
    horario: false,
    fecha: false,
}

//ACTIVIDAD
$("#entrenamiento").change((e) => {
    
    //crear array de horarios de actividad dependendiendo el entrenamiento    
    const horariosActividad = [
        ["7:00", "8:00", "9:00", "14:00", "15:00", "16:00"],
        ["9:00", "10:00", "11:00", "16:00", "17:00", "18:00"],
        ["11:00", "12:00", "13:00", "18:00", "19:00", "20:00"],
        ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"],
    ]
    const horariosCorrespondientes = horariosActividad[+e.target.value - 1];

    $("#horario").html(`<option selected disabled hidden value="">Seleccione un horario</option>`);

    horariosCorrespondientes.forEach((horario) => {
        const horarioOption = $("<option></option>");
        horarioOption.text(horario);
        horarioOption.value = horario;
        $("#horario").append(horarioOption);
    });
});

//FORMULARIO
$("#form").submit((e) => {
    e.preventDefault();
   
    const datosTurno = {
        nombre: nombre.value,
        email: correo.value,
        telefono: tel.value,
        genero:$("#genero [name=sexo]:checked").val(),
        agencia: $("#agencia option:selected").text(),
        actividad: $("#entrenamiento option:selected").text(),
        horario: horario.value,
        fecha: fecha.value,
    }

    formularioValido.nombre=datosTurno.nombre.length > 0;
    formularioValido.email=datosTurno.email.length > 0;
    formularioValido.telefono=datosTurno.telefono.length > 0;
    formularioValido.genero=!!datosTurno.genero;
    formularioValido.agencia=!!datosTurno.agencia;
    formularioValido.actividad=!!datosTurno.actividad;
    formularioValido.horario=!!datosTurno.horario;
    formularioValido.fecha=datosTurno.fecha.length >0;
        
    //Ejecutar funcion todos los campos completos
    camposCompletos();
    //Almacenar turno seleccionado
    const turnosActuales = JSON.parse(localStorage.getItem('turnos')) || [];
    
    turnosActuales.push(datosTurno);
    localStorage.setItem('turnos', JSON.stringify(turnosActuales));

});

//Comprobar que todos los campos esten completos antes del envio
const camposCompletos = () => {
    const campos = Object.values(formularioValido);
    const completo = campos.findIndex(value => value == false);
    if (completo == -1) {
                
        //Mostrar por DOM turno seleccionado
        let contenedor = $("#turno");
        const nombreAgencia=$("#agencia option:selected").text();
        const nombreActividad=$("#entrenamiento option:selected").text();

        contenedor.prepend(`
                    <div class="divTurno">
                        <h3> Turno asignado </h3>
                        <p>Sucursal: ${nombreAgencia}</p>
                        <p> Nombre: ${nombre.value} </p> 
                        <p>Actividad: ${nombreActividad}</p>
                        <p> Horario: ${horario.value} </p> 
                        <p> Dia: ${fecha.value} </p></div>`);

    } else alert(`Formulario invalido, por favor complete todos los campos`);
};

//Animacion al formulario
$("#form").slideDown(2000);

//Funcion GET de sucursales
function sucursales(respuesta, estado) {
    //Preguntamos si el estado respondido es success
    if (estado === "success") {
        //Si es true la respuesta son las sucursales
        for (const sucursal of respuesta) {
            //Estructura de HTML
            $("#sucursal").append(` <div class="sucursalCaja">
                                    <h5>${sucursal.nombre}</h5>
                                    <p>${sucursal.direccion}</p>
                                    <p>${sucursal.localidad}</p>
                                    </div>`);
        }
    }
}
//Url de sucursales por JSON
const JSONSUCURSAL = "https://github.com/agusrocha/proyecto_final_gimnasio_rocha/blob/main/datos.json";
//Agrego titulo a las respuestas
$("#sucursal").prepend(`<h4>Sucursales</h4>`)
//Llmada con el metodo GET de jquery
$.get(JSONSUCURSAL, sucursales);