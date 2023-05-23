import logo from './logo.svg';
import './App.css';
import allContacs from "./contacts.json"
import { useState } from "react";

function App() {
  // Obtener los primeros 5 contactos del archivo JSON
  const initialContacts = allContacs.slice(0, 6);

  // Definir el estado inicial con los contactos
  const [contacts, setContacts] = useState(initialContacts);

  // Imprimir los contactos en la consola para verificar
  console.log(contacts);

  // Obtener los contactos restantes que aún no se muestran
  const remainingContacts = allContacs.slice(5);

  // Imprimir los contactos en la consola para verificar
  console.log(contacts);

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      console.log("No more contacts available.");
      return;
    }

    // Generar un índice aleatorio para seleccionar un contacto aleatorio de los restantes
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    // Clonar el array de contactos existente y agregar el contacto aleatorio
    const updatedContacts = contacts.slice();
    updatedContacts.push(randomContact);
    setContacts(updatedContacts);

    // Filtrar los contactos restantes para eliminar el contacto agregado aleatoriamente
    const updatedRemainingContacts = remainingContacts.filter(
      (contact) => contact.id !== randomContact.id
    );
    console.log("Added random contact:", randomContact);
    console.log("Updated contacts:", updatedContacts);
    console.log("Updated remaining contacts:", updatedRemainingContacts);
  };

  const sortByName = () => {
    // Clonar el array de contactos existente para evitar modificar el estado directamente
    const sortedContacts = [...contacts];

    // Ordenar los contactos por nombre (orden alfabético)
    sortedContacts.sort((a, b) => a.name.localeCompare(b.name));

    // Actualizar el estado con los contactos ordenados
    setContacts(sortedContacts);

    console.log("Contacts sorted by name:", sortedContacts);
  };

  const sortByPopularity = () => {
    // Clonar el array de contactos existente para evitar modificar el estado directamente
    const sortedContacts = [...contacts];

    // Ordenar los contactos por popularidad (mayor a menor)
    sortedContacts.sort((a, b) => b.popularity - a.popularity);

    // Actualizar el estado con los contactos ordenados
    setContacts(sortedContacts);

    console.log("Contacts sorted by popularity:", sortedContacts);
  };

  const removeContact = (id) => {
    // Filtrar los contactos para eliminar el contacto con el id correspondiente
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    // Actualizar el estado con los contactos actualizados
    setContacts(updatedContacts);

    console.log("Contact removed:", id);
    console.log("Updated contacts:", updatedContacts);
  };

  return (
    <div className="App">
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterar sobre los contactos y mostrar los detalles en filas de la tabla */}
          {contacts.map((eachContact) => (
            <tr key={eachContact.id}>
              <td>
                <img src={eachContact.pictureUrl} alt={eachContact.name} width="100px"/>
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity}</td>
              {/* Mostrar el ícono de un trofeo si el contacto ha ganado un Oscar */}
              <td>{eachContact.wonOscar ? <span>🏆</span> : null}</td>
              {/* Mostrar el ícono de un trofeo si el contacto ha ganado un Emmy */}
              <td>{eachContact.wonEmmy ? <span>🏆</span> : null}</td>
              <td> <button onClick={() => removeContact(eachContact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
