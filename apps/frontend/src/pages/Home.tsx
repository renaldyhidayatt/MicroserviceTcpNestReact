import { useEffect } from 'react';
import Slider from '../components/Slider';
import { fetchAllSliders } from '../redux/slider';
import Category from '../components/Category';
import { fetchAllCategories } from '../redux/category';
import Product from '../components/Product';
import { fetchProducts } from '../redux/product';
import { LoadingIndicator } from '../components/Loading';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { IsError } from '../components/IsError';

export default function Home() {
  const myslider = useAppSelector((state) => state.slider);
  const mycategory = useAppSelector((state) => state.category);
  const myproduct = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const { loading: loadingProduct, error: errorProduct, products } = myproduct;

  const { loading: loadingCat, error: errorCat, categories } = mycategory;

  const { loading, sliders, error } = myslider;

  const isLoading = loading || loadingProduct || loadingCat;
  const isError = error || errorProduct || errorCat;

  useEffect(() => {
    dispatch(fetchAllSliders());
    dispatch(fetchAllCategories());
    dispatch(fetchProducts());

    console.log(categories);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <IsError error={isError} />
      ) : (
        <>
          <Slider sliders={sliders} />
          <Category categories={categories} />
          <Product products={products} />
        </>
      )}
    </>
  );
}
