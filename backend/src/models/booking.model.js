import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    startTime: Date,
    endTime: Date 
},{
    timestamps:true
})

const bookingModel = mongoose.model("Booking", bookingSchema)

export default bookingModel