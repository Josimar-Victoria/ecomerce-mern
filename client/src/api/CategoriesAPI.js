import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CategoriesAPI () {
  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category')
      setCategories(res.data)
    }
    console.log(categories)
    getCategories()
  }, [callback])
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback]
  }
}
