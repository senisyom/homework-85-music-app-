import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from './models/Artist';
import Track from './models/Track';
import Album from './models/Album';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
    await db.dropCollection('users');

  } catch (e) {
    console.log('Skipping drop...');
  }

  await User.create({
    username: "User",
    password: "123",
    token: crypto.randomUUID(),
    role: "user"
  }, {
    username: "Admin",
    password: "321",
    token: crypto.randomUUID(),
    role: "admin"
  });

  const [scrip, eminem, miyagi] = await Artist.create({
        name: 'Scriptonit',
        isPublished: true,
  }, {
        name: 'Eminem',
        isPublished: true,
  },{
    name: 'Miyadi',
    isPublished: false,
});

  const [scrip1 , scrip2, eminem1, eminem2, miyagi1] = await Album.create({
    name: 'Дом с нормальными явлениями',
    artist: scrip,
    date: new Date(),
    isPublished: true,
  },{
    name: 'Скриптонит Уроборос: Улица 36',
    artist: scrip,
    date: new Date(),
    isPublished: true,
  },{
    name: 'The Death of Slim Shady (Coup de Grâce)',
    artist: eminem,
    date: new Date(),
    isPublished: true,
  },{
    name: 'The Marshall Mathers LP',
    artist: eminem,
    date: new Date(),
    isPublished: true,
  }, {
    name: 'Самая самая',
    artist: miyagi,
    date: new Date(),
    isPublished: false,
  });

  await Track.create({
    name: 'Мистер 718',
    duration: '3:12',
    trackNumber: 1,
    album: scrip1,
    isPublished: true,
  },{
    name: 'Caмая самая',
    duration: '3:12',
    trackNumber: 1,
    album: miyagi1,
    isPublished: false,
  },
  {
    name: 'Моя королева',
    duration: '3:12',
    trackNumber: 2,
    album: miyagi1,
    isPublished: false,
  },{
    name: 'Brooklin',
    duration: '3:12',
    trackNumber: 3,
    album: miyagi1,
    isPublished: false,
  },{
    name: 'Положение',
    duration: '3:32',
    trackNumber: 2,
    album: scrip1,
    isPublished: true,
  },{
    name: 'Танцуй сама',
    duration: '3:02',
    trackNumber: 3,
    album: scrip1,
    isPublished: true,
  },{
    name: 'Москва',
    duration: '4:12',
    trackNumber: 4,
    album: scrip1,
    isPublished: true,
  },{
    name: '3x3',
    duration: '2:54',
    trackNumber: 5,
    album: scrip1,
    isPublished: true,
  },{
    name: 'Мистер 718',
    duration: '3:12',
    trackNumber: 1,
    album: scrip2,
    isPublished: true,
  },{
    name: 'Положение',
    duration: '3:32',
    trackNumber: 2,
    album: scrip2,
    isPublished: true,
  },{
    name: 'Танцуй сама',
    duration: '3:02',
    trackNumber: 3,
    album: scrip2,
    isPublished: true,
  },{
    name: 'Москва',
    duration: '4:12',
    trackNumber: 4,
    album: scrip2,
    isPublished: true,
  },{
    name: '3x3',
    duration: '2:54',
    trackNumber: 5,
    album: scrip2,
    isPublished: true,
  },{
    name: 'Superman',
    duration: '3:12',
    trackNumber: 1,
    album: eminem1,
    isPublished: true,
  },{
    name: 'Without me',
    duration: '3:32',
    trackNumber: 2,
    album: eminem1,
    isPublished: true,
  },{
    name: 'Venom',
    duration: '3:02',
    trackNumber: 3,
    album: eminem1,
    isPublished: true,
  },{
    name: 'Yourself',
    duration: '4:12',
    trackNumber: 4,
    album: eminem1,
    isPublished: true,
  },{
    name: 'stan',
    duration: '5:54',
    trackNumber: 5,
    album: eminem1,
    isPublished: true,
  },{
    name: 'Superman',
    duration: '3:12',
    trackNumber: 1,
    album: eminem2,
    isPublished: true,
  },{
    name: 'Without me',
    duration: '3:32',
    trackNumber: 2,
    album: eminem2,
    isPublished: true,
  },{
    name: 'Venom',
    duration: '3:02',
    trackNumber: 3,
    album: eminem2,
    isPublished: true,
  },{
    name: 'Yourself',
    duration: '4:12',
    trackNumber: 4,
    album: eminem2,
    isPublished: true,
  },{
    name: 'stan',
    duration: '5:54',
    trackNumber: 5,
    album: eminem2,
    isPublished: true,
  },)


  await db.close();
};

run().catch(console.error);