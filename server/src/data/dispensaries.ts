export interface StrainStock {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface DeliveryInfo {
  available: boolean;
  baseCost: number;
}

export interface Dispensary {
  id: string;
  name: string;
  strains: StrainStock[];
  delivery: DeliveryInfo;
}

const dispensaries: Dispensary[] = [
  {
    id: '1',
    name: 'Tel Aviv Dispensary',
    strains: [
      { id: 'strain1', name: 'Erez', stock: 10, price: 50 },
      { id: 'strain2', name: 'Avidekel', stock: 5, price: 60 }
    ],
    delivery: {
      available: true,
      baseCost: 20
    }
  },
  {
    id: '2',
    name: 'Jerusalem Dispensary',
    strains: [
      { id: 'strain1', name: 'Erez', stock: 0, price: 55 },
      { id: 'strain3', name: 'Tikun Olam', stock: 15, price: 45 }
    ],
    delivery: {
      available: false,
      baseCost: 0
    }
  }
];

export default dispensaries;
