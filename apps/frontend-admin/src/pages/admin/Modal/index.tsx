import ModalCategory from './Category';
import ModalProduct from './Product';
import ModalRole from './Role';
import ModalSlider from './Slider';
import ModalUser from './User';

export default function Modal() {
  return (
    <>
      <ModalUser />
      <ModalCategory />
      <ModalProduct />
      <ModalRole />
      <ModalSlider />
    </>
  );
}
