export type Game = {
  id: string;
  title: string;
  embed: string;
  url: string;
  image: string;
  thumbnail: string;
  tags: string;
  description: string;
  category: string;
  views: number;
  date: string;
  developer: string;
};

export const games: Game[] = [
  {
    id: 'love-tester',
    title: 'Love Tester',
    embed: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    url: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    image: 'https://www.onlinegames.io/media/posts/152/responsive/love-tester-xs.jpg',
    thumbnail: 'https://www.onlinegames.io/media/posts/152/responsive/love-tester-xs.jpg',
    tags: '1-player,2d,free,fun,funny,girl,html5,kids,love,mobile',
    description: 'Do you want to know how much your crush falls for you?...',
    category: 'Casual',
    views: 1250000,
    date: '2023-05-14T08:32:47',
    developer: 'Pixel Studios',
  },
  {
    id: 'drift-king',
    title: 'Drift King',
    embed: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    url: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    image: 'https://picsum.photos/seed/driftking/600/400',
    thumbnail: 'https://picsum.photos/seed/driftking/600/400',
    tags: 'racing,cars,3d,drift',
    description: 'Drift your way to the top in this exciting 3D racing game.',
    category: 'Racing',
    views: 850000,
    date: '2024-01-10T14:20:00',
    developer: 'UnityGames',
  },
  {
    id: 'stack-fire-ball',
    title: 'Stack Fire Ball',
    embed: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    url: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    image: 'https://picsum.photos/seed/stackfire/600/400',
    thumbnail: 'https://picsum.photos/seed/stackfire/600/400',
    tags: 'arcade,3d,casual',
    description: 'Smash through platforms and reach the bottom!',
    category: 'Arcade',
    views: 2100000,
    date: '2022-11-05T09:15:00',
    developer: 'UnityGames',
  },
  {
    id: 'highway-traffic',
    title: 'Highway Traffic',
    embed: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    url: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    image: 'https://picsum.photos/seed/highway/600/400',
    thumbnail: 'https://picsum.photos/seed/highway/600/400',
    tags: 'racing,cars,traffic,3d',
    description: 'Dodge traffic and drive as fast as you can.',
    category: 'Racing',
    views: 3400000,
    date: '2023-08-22T16:45:00',
    developer: 'UnityGames',
  },
  {
    id: 'neon-rider',
    title: 'Neon Rider',
    embed: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    url: 'https://www.onlinegames.io/games/2024/unity/drift-king/index.html',
    image: 'https://picsum.photos/seed/neonrider/600/400',
    thumbnail: 'https://picsum.photos/seed/neonrider/600/400',
    tags: 'action,neon,bike',
    description: 'Ride your neon bike through futuristic tracks.',
    category: 'Action',
    views: 500000,
    date: '2024-02-15T11:30:00',
    developer: 'NeonStudios',
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders 3D',
    embed: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    url: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    image: 'https://picsum.photos/seed/spaceinvaders/600/400',
    thumbnail: 'https://picsum.photos/seed/spaceinvaders/600/400',
    tags: 'arcade,space,shooter,3d',
    description: 'Defend Earth from alien invaders in 3D!',
    category: 'Arcade',
    views: 4200000,
    date: '2021-09-10T10:00:00',
    developer: 'RetroGames',
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    embed: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    url: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    image: 'https://picsum.photos/seed/motox3m/600/400',
    thumbnail: 'https://picsum.photos/seed/motox3m/600/400',
    tags: 'sports,bike,stunts',
    description: 'Perform crazy stunts on your dirt bike.',
    category: 'Sports',
    views: 8900000,
    date: '2020-05-20T14:00:00',
    developer: 'MadPuffers',
  },
  {
    id: 'subway-surfers',
    title: 'Subway Runner',
    embed: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    url: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    image: 'https://picsum.photos/seed/subway/600/400',
    thumbnail: 'https://picsum.photos/seed/subway/600/400',
    tags: 'action,runner,3d',
    description: 'Run as fast as you can and dodge the trains!',
    category: 'Action',
    views: 12000000,
    date: '2022-01-12T08:00:00',
    developer: 'Kiloo',
  }
];
