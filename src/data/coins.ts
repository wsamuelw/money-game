export type CoinData = {
  id: string;
  value: number; // in cents
  label: string;
  color: string;
  size: number; // relative size multiplier
  shape: 'circle' | 'dodecagon';
  animal: string;
  description: string;
};

export const coins: CoinData[] = [
  {
    id: '5c',
    value: 5,
    label: '5c',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FFFFFF_0%,_#E2E8F0_40%,_#94A3B8_80%,_#64748B_100%)] text-slate-800',
    size: 15,
    shape: 'circle',
    animal: 'Echidna',
    description: 'The tiny 5c coin features a spiky Echidna!',
  },
  {
    id: '10c',
    value: 10,
    label: '10c',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FFFFFF_0%,_#E2E8F0_40%,_#94A3B8_80%,_#64748B_100%)] text-slate-800',
    size: 17.5,
    shape: 'circle',
    animal: 'Lyrebird',
    description: 'The 10c coin shows a Lyrebird with its beautiful tail feathers.',
  },
  {
    id: '20c',
    value: 20,
    label: '20c',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FFFFFF_0%,_#E2E8F0_40%,_#94A3B8_80%,_#64748B_100%)] text-slate-800',
    size: 20,
    shape: 'circle',
    animal: 'Platypus',
    description: 'The 20c coin has a swimming Platypus.',
  },
  {
    id: '50c',
    value: 50,
    label: '50c',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FFFFFF_0%,_#E2E8F0_40%,_#94A3B8_80%,_#64748B_100%)] text-slate-800',
    size: 23.75,
    shape: 'dodecagon',
    animal: 'Coat of Arms',
    description: 'The big 50c coin has 12 sides and shows the Australian Coat of Arms (Kangaroo and Emu).',
  },
  {
    id: '100c',
    value: 100,
    label: '$1',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FEF08A_0%,_#F59E0B_40%,_#D97706_80%,_#B45309_100%)] text-amber-900',
    size: 21.25,
    shape: 'circle',
    animal: 'Kangaroos',
    description: 'The gold $1 coin features five Kangaroos jumping!',
  },
  {
    id: '200c',
    value: 200,
    label: '$2',
    color: 'bg-[radial-gradient(ellipse_at_top_left,_#FEF08A_0%,_#F59E0B_40%,_#D97706_80%,_#B45309_100%)] text-amber-900',
    size: 16.25,
    shape: 'circle',
    animal: 'Aboriginal Elder',
    description: 'The small but valuable $2 coin shows an Aboriginal Elder and the Southern Cross.',
  },
];

export const formatMoney = (cents: number) => {
  if (cents < 100) return `${cents}c`;
  if (cents % 100 === 0) return `$${cents / 100}`;
  return `$${(cents / 100).toFixed(2)}`;
};
