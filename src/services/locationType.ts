const records = [
  {
    id: '1',
    name: 'Warehouse',
  },
  {
    id: '2',
    name: 'Supplier',
  },
  {
    id: '3',
    name: 'Bin',
  },
  {
    id: '4',
    name: 'Production Line',
  },
];

export interface LocationType {
  id: string;
  name?: string;
}

export async function findAllLocationType(): Promise<LocationType[]> {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() + 5, records);
  });
}

export async function findLocationTypeById(query: {
  id: string;
}): Promise<LocationType | null> {
  const { id } = query;
  return records.find(r => r.id === id) || null;
}
