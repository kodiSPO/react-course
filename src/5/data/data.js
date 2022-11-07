import {faker} from '@faker-js/faker';

export const HASHTAGS = [
    {
        id: faker.datatype.uuid(),
        label: 'General',
    },
    {
        id: faker.datatype.uuid(),
        label: 'Crypto',
    },
    {
        id: faker.datatype.uuid(),
        label: 'Technologies',
    },
    {
        id: faker.datatype.uuid(),
        label: 'Business',
    },
];

export const AUTHORS = Array(4).fill('').map(() => {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomHashtags(count) {
    const hashtags = [];
    let times = getRandomInt(count) + 1;

    function getIndex() {
        const index = getRandomInt(HASHTAGS.length);

        if (hashtags.includes(HASHTAGS[index].id)) {
            return getIndex();
        }

        return index;
    }

    while (times) {
        hashtags.push(HASHTAGS[getIndex()].id);
        times--;
    }

    return hashtags;
}

export function generateNewsItem() {
    return {
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentence(5),
        text: faker.lorem.sentences(3),
        image: faker.image.cats(300, 300) + '?v=' + Date.now(),
        hashtags: getRandomHashtags(3),
        author: AUTHORS[getRandomInt(AUTHORS.length - 1)].id,
    };
}

export function generateNews(count) {
    return Array(count).fill('').map(() => generateNewsItem());
}