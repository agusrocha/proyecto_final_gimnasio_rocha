/* Obtenemos datos almacenados localStorage */
$(document).ready(()=>{
    let turnosActuales = JSON.parse(localStorage.getItem('turnos')) || [];

    /* Creamos funcion para mostrar los datos del turno */
    const mostrarDatos = (turnosActuales) => {
        let divTurnos = $("#turnos");
        divTurnos.html("");/* Vaciamos html */
                        
        for (let i = 0; i < turnosActuales.length; i++) {
            divTurnos.prepend(`
                <div class="divTurnos">
                    <strong>Nombre:</strong> ${turnosActuales[i].nombre}<br>
                    <strong>Email:</strong> ${turnosActuales[i].email}<br>
                    <strong>Telefono:</strong> ${turnosActuales[i].telefono}<br>
                    <strong>Sucursal:</strong> ${turnosActuales[i].agencia}<br>
                    <strong>Actividad:</strong>  ${turnosActuales[i].actividad}<br>
                    <strong>Horario:</strong> ${turnosActuales[i].horario}<br>
                    <strong>Fecha:</strong> ${turnosActuales[i].fecha}<br>
                    <button class="eliminar" id="eliminar-${i}">Eliminar</button>
                </div>`)
        }
        /* Boton eliminar turnos */
        $(".divTurnos .eliminar").click(function(){
            const id=$(this).attr("id");
            const index = id.split("-")[1];
            
           turnosActuales.splice(index,1);
           localStorage.setItem('turnos', JSON.stringify(turnosActuales));
    
           mostrarDatos(turnosActuales);
        });
    }
    /* Llamamos funcion */
    mostrarDatos(turnosActuales);

    

});