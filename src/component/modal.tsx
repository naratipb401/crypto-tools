import React from 'react'
import './modal.css'
import xicon from './x.svg'
interface ModalProps {
    title:string;
    isOpen:boolean;
    onClose: () => void;
}
export const Modal: React.FC<ModalProps> = ({title,isOpen,onClose,children}) => isOpen ? (
    <div className={'modal'}>
      <div
        className={'modal__overlay'}
      />
      <div className={`${title==="CORRECT" ? 'modal__bg__color__green':'modal__bg__color__red'} modal__box`}>
        <button
          className={'modal__close'}
          onClick={onClose}
        >
            <img src={xicon} alt="X for closing the modal"/>
        </button>
        <div className={`${title==="CORRECT" ? 'modal__title__color__green':'modal__title__color__red'} modal__title text-center`}>
          {title}
        </div>
 
      </div>
    </div>
):null;