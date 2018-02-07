exports.seed = function (knex, Promise) {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([
        { id: 1, vid_url: 'gId6nrMDmUU', quote: 'I love lamp', startTime: 0, quoteStart: 14, quoteEnd: 16, title: 'Anchorman' },
        { id: 2, vid_url: 'VWb1z6ZwUoY', quote: 'We came we saw we kicked it\'s ass', startTime: 43, quoteStart: 76, quoteEnd: 79, title: 'Ghostbusters' },
        { id: 3, vid_url: '9FnO3igOkOk', quote: 'you can\'t handle the truth', startTime: 33, quoteStart: 44, quoteEnd: 47, title: 'A Few Good Men' },
        { id: 4, vid_url: 'luBk4VrMHNI', quote: 'become a pop star and they give you them for free', startTime: 12, quoteStart: 22, quoteEnd: 25, title: 'Love Actually' },
        { id: 5, vid_url: '1YGfrGKK9Mo', quote: 'I\'m flying Jack', startTime: 25, quoteStart: 40, quoteEnd: 43, title: 'Titanic' },
        { id: 6, vid_url: 'TU7CDejp6Lw', quote: 'Get to the chopper', startTime: 109, quoteStart: 130, quoteEnd: 132, title: 'Predator' },
        { id: 7, vid_url: 'pxPGzj2L3n0', quote: 'And my axe', startTime: 0, quoteStart: 9, quoteEnd: 12, title: 'The Lord of The Rings' },
        { id: 8, vid_url: 'h6sj89xgnl4', quote: 'No I am your father', startTime: 92, quoteStart: 102, quoteEnd: 106, title: 'Starwars: the Empire Strikes Back' },
        { id: 9, vid_url: 'vUN7yu7zvz8', quote: 'you\'re a wizard harry', startTime: 16, quoteStart: 21, quoteEnd: 24, title: 'Harry Potter and the Scorcerer\'s Stone' },
        { id: 10, vid_url: 'EemLsTG5fX8', quote: 'I wrote to you everyday for a year', startTime: 91, quoteStart: 102, quoteEnd: 104, title: 'The Notebook' },
        { id: 11, vid_url: 'NVPLqbWXdDA', quote: 'leeloo dallas multipass', startTime: 51, quoteStart: 59, quoteEnd: 62, title: 'The 5th Element' },
        { id: 12, vid_url: 'RKysEIVJfBs', quote: 'the names bond james bond', startTime: 67, quoteStart: 81, quoteEnd: 85, title: 'Casino Royale' },
        { id: 13, vid_url: 'AyrP-pwDayE', quote: 'you had me at hello', startTime: 79, quoteStart: 90, quoteEnd: 93, title: 'Jerry Maguire' },
        { id: 14, vid_url: 'vL-KQij0I8I', quote: 'from a pile of stuff', startTime: 97, quoteStart: 108, quoteEnd: 111, title: 'The Devil Wears Prada' },
        { id: 15, vid_url: 'oKxsW8DKJQQ', quote: 'you\'re going to need a bigger boat', startTime: 57, quoteStart: 75, quoteEnd: 78, title: 'Jaws' }
      ])
    })
}
