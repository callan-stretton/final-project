exports.seed = function (knex, Promise) {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([
        {id: 1, vid_url: 'VQNoPqLuZ74', quote: 'you have a breathtaking hiney', startTime: 0, quoteStart: 25, quoteEnd: 33, pauseTime: 20},
        {id: 2, vid_url: 'VWb1z6ZwUoY', quote: 'we came we saw we kicked its ass', startTime: 42, quoteStart: 73, quoteEnd: 81, pauseTime: 20},
        {id: 3, vid_url: 'Coemj2qdWMw', quote: 'happy people just dont shoot their husbands', startTime: 63, quoteStart: 76, quoteEnd: 97, pauseTime: 20},
        {id: 4, vid_url: 'pEOVNmSR7_c', quote: 'yippee ki yay motherfucker', startTime: 81, quoteStart: 107, quoteEnd: 112, pauseTime: 20},
        {id: 5, vid_url: '1YGfrGKK9Mo', quote: 'Im flying jack', startTime: 24, quoteStart: 39, quoteEnd: 43, pauseTime: 20},
        {id: 6, vid_url: 'TU7CDejp6Lw', quote: 'get to the chopper', startTime: 99, quoteStart: 129, quoteEnd: 132, pauseTime: 20}
      ])
    })
}

