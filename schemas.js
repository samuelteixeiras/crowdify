var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

var organizerSchema = new Schema({
    username:  String,
    accessToken: String,
    refreshToken: String,
    dateAdded: {type: Date, default: Date.now}
});

var eventSchema = new Schema({
    name: { type: String, slug: "title", slug_padding_size: 3, unique_slug: true},
    title: String,
    organizer: {type: ObjectId, ref: 'Organizer'},
    songNames: {type: ObjectId, ref: 'Songs'},
    songNames: [[String]],
    playlistId: String
});

var userSchema = new Schema({
    username:  String,
    accessToken: String,
    refreshToken: String,
    hostedEvents: [eventSchema],
    attendingEvents: [eventSchema],
    dateAdded: {type: Date, default: Date.now}
});

var songsSchema = new Schema({
    songNames: [String]
});

var Songs = mongoose.model('Song', songsSchema);
var Organizer = mongoose.model('Organizer', organizerSchema);
var User = mongoose.model('User', userSchema);
var Event = mongoose.model('Event', eventSchema);
var schemas = {"Organizer":Organizer, "Event":Event, "Songs":Songs, "User": User};


module.exports = schemas;
