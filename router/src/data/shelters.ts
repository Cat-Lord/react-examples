export interface Shelter {
  name: string,
  number: number,
  amount: string,
  buildAt: string
}

let shelters : Shelter[] = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "10,800",
    buildAt: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "8,000",
    buildAt: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "9,500",
    buildAt: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "14,000",
    buildAt: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "4,600",
    buildAt: "01/27/1998",
  },
];

export function getShelters() : Shelter[] {
  return shelters;
}

export function getShelterByNumber(number: number) : Shelter | undefined {
  return shelters.find((currentShelter) => currentShelter.number === number);
}

export function deleteShelterByNumber(number : number) : void {
  shelters = shelters.filter((shelter) => {
    return shelter.number !== number;
  })
}