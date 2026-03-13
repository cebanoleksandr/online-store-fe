import { useState, type FC } from 'react';
import BasePopup from './BasePopup';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '../UI/Button';
import type { ICartItem } from '../../utils/interfaces';

interface IProps {
  isVisible: boolean;
  cartItem: ICartItem;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DeleteCartItemPopup: FC<IProps> = ({ isVisible, onClose, onDelete, cartItem }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteCartItem = async () => {
    setIsDeleting(true);
    try {
      await onDelete(cartItem.id);
    } catch (error) {} finally {
      setIsDeleting(false);
    }
  }

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col">
        <div className='flex justify-end'>
          <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={onClose}>
            <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
          </button>
        </div>

        <h2 className='text-center text-white text-2xl font-semibold mb-4'>
          Delete product
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">Are you sure you want to delete {cartItem?.product.title}?</p>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <Button onClick={onClose} mode="white">
            Cancel
          </Button>

          <Button onClick={onDeleteCartItem} mode="error">
            {isDeleting ? 'Deleting' : 'Confirm' }
          </Button>
        </div>
      </div>
    </BasePopup>
  );
};

export default DeleteCartItemPopup;
