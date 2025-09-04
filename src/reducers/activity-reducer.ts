import type { Activity } from "../types"

export type ActivityActions =
  { type: 'save-activity', payload: { newActivity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity['id'] } }     |
  { type: 'delete-activity', payload: { id: Activity['id'] } }  |
  { type: 'restart-app' } 

export type ActivityState = {
  activities: Activity[]
  activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
}

export const activityReducer = (state: ActivityState = initialState, actions: ActivityActions) => {
  if(actions.type === 'save-activity') {
    
    let updatedActivities : Activity[] = []
    if(state.activeId) {
      updatedActivities = state.activities.map(activity => activity.id === state.activeId ? actions.payload.newActivity : activity)
    } else {
      updatedActivities = [...state.activities, actions.payload.newActivity]
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: ''
    }
  }

  if(actions.type === 'set-activeId') {
    return {
      ...state,
      activeId: actions.payload.id
    }
  }

  if(actions.type === 'delete-activity') {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== actions.payload.id)
    }
  }

  return state
}