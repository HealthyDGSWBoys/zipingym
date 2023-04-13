const Itemlist: Array<ItemInfo> = [
  {
    name: 'banana',
    type: 'good',
  },
  {
    name: 'cola',
    type: 'bad',
  },
];

export interface ItemInfo {
  name: string;
  type: 'good' | 'bad';
  model?: string;
}

export default Itemlist;
