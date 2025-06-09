export interface Strain {
  id: number;
  name: string;
  description: string;
  classification: string;
}

let strains: Strain[] = [];
let nextId = 1;

export function list(): Strain[] {
  return strains;
}

export function get(id: number): Strain | undefined {
  return strains.find((s) => s.id === id);
}

export function add(strain: Omit<Strain, 'id'>): Strain {
  const newStrain: Strain = { id: nextId++, ...strain };
  strains.push(newStrain);
  return newStrain;
}

export function update(id: number, data: Omit<Strain, 'id'>): Strain | undefined {
  const index = strains.findIndex((s) => s.id === id);
  if (index === -1) return undefined;
  const updated: Strain = { id, ...data };
  strains[index] = updated;
  return updated;
}

export function remove(id: number): boolean {
  const index = strains.findIndex((s) => s.id === id);
  if (index === -1) return false;
  strains.splice(index, 1);
  return true;
}
