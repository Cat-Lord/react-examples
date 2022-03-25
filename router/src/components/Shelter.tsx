import { useParams } from "react-router-dom";
import { getShelterByNumber } from "../data/shelters";

export const Shelter = () => {
  const shelterId : number = parseInt(useParams().shelterId ?? "-1", 10);   // base 10
  
  const shelter = getShelterByNumber(shelterId);
  
  if (shelter === undefined)
    return <h4>No such shelter</h4>

  return (
    <div>
      <h3>Shelter {shelterId}</h3>
      <div>
        <h4>   {shelter.name}</h4>
        <small>Build at: {shelter.buildAt}</small>
        <p>    {shelter.number}</p>
        <h2>   {shelter.amount}</h2>
      </div>
    </div>
  );
}