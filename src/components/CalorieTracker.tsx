import type { Activity } from "../types"

type CalorieTrackerProp = {
  activities: Activity[]
}

function CalorieTracker({ activities } : CalorieTrackerProp) {
  return (
    <div>CalorieTracker</div>
  )
}

export default CalorieTracker