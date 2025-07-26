import Order from "../Components/Order";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Order />
        </div>
      </div>
    </div>
  );
}
