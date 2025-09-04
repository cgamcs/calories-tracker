import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProp = {
  activities: Activity[]
}

function CalorieTracker({ activities }: CalorieTrackerProp) {
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])


  return (
    <>
      <h2 className="text-4xl text-white font-black text-center">Resumen de Calorias</h2>

      <div className="flex justify-between mt-5">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Comida"
        />

        <CalorieDisplay
          calories={caloriesBurned}
          text="Ejercicio"
        />

        <CalorieDisplay
          calories={netCalories}
          text="Restnate"
        />
      </div>
    </>
  )
}

export default CalorieTracker