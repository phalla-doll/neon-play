export type Game = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: string;
  views: string;
  date: string;
  developer: string;
};

export const games: Game[] = [
  {
    id: 'love-tester',
    title: 'Love Tester',
    url: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    thumbnail: 'https://picsum.photos/seed/lovetester/600/400',
    category: 'Casual',
    views: '1.2M',
    date: '3 years ago',
    developer: 'OnlineGames',
  },
  {
    id: 'drift-king',
    title: 'Drift King',
    url: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    thumbnail: 'https://picsum.photos/seed/driftking/600/400',
    category: 'Racing',
    views: '850K',
    date: '1 year ago',
    developer: 'UnityGames',
  },
  {
    id: 'stack-fire-ball',
    title: 'Stack Fire Ball',
    url: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    thumbnail: 'https://picsum.photos/seed/stackfire/600/400',
    category: 'Arcade',
    views: '2.1M',
    date: '3 years ago',
    developer: 'UnityGames',
  },
  {
    id: 'highway-traffic',
    title: 'Highway Traffic',
    url: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    thumbnail: 'https://picsum.photos/seed/highway/600/400',
    category: 'Racing',
    views: '3.4M',
    date: '2 years ago',
    developer: 'UnityGames',
  },
  {
    id: 'neon-rider',
    title: 'Neon Rider',
    url: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    thumbnail: 'https://picsum.photos/seed/neonrider/600/400',
    category: 'Action',
    views: '500K',
    date: '6 months ago',
    developer: 'NeonStudios',
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders 3D',
    url: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    thumbnail: 'https://picsum.photos/seed/spaceinvaders/600/400',
    category: 'Arcade',
    views: '4.2M',
    date: '4 years ago',
    developer: 'RetroGames',
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    url: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    thumbnail: 'https://picsum.photos/seed/motox3m/600/400',
    category: 'Sports',
    views: '8.9M',
    date: '5 years ago',
    developer: 'MadPuffers',
  },
  {
    id: 'subway-surfers',
    title: 'Subway Runner',
    url: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    thumbnail: 'https://picsum.photos/seed/subway/600/400',
    category: 'Action',
    views: '12M',
    date: '2 years ago',
    developer: 'Kiloo',
  }
];
