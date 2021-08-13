import React from 'react'
import './modal.css'
//import xicon from './x.svg'
//const override = `
//  display: block;
//  margin: 0 auto;
//  border-color: green;
//`;
interface ModalProps {
    title:string;
    isOpen:boolean;
    onClose: (e:any) => void;
    onSumitted: (e:any) => void;
}
export const ModalInput: React.FC<ModalProps> = ({title,isOpen,onClose,onSumitted,children}) => isOpen ? (
    <div className={'modal'}>
      <div
        className={'modal__overlay'}
      />
      <div className={`${title==="CORRECT" ? 'modal__bg__color__green':'modal__bg__color__red'} modal__box`}>
        <form onSubmit={onSumitted}>
        <div className={`${title==="CORRECT" ? 'modal__title__color__green':'modal__title__color__red'} modal__title mt-5 text-center`}>
          {title}
        </div>
        <div>
        <input type="password" name="passphase" placeholder="PASSPHASE" autoComplete="off" autoCorrect="off"  className="text-2xl w-5/6 bg-gray-900 text-center px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500"
         />
        </div>
        <button className="mt-10 w-1/2 bg-gray-600 hover:bg-gray-200">DECRYPT</button>
        </form>
      </div>
    </div>
):null;