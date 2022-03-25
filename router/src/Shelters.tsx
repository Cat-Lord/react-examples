import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { QueryNavLink } from "./components/QueryNavLink";
import { Shelter, getShelters, deleteShelterByNumber } from "./data/shelters";

export const Shelters = () : JSX.Element => {
  const shelters = getShelters();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
  <>
    <input 
      value={searchParams.get('filter') || ''}
      onChange={(event) => {
        let filter = event.target.value;
        if (filter)
          setSearchParams( {filter} );
        else
          setSearchParams({});
      }}
    />
    {
      shelters
      .filter((shelter) => {
        const filter = searchParams.get('filter');
        if ( ! filter ) return true;

        const name = shelter.name.toLowerCase();
        return name.startsWith(filter);
      })
      .map((shelter: Shelter) => {
        return (
          <li key={ shelter.number }>
            <QueryNavLink 
              style={{ display: "inline-block", margin: "1rem 0" }}
              to={ `/shelters/${shelter.number}` }
            >
              { shelter.name } Shelter
            </QueryNavLink>
          </li>
        )}
      ) 
    }
    <Outlet />
    <button onClick={() => {
      const shelterId = parseInt(params.shelterId || "-1");

      if (shelterId === undefined || shelterId === null)
        return;

      deleteShelterByNumber(shelterId);
      navigate("/shelters" + location.search);
    }} 
      >Delete selected shelter
    </button>
  </>
  );
}