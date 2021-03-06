exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('videos', (table) => {
    table.increments('id').primary()
    table.string('vid_url')
    table.string('quote')
    table.integer('startTime')
    table.integer('quoteStart')
    table.integer('quoteEnd')
    table.string('title')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('videos')
}
