const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all categories

  try {
    // find all tags
    const tagData = await Tag.findAll({
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        through: ProductTag
      }]
  })
  if (!tagData) {
    res.json({"message": "There's no category data!!"})
  }
  res.json(tagData)
} catch (error) {
  console.log(error)
}
})


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
