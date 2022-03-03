const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then(CatData => res.json(CatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then(CatData => {
    if (!CatData) {
      res.status(404).json({ message: 'Wrong id' });
      return;
    }
    res.json(CatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  // expects {category_name: 'Phones'}
  Category.create({
    category_name: req.body.category_name,
  })
  .then(CatData => res.json(CatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // expects {category_name: 'Phones'}
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(CatData => {
    if (!CatData[0]) {
      res.status(404).json({ message: 'Wrong id' });
      return;
    }
    res.json(CatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(CatData => {
    if (!CatData) {
      res.status(404).json({ message: 'Wrong id' });
      return;
    }
    res.json(CatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
