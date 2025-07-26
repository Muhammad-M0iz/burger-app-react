
import Burger from "./Components/BurgerBuilder";
import { BurgerVisualization } from "./Components/BurgerVisiualizor";
import { useSelector } from "react-redux";
import type { Burger as BurgerType } from "../types/burger";

export default function App() {
  const burger = useSelector((state: { burger: BurgerType }) => state.burger);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200 p-8 sticky top-24">
              <BurgerVisualization burger={burger} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Burger />
          </div>
        </div>
      </div>
    </div>
  );
}

 



