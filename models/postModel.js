const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
}
)
const post = model('Post', postSchema);
module.exports = post;