export interface Rendeles {
  email: string;
  termekek: {
    name: string;
    price: number;
    description: string;
  }[];
  osszeg: number;
  datum: string; 
  nev?: string;
  megjegyzes?: string;
  cim?: string;
}
