import React, {useEffect, useState} from 'react';
import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
import {Modal} from '../component/modal'
//import './App.css';
const CreateSig: React.FC = () => {
  const [Signature,SetSignature] = useState('');
  const [Result,SetResult] = useState('');
  const [isModalOpen,setModalState] = useState(false);
  const togel = () => setModalState(!isModalOpen);
  useEffect(() => {
    const init = async () => {
      SetSignature("Signature....");
    }
    init();
  },[]
  );
  const submitForm = async (e : any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringkey = String(data.get('key'))
    const dt = String(data.get('msg'))
    var encrypt = new JSEncrypt();
    encrypt.setPrivateKey(stringkey);
    let datadg = CryptoJS.SHA256(dt);
    let hexdg = datadg.toString(CryptoJS.enc.Hex)
    var signature = encrypt.sign(dt,()=>hexdg,'sha256')
    if(!signature){
    SetResult("Fail to create! です")
    setModalState(true);
    }else{
    SetSignature(String(signature));
    }
  }
    return (
        <div className="min-h-screen bg-cover	bg-opacity-20 flex flex-col justify-center bg-no-repeat w-full"
            style={
                {backgroundImage: `url("https://img.wallpapersafari.com/desktop/1920/1080/97/48/IS4Amw.jpg")`}
        }>
            <div className="text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden -mt-24 text-center">
                SIGNATURE CREATION
            </div>
            <form onSubmit={submitForm}>
            <div className="max-w-3xl w-full mx-auto mt-4 bg-black bg-opacity-50 p-8 border border-blue-300 rounded-lg -mt-50">
            <label className="text-sm front-bold text-white -mt-1 px-1"> Message </label>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="msg"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> Private Key </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={5}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="key"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> Signature </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={5}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" readOnly value={Signature}></textarea>
                </div>
                <div><button  className="bg-gray-600 w-full py-2 px-4 rounded-md text-white text-sm mt-7 shadow transition ease-in duration-700 hover:bg-red-700">Create</button></div>
            </div>
            </form>
            <Modal 
                isOpen={isModalOpen}
                onClose={togel}
                title={Result}
                >
                </Modal>
        </div>
    );
};
export default CreateSig;
