const Donate = require('../models/donationModel')
const Books = require('../models/bookModel')

function toTitleCase(str) {
    str=str.trim()
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  }

const getAllDonations = async (req, res) => {

    await Donate.find({}).sort({createdAt:-1})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({error: "Fetching donations failed"})
        })
}

const createDonation = async (req, res) => {

    const {title, author, totalCopies, doner} = req.body
    
    const book = await Books.create({title: toTitleCase(title), author, nAvailable:totalCopies, totalCopies})
    if(!book) res.status(400).json({error: "Book creation failed"})
    else {
        const book_id = book._id

        await Donate.create({book_id, title, doner})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(400).json({error: "Donation record creation failed"}))
    }   
}

const deleteDonation = async (req, res) => {

    const donation_id = req.params.id

    await Donate.findOneAndDelete({_id: donation_id})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json({error: "Deleting donation failed"}))
}

const updateDonation = async (req, res) => {
    const donation_id = req.params.id
    const doner = req.body.doner

    await Donate.findOneAndUpdate({_id: donation_id}, {doner})
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json({error: "Updating donation failed"}))
}

module.exports = {
    getAllDonations,
    createDonation,
    deleteDonation,
    updateDonation
}