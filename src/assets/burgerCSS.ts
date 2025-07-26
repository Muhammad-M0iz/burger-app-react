export const colors = {
  bun: {
    light: '#FEF3C7',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
    darker: '#92400E',
  },
  meat: {
    light: '#A16207',
    DEFAULT: '#78350F',
    dark: '#451A03',
  },
  lettuce: '#10B981',
  cheese: '#FDE047',
  bacon: '#DC2626',
  tomato: '#EF4444',
  
  surface: '#FFFBEB',
  background: '#FEF3C7',
  text: {
    primary: '#78350F',
    secondary: '#92400E',
    muted: '#A16207',
  },
  
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export const burgerCssModel = {
  burgerBun: 'bg-gradient-to-b from-amber-400 to-amber-600 rounded-full w-32 h-8 mx-auto shadow-lg border-2 border-amber-700 relative before:content-[""] before:absolute before:top-1 before:left-4 before:w-1 before:h-1 before:bg-amber-800 before:rounded-full before:shadow-sm after:content-[""] after:absolute after:top-1 after:right-4 after:w-1 after:h-1 after:bg-amber-800 after:rounded-full after:shadow-sm',
  Meat: 'bg-gradient-to-b from-amber-900 to-amber-950 rounded w-28 h-6 mx-auto shadow-md border border-amber-800',
  Lettuce: 'bg-gradient-to-b from-green-400 to-green-600 w-30 h-3 mx-auto shadow-sm border border-green-700 transform rotate-1',
  Cheese: 'bg-gradient-to-b from-yellow-300 to-yellow-500 rounded w-30 h-3 mx-auto shadow-sm border border-yellow-600',
  Bacon: 'bg-gradient-to-b from-red-600 to-red-800 w-28 h-4 mx-auto shadow-sm border border-red-900 transform -rotate-1'
};

export const buttonStyles = {
  primary: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-amber-700',
  secondary: 'bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-amber-800',
  success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200',
  outline: 'border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200'
};

export const cardStyles = {
  primary: 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 p-6',
  surface: 'bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 p-6',
  ingredient: 'bg-white rounded-xl shadow-md border border-amber-100 p-4 hover:shadow-lg transition-all duration-200 hover:border-amber-300'
};