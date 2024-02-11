import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    favorite: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// Define a virtual 'id' property
ContactSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are included in toJSON and toObject methods
ContactSchema.set('toJSON', { virtuals: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
