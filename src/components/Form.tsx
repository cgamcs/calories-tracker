import { useState, useEffect, type ChangeEvent, type Dispatch, type FormEvent } from "react"
import {v4 as uuidv4} from "uuid"
import type { Activity } from "../types"
import { categories } from "../data/category"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProp = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

function Form({ dispatch, state } : FormProp) {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity

    return name.trim() !== '' && calories > 0
  }

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'save-activity', payload: {newActivity: activity} })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-2xl"
      onSubmit={handelSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select
          id="category"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 rounded-lg w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-70 disabled:cursor-default"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}

export default Form