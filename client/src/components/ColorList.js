import React, { useState } from "react";
import axios from "axios";
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

  console.log('match.params.id outside put', match.params.id)
  console.log('colors', colors)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    e.preventDefault();
   
    console.log('colorToEdit', colorToEdit)
    AxiosWithAuth()
        .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)

        .then(res => {
            console.log('res inside put', res)
            console.log('res.data', res.data);
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
  };

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
                  x
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
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
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
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;