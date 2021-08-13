import React, {useEffect, useState} from 'react';
import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
import {Modal} from '../component/modal'
//import './App.css';
const VerifySig: React.FC = () => {
  const [Result,SetResult] = useState('');
  const [isModalOpen,setModalState] = useState(false);
  const togel = () => setModalState(!isModalOpen);
  useEffect(() => {
    const init = async () => {
      SetResult("");
    }
    init();
  },[]
  );

  const submitForm = async (e : any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringkey = String(data.get('key'))
    const dt = String(data.get('msg'))
    const signaturestr = String(data.get('signature'))
    var sig = new JSEncrypt();
    sig.setPublicKey(stringkey);
    let datadg = CryptoJS.SHA256(dt);
    let hexdg = datadg.toString(CryptoJS.enc.Hex)
    let result = sig.verify(dt,signaturestr,()=>hexdg)

    console.log(result);
    if(result){
        SetResult("CORRECT");
    }else{
        SetResult("Verify Failed");
    }
    console.log(isModalOpen);
    togel();
  }
    return (
        <div className="min-h-screen bg-cover bg-opacity-20 flex flex-col justify-center bg-no-repeat w-full"
            style={
                {backgroundImage: `url("https://img.wallpapersafari.com/desktop/1920/1080/97/48/IS4Amw.jpg")`}
        }>
            <div className="text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden -mt-24 text-center">
                SIGNATURE VERIFICATION
            </div>
            <form onSubmit={submitForm}>
            <div className="max-w-3xl w-full mx-auto mt-4 bg-black bg-opacity-50 p-8 border border-blue-300 rounded-lg -mt-50">
            <label className="text-sm front-bold text-white -mt-1 px-1"> Message </label>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="msg"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> Public Key </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={5}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="key"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> Signature </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={5}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="signature"></textarea>
                </div>
                <div><button className="modal-open bg-gray-600 w-full py-2 px-4 rounded-md text-white text-sm mt-7 shadow transition ease-in hover:bg-red-700">Verify</button>
                </div>
                
            
            </div>
            </form>
            <div className="text-xl front-bold text-green-400 text-center">   
             <Modal 
                isOpen={isModalOpen}
                onClose={togel}
                title={Result}
                >
                </Modal></div>
        
        </div>
        
    );
};
export default VerifySig;
