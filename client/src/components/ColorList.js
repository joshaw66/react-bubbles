import React, { useState } from "react";
import { AxiosWithAuth } from '../utils/AxiosWithAuth';
import { useRouteMatch, useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const match = useRouteMatch();
  const history = useHistory();
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
  code: { hex: "" }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    console.log('colorToEdit', colorToEdit)
    AxiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)

      .then(res => {

        AxiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);
        history.push(`/`)

      })
      .catch(err => {
        console.log('err inside catch', err);
      })

  };

  const deleteColor = color => {
    console.log('colorToEdit', colorToEdit)
    AxiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)

      .then(res => {

        AxiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);
        history.push(`/`)

      })
      .catch(err => {
        console.log('err inside catch', err);
      })
  };

  const addColor = (e) => {
    e.preventDefault();
    console.log(newColor)

    AxiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        AxiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value })
  }

  const handleHexChange = (e) => {
    setNewColor({...newColor, code: {hex: e.target.value}})
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                X
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />

      <form onSubmit={(e) => addColor(e)}>
        <p>Color:</p>
        <input
          type='text'
          name='color'
          onChange={(e) => handleChange(e)}
        />
        <p>Hex:</p>
        <input
          type='text'
          name='hex'
          onChange={(e) => handleHexChange(e)}
        />

        <p></p>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;