import BookingForm from "../components/BookingForm/BookingForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full bg-black text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Book Your One-on-One with Resk'Que</h1>
      </header>
      <main>
        <BookingForm />
      </main>
    </div>
  );
};

export default Index;