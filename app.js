// Datos de ejemplo
const customers = [
    {
      identification: '123456789',
      firstName: 'Juan',
      lastName: 'Diaz',
      phone: '1234567890',
      email: 'juan@example.com',
      placa: 'DFP172',
      tipo: 'Camioneta'
    },
    {
      identification: '987654321',
      firstName: 'Maria',
      lastName: 'Suarez',
      phone: '0987654321',
      email: 'suarez@example.com',
      placa: 'VFR789',
      tipo: 'Camioneta'
    }
  ];

  const services = [
    {
      id: '1',
      name: 'Lavado de Chasis',
      valueService: 90000,
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      points: 100
    },
    {
      id: '2',
      name: 'Grafitado',
      valueService: 20000,
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      points: 50
    }
  ];

  // Función para registrar un cliente
  function registerCustomer(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const identification = document.getElementById('identification').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const placa = document.getElementById('placa').value;
    const tipo = document.getElementById('tipo').value;

    // Crear un nuevo objeto cliente
    const newCustomer = {
      identification,
      firstName,
      lastName,
      phone,
      email,
      placa,
      tipo
    };

    // Agregar el nuevo cliente a la lista de clientes
    customers.push(newCustomer);

    // Limpiar el formulario
    document.getElementById('identification').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('tipo').value = '';

    // Actualizar la tabla de clientes
    renderCustomerTable();

    alert('Cliente registrado exitosamente.');
  }

  // Función para renderizar la tabla de clientes
  function renderCustomerTable(filteredCustomers) {
    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.innerHTML = '';

    const customersToRender = filteredCustomers || customers;

    for (const customer of customersToRender) {
      const row = `
        <tr>
          <td>${customer.identification}</td>
          <td>${customer.firstName}</td>
          <td>${customer.lastName}</td>
          <td>${customer.phone}</td>
          <td>${customer.email}</td>
          <td>${customer.placa}</td>
          <td>${customer.tipo}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editCustomer('${customer.identification}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${customer.identification}')">Eliminar</button>
          </td>
        </tr>
      `;

      customerTableBody.innerHTML += row;
    }
  }

  // Función para buscar clientes
  function searchCustomers() {
    const searchValue = document.getElementById('searchCustomer').value.trim().toLowerCase();
    const filteredCustomers = customers.filter(customer =>
      customer.identification.toLowerCase().includes(searchValue) ||
      customer.firstName.toLowerCase().includes(searchValue) ||
      customer.lastName.toLowerCase().includes(searchValue)
    );

    renderCustomerTable(filteredCustomers);
  }

  // Función para eliminar un cliente
  function deleteCustomer(identification) {
    const index = customers.findIndex(customer => customer.identification === identification);
    if (index !== -1) {
      customers.splice(index, 1);
      renderCustomerTable();
      alert('Cliente eliminado exitosamente.');
    }
  }

  // Función para editar un cliente
  function editCustomer(identification) {
    const customer = customers.find(customer => customer.identification === identification);
    if (customer) {
      document.getElementById('identification').value = customer.identification;
      document.getElementById('firstName').value = customer.firstName;
      document.getElementById('lastName').value = customer.lastName;
      document.getElementById('phone').value = customer.phone;
      document.getElementById('email').value = customer.email;
      document.getElementById('placa').value = customer.placa;
      document.getElementById('tipo').value = customer.tipo;

      // Eliminar el cliente de la lista de clientes
      deleteCustomer(identification);
    }
  }
/* Módulo gestión de servicios */

var listaServicios = [];

var idJuegoClikeado = "";

//inputs, form, btones

const formularioGestionVj = document.querySelector("#form-gestion-vj");

const inputNombreVj = document.querySelector("#nombre-vj");
const inputdescripcion = document.querySelector("#descripcion");
const inputValorLicenciaVj = document.querySelector("#valor-licencia-vj");
const inputPuntosVj = document.querySelector("#puntos-vj");

formularioGestionVj.addEventListener('submit',validarFormularioVj);

function validarFormularioVj(e){
    e.preventDefault();

    //validar 
    if(inputNombreVj.value === "" || inputdescripcion.value === "" 
    || inputValorLicenciaVj.value === "" || inputPuntosVj.value === ""){
        alert("Todos los campos son obligatorios!");
        return;
    }else{
        const objJuego = vjCreator(Date.now(),inputNombreVj.value,inputdescripcion.value,
        inputValorLicenciaVj.value,inputPuntosVj.value);

        agregarJuego(objJuego);

    }

};

function agregarJuego(objJuego){
    listaServicios.push(objJuego);

    mostrarJuegos(listaServicios);

    formularioGestionVj.reset();

    listarJuegosSelect();
}

function mostrarJuegos(listaServicios){

    limpiarHTMLJuegos();

    const tbodyVj = document.querySelector("#tbody-gestion-vj");

    listaServicios.forEach((juego)=>{
        //desesctructurado
        const {idVj,nombreVj,descripcion,valorLicenciaVj,puntosVj} = juego;

        const trBodyVj = document.createElement("tr");
        trBodyVj.setAttribute("id",idVj);
        trBodyVj.innerHTML =`<th scope="row">${idVj}</th>
                            <td>${nombreVj}</td>
                            <td>${descripcion}</td>
                            <td>${valorLicenciaVj}</td>
                            <td>${puntosVj}</td>`;

        //botones
        //eliminar
        const eliminarBotonVj = document.createElement("button");
        eliminarBotonVj.onclick = () => eliminarJuego(idVj);
        eliminarBotonVj.textContent = "Eliminar";
        eliminarBotonVj.classList.add("btn","btn-danger");
        trBodyVj.append(eliminarBotonVj);

        tbodyVj.appendChild(trBodyVj);
    });
}

function eliminarJuego(idVj){
    listaServicios = listaServicios.filter(juego => juego.idVj !== idVj);

    limpiarHTMLJuegos();
    mostrarJuegos(listaServicios);

    listarJuegosSelect();
}

//funcion para crear obj video juegos
const vjCreator = (idVj,nombreVj,descripcion,valorLicenciaVj,puntosVj) =>({idVj,nombreVj,descripcion,valorLicenciaVj,puntosVj});

//funcion para limpiar tbody de gestion vj
function limpiarHTMLJuegos(){
    const tbodyVj = document.querySelector("#tbody-gestion-vj");
    tbodyVj.innerHTML = "";
}

  
  function initialize() {
    renderCustomerTable();

    const customerForm = document.getElementById('customerForm');
    customerForm.addEventListener('submit', registerCustomer);
  }

  initialize();