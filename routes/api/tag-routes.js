const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({

    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404)
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },

    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ Alert: "Error 404: ID not found." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    // pass the id parameter to update the appropriate tag
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ Alert: "Error 404: ID not found." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ Alert: "Error 404: ID not found." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
