import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    youtubeUrl : {
        type : String,
        required : [true, 'YouTube URL is required'],
        trim : true
    },
    postTitle : {
        type : String,
        required : [true, 'Post title is required'],
        trim : true
    },
    consensus : {
        type : String,
        required : true
    },
    topPraise: {
      type: String,
      required: true,
    },
    topComplaint: {
      type: String,
      required: true,
    },
    contrarian : {
        type : String,
        required : true
    },
    verdict : {
        type : String,
        required : true
    },
    commentCount : {
        type : Number,
        default : 0
    }
},
{
    timestamps : true
})

const Analysis = mongoose.model('Analysis', analysisSchema)

export default Analysis 