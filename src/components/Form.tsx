import { useState } from "react"
import { categories } from "../data/category"

function Form() {
  const [activity, setActivity] = useState({
    category: 1,
    name: '',
    calories: 0
  })

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-2xl"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select
          id="category"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
          value={activity.category}
        >
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
          placeholder="Ej. Comida, Jugo de Naranja, Pesas, Ejercicio, Bicicleta"
          value={activity.name}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
          placeholder="Ej. 300 o 540"
          value={activity.calories}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 rounded-lg w-full p-2 font-bold uppercase text-white cursor-pointer"
        value="Guardar"
      />
    </form>
  )
}

export default Form