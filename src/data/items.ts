export type ShopItem = {
  id: string;
  emoji: string;
  name: string;
  price: number; // in cents
};

export const shopItems: ShopItem[] = [
  { id: 'sticker', emoji: '🌟', name: 'Sticker', price: 10 },
  { id: 'candy', emoji: '🍬', name: 'Candy', price: 15 },
  { id: 'lollipop', emoji: '🍭', name: 'Lollipop', price: 25 },
  { id: 'apple', emoji: '🍎', name: 'Apple', price: 30 },
  { id: 'banana', emoji: '🍌', name: 'Banana', price: 35 },
  { id: 'cookie', emoji: '🍪', name: 'Cookie', price: 45 },
  { id: 'donut', emoji: '🍩', name: 'Donut', price: 55 },
  { id: 'juice', emoji: '🧃', name: 'Juice Box', price: 60 },
  { id: 'duck', emoji: '🐥', name: 'Rubber Duck', price: 75 },
  { id: 'icecream', emoji: '🍦', name: 'Ice Cream', price: 85 },
  { id: 'yoyo', emoji: '🪀', name: 'Yo-Yo', price: 90 },
  { id: 'crayons', emoji: '🖍️', name: 'Crayons', price: 110 },
  { id: 'balloon', emoji: '🎈', name: 'Balloon', price: 120 },
  { id: 'pencil', emoji: '✏️', name: 'Pencil', price: 150 },
  { id: 'bubbles', emoji: '🫧', name: 'Bubbles', price: 180 },
  { id: 'sunglasses', emoji: '🕶️', name: 'Sunglasses', price: 220 },
  { id: 'toycar', emoji: '🚗', name: 'Toy Car', price: 240 },
  { id: 'kite', emoji: '🪁', name: 'Kite', price: 280 },
  { id: 'wand', emoji: '🪄', name: 'Magic Wand', price: 310 },
  { id: 'teddy', emoji: '🧸', name: 'Teddy Bear', price: 350 },
  { id: 'puzzle', emoji: '🧩', name: 'Puzzle', price: 420 },
  { id: 'book', emoji: '📖', name: 'Story Book', price: 500 },
  { id: 'dino', emoji: '🦖', name: 'Dinosaur Toy', price: 650 },
  { id: 'robot', emoji: '🤖', name: 'Robot Toy', price: 720 },
  { id: 'soccer', emoji: '⚽', name: 'Soccer Ball', price: 800 },
  { id: 'basketball', emoji: '🏀', name: 'Basketball', price: 850 },
  { id: 'backpack', emoji: '🎒', name: 'Backpack', price: 900 },
  { id: 'train', emoji: '🚂', name: 'Toy Train', price: 950 },
  { id: 'blocks', emoji: '🧱', name: 'Building Blocks', price: 1000 },
  { id: 'paint', emoji: '🎨', name: 'Paint Set', price: 1200 },
];
