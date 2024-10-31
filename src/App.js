import { useState, useId } from 'react';
import { editIcon } from './Icons';
import { deleteIcon } from './Icons';

function App() {
  const [budList, setBudList] = useState([]);
  const [input, setInput] = useState('');
  const [quantity, setQuantity] = useState();
  const [alert, setAlert] = useState('');
  const [msgType, setMsgType] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState();

  const alertMsg = (msg, type) => {
    setAlert(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlert('');
      setMsgType('');
      setIsAlert(false);
    }, 2000);
    return () => clearTimeout(timer)
  }

  const handleAddBud = (e) => {
    e.preventDefault();
    if (!input || !quantity) {
      alertMsg('Enter grocery name!');
      setMsgType('warn-msg');
    }
    else {
      const addBud = { id: new Date().getTime().toString(), name: input, quantity: quantity }
      setBudList([...budList, addBud]);
      alertMsg('Item added!');
      setMsgType('sucs-msg');
      setInput('');
      setQuantity(1);
    }
  }

  const handleEditBud = (e) => {
    e.preventDefault();
    if (!editName || !editQuantity || !isEdit) {
      alertMsg('Enter grocery name!');
      setMsgType('warn-msg');
    }
    else {
      setBudList(budList.map((bud) => bud.id === editId ? { ...bud, name: editName, quantity: editQuantity } : bud));
      alertMsg('Item Edited!');
      setMsgType('sucs-msg');
      setInput('');
      setQuantity(1);
      setIsEdit(false);
    }
  }

  const handleDelete = (id) => {
    setBudList(budList.filter((bud) => bud.id !== id));
    alertMsg('Item removed!');
    setMsgType('warn-msg');
  }

  const handleEdit = (id, name, quantity) => {
    setIsEdit(true);
    setEditId(id);
    setEditName(name);
    setEditQuantity(quantity);
  }

  const handleAllRemove = () => {
    let confirms = window.confirm('Are you sure to delete all the data?');
    if (confirms) {
      setBudList([])
    }
  }

  return (
    <div className="design-box">
      <h2>Grocery Bud</h2>
      {isAlert && <p className={msgType}>{alert}</p>}

      <form onSubmit={isEdit ? handleEditBud : handleAddBud} className='form-control'>
        <input
          type='text'
          placeholder='e.g.: egg'
          value={isEdit ? editName : input}
          onChange={(e) => isEdit ? setEditName(e.target.value) : setInput(e.target.value)}
        />
        <select
          value={isEdit ? editQuantity : quantity}
          onChange={(e) => isEdit ? setEditQuantity(e.target.value) : setQuantity(e.target.value)}
        >
          {Array.from({ length: 12 }, ((_, i) => i + 1)).map((index) => <option key={index}>{index}</option>)}
        </select>
        <button style={{ background: isEdit ? '#F04654' : '#2687E8' }}>{isEdit ? "Edit Buds" : "Add Buds"}</button>
      </form>
      <h3>Grocery List</h3>
      <table className='dublist' width="100%">
        <thead>
          <tr>
            <th>SI. No.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {budList.length > 0 ? budList.reverse().map((bud, i) => <tr key={bud.id}>
            <td>{i + 1}</td>
            <td>{bud.name}</td>
            <td>{bud.quantity}</td>
            <td>
              <button onClick={() => handleDelete(bud.id)}>{deleteIcon}</button>
              <button onClick={() => handleEdit(bud.id, bud.name, bud.quantity)}>
                {editIcon}
              </button>
            </td>
          </tr>) : <tr>
            <td colSpan="4">No Record found</td>
          </tr>}
        </tbody>
      </table>
      {budList.length > 0 && <button onClick={handleAllRemove} className='remove-btn'>Remove all</button>}
    </div>
  );
}

export default App;
