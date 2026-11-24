import { Link, useParams } from "react-router";

function HotelDetailsPage() {
  const { id } = useParams();

  return (
    <main className="placeholder-page">
      <h1>Hotel Details</h1>

      <p>Hotel ID: {id}</p>

      <p>Complete hotel information and location map will be displayed here.</p>

      <Link to="/">Back to Hotel Listings</Link>
    </main>
  );
}

export default HotelDetailsPage;
