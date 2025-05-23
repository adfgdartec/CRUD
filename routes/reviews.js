const express = require('express');
const  router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const {reviewCreate, reviewUpdate, reviewDelete

} = require('../controllers/reviews')
    /* review reviews create /reviews */
router.post('/', asyncErrorHandler(reviewCreate));


 
   
    /* PUT  reviews update /posts/:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

  
  /* DELETE reviews destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDelete));
 
    module.exports = router;