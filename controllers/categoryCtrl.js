const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createCategory: async (req, res) => {
    try {
      //si el usuario tiene rol = 1 ----> administrador
      // solo adimin puede crear, eliminar y actualizar una categoría
      const { name } = req.body
      const category = await Category.findOne({ name })
      if (category)
        return res.status(400).json({ msg: 'Esta categoría ya existe' })

      const newCategory = new Category({ name })

      await newCategory.save()
      res.json({ msg: 'Creó una categoría' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id })
      if (products)
        return res
          .status(400)
          .json({ msg: 'Elimine todos los productos con una relación.' })

      await Category.findByIdAndDelete(req.params.id)
      res.json({ msg: 'Categoria eliminada' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body
      await Category.findOneAndUpdate({ _id: req.params.id }, { name })

      res.json({ msg: 'Categoria atualizada' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

module.exports = categoryCtrl
