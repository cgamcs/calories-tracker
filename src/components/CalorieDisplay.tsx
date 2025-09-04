type CalorieDisplayProp = {
  calories: number
  text: string
}

function CalorieDisplay({ calories, text }: CalorieDisplayProp) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className={`font-black text-6xl ${text === 'Comida' ? 'text-orange-500' : text === 'Ejercicio' ? 'text-lime-500' : 'text-white'}`}>{calories}</span>
      {text}
    </p>
  )
}

export default CalorieDisplay