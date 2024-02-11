import express from 'express';
import Contact from '../models/contactModel.js';

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        console.log('get contacts');
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log('new contact');

    // Construct the avatar URL with the random number
    const randomAvatarUrl = `https://media.gq-magazine.co.uk/photos/5d13a04bb744d364a425653b/master/pass/The-Big-Lebowski-hp-GQ-25Feb16_rex_b.jpg`;

    const contact = new Contact({
        first: "John",
        last: "Bumboclot",
        twitter: "@gento",
        avatar: randomAvatarUrl, // Use the random avatar URL
        notes: "notes",
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get a single contact by _id
router.get('/:id', async (req, res) => {
    try {
        console.log('get contact');
        const contact = await Contact.findById(req.params.id);
        
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a contact by _id
router.patch('/:id', async (req, res) => {
    console.log('update contact');
    try {
        // Using findByIdAndUpdate to directly update the document by its _id
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body);
         if (updatedContact) {
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a contact by _id
router.delete('/:id', async (req, res) => {
    try {
        console.log('delete contact');
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'Contact deleted' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
