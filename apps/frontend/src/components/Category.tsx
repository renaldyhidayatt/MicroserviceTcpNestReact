import { Link } from 'react-router-dom';
import { Category as CategoryType } from '../interface';

interface CategoryProps {
  categories: CategoryType[];
}

export default function CategoryComponent({ categories }: any) {
  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <div className="mt-10">
        <h1 className="text-2xl font-semibold p-3 ">Category</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {categories.length > 0 ? (
          categories.map((category: any) => (
            <Link
              key={category.category_id}
              to={'/category/' + category.slug_category}
              className="p-2 border rounded-lg shadow"
            >
              <div className="flex items-center justify-center h-24">
                <img
                  src={category.image_category}
                  alt={category.nama_kategori}
                  className="h-16"
                />
              </div>
              <div className="mt-2 text-center">
                <h4 className="text-lg font-semibold">
                  {category.nama_kategori}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
}
