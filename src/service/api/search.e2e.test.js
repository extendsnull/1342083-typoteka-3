'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const {SearchService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);

const mockData = [
  {
    id: `-CGBmE`,
    title: `Как достигнуть успеха не вставая с кресла`,
    createdDate: `2021-08-06 17:02:02`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Ёлки — это не просто красивое дерево. Это прочная древесина. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят.`,
    category: [
      `Разное`
    ],
    comments: [
      {
        id: `jPssVg`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `Do3Ux6`,
        text: `Согласен с автором!`
      },
      {
        id: `5MukJV`,
        text: `Совсем немного...`
      }
    ]
  },
  {
    id: `l6ZLmi`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-09-30 05:50:44`,
    announce: `Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Достичь успеха помогут ежедневные повторения. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    category: [
      `Без рамки`,
      `Деревья`
    ],
    comments: []
  },
  {
    id: `2rqF9t`,
    title: `Как начать программировать`,
    createdDate: `2021-09-28 21:15:37`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Программировать не настолько сложно, как об этом говорят. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь.`,
    category: [
      `Кино`,
      `Музыка`
    ],
    comments: [
      {
        id: `v8ZeXr`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `goIe81`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `JJLW4q`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `K4IlgL`,
        text: `Совсем немного...`
      },
      {
        id: `zJQoRS`,
        text: `Согласен с автором!`
      }
    ]
  },
  {
    id: `N7HKNi`,
    title: `Лучшие рок-музыканты 20-века`,
    createdDate: `2021-08-10 06:29:08`,
    announce: `Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    category: [
      `Разное`,
      `Железо`,
      `Кино`
    ],
    comments: [
      {
        id: `xr9bsN`,
        text: `Это где ж такие красоты?`
      },
      {
        id: `yJrdKA`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `Y6J2l5`,
        text: `Совсем немного...`
      },
      {
        id: `wwMctD`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `6DzvsH`,
        text: `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    id: `IJX47a`,
    title: `Учим HTML и CSS`,
    createdDate: `2021-08-10 15:35:50`,
    announce: `Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов.`,
    category: [
      `Без рамки`,
      `Музыка`,
      `IT`
    ],
    comments: [
      {
        id: `zsUkG1`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `deD_4v`,
        text: `Согласен с автором!`
      },
      {
        id: `CXlews`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        id: `gGKpUz`,
        text: `Планируете записать видосик на эту тему?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API возвращает результаты поиска`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: mockData[0].title,
    });
  });

  test(`Ответ сервера равен 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает массив с одной публикацией`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  test(`Заголовок найденной публикации равен ${mockData[0].title}`, () => {
    expect(response.body[0].title).toBe(mockData[0].title);
  });

  test(`Id найденной публикации равен ${mockData[0].id}`, () => {
    expect(response.body[0].id).toBe(mockData[0].id);
  });
});

describe(`API возвращает результаты поиска, ничего не нашлось`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `To be or not to be`,
    });
  });

  test(`Ответ сервера равен 404`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
  });

  test(`Возвращает пустой массив`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });
});

describe(`API возвращает результаты поиска на невалидный запрос`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: null,
    });
  });

  test(`Ответ сервера равен 400`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Возвращает пустой массив`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });
});
