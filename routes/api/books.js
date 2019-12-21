const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Book = require('../../models/Book');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/books
// @desc    Create a book
// @access  Private
router.post(
  '/',
  [
    
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');

      const newBook = new Book({
        text: req.body.text,
        title:req.body.title,
        avatar: req.body.avatar
      });

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/books
// @desc    Get all books
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find().sort({ date: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/books/:id
// @desc    Get book by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({ msg: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectID') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    //Check user
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await book.remove();

    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectID') {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/books/like/:id
// @desc    Like a book
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    //Check if the book has been already liked
    if (
      book.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Book already liked' });
    }
    book.likes.unshift({ user: req.user.id });

    await book.save();

    res.json(book.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/books/unlike/:id
// @desc    Unlike a book
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    //Check if the book has been already liked
    if (
      book.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Book has not yet been liked' });
    }
    // Get remove index
    const removeIndex = book.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    book.likes.splice(removeIndex, 1);

    await book.save();

    res.json(book.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/books/discussions/:id
// @desc    Discuss a book
// @access  Private
router.post(
  '/discuss/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const book = await Book.findById(req.params.id);
      const newDiscuss = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      book.discussions.unshift(newDiscuss);

      await book.save();

      res.json(book.discussions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/books/discussions/:id/:dicussion_id
// @desc    Delete a discussion from a book
// @access  Private
router.delete('/discuss/:id/:discussion_id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    //Pull out discussions
    const discussion = book.discussions.find(
      discussion => discussion.id === req.params.discussion_id
    );

    //Make sure discussion exixts
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion does not exist' });
    }

    // Check user
    if (discussion.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User noot authorized' });
    }

    // Get remove index
    const removeIndex = book.discussions
      .map(discussion => discussion.user.toString())
      .indexOf(req.user.id);

    book.discussions.splice(removeIndex, 1);

    await book.save();

    res.json(book.discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/books/some
// @desc    Get some books
// @access  Public
// router.get('/some',auth, async (req, res) => {
//   try {
//     i=1;
//     while(i<3){
//     const book = await Book.find().sort({ date: -1 });
//     res.json(book);
//   i++;}
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// updating a book's info
// @route   POST api/books/update/:id
// @desc    Update a book
// @access  Public
// router.post(
//   '/update/:id',
  
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Build book object
//     const bookFields = {};
//     bookFields.book = req.book.id;
//     if (title) bookFields.title = title;
//     if (text) bookFields.text = text;
//     if (avatar) bookFields.avatar = avatar;


//     try {
//       let book = await Book.findById({ book: req.params.id });

//       if (book) {
//         //update
//         book = await Book.findOneAndUpdate(
//           { book: req.params.id },
//           { $set: bookFields },
//           { new: true }
//         );

//         await book.save();
//         return res.json(book);
//       }

//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

module.exports = router;
