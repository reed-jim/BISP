// const feedSample =  
// [
//     ['https://cdn.pixabay.com/photo/2021/10/15/22/59/heron-6713611__340.jpg',
//      'Adam Hughs', 'Monday, 17/11/2021', 'TEMPRATURE', '19°C'],
//     ['https://cdn.pixabay.com/photo/2021/11/12/18/13/greenfinch-6789772__340.jpg',
//     'Adam Hughs', 'Monday, 17/11/2021', 'TEMPRATURE', '9.5M'],
//     ['https://cdn.pixabay.com/photo/2021/11/03/12/28/forest-6765636__480.jpg',
//      'Adam Hughs', 'Monday, 17/11/2021', 'TEMPRATURE', '9.5M'],
//     ['https://cdn.pixabay.com/photo/2021/10/15/22/59/heron-6713611__340.jpg',
//     'Adam Hughs', 'Monday, 17/11/2021', 'TEMPRATURE', '9.5M']
// ]

const feedSample = {
    0: {_id: 0,
    title: "Emergency enviromental problem",
    content: ["Real Madrid won 13th C1 trophy on 21/6/2020", "We dump 2.12 billion tons of waste every year"
    , "Black hole reflects no light"],
    userId: 0}
}

const rankingItems = [
    ['https://cdn.pixabay.com/photo/2021/10/15/22/59/heron-6713611__340.jpg', 'Adam Hughs'],
    ['https://cdn.pixabay.com/photo/2021/11/12/18/13/greenfinch-6789772__340.jpg', 'Mark Levin']
]

const dogs =  ['Dogs are the most variable mammal on earth with around 450 globally recognized dog breeds.',
'All healthy dogs, regardless of their size and type',
'A dogs senses include vision, hearing, smell, taste, touch',
'Dog intelligence is the dogs ability to perceive information and retain it as knowledge for applying to solve problems'
]

const tags = ['react', 'html', 'css', 'python'];

const categories = ['Political', 'Economy', 'Sport', 'Health'];

const questionCollections = [
    ['How many dog', 0, 'Dog',
     'The dog or domestic dog, is a domesticated descendant of the wolf which is characterized by an upturning tail',
        16
    ],
    // ['How many cat', '1', 'Dog',
    //  'The dog or domestic dog, is a domesticated descendant of the wolf which is characterized by an upturning tail',
    //     16
    // ],
    // ['How many cat', '2', 'Dog',
    //  'The dog or domestic dog, is a domesticated descendant of the wolf which is characterized by an upturning tail',
    //     16
    // ]
]

export { feedSample, rankingItems, tags, dogs, questionCollections, categories }