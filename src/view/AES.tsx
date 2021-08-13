import React, {useEffect, useState} from 'react';
import CryptoJS from 'crypto-js'
import { RadioBT } from '../component/button';
import { Modal } from '../component/modal';
const AES: React.FC = () => {
  const [CalculatedResult,setCalculatedResult] = useState('');
  const [FirstBox,SetFirstBox] = useState('');
  const [SecondBox,SetSecondBox] = useState('')
  const [ThirdBox,SetThirdBox] = useState('')
  const [Result,SetResult] = useState('');
  const [isModalOpen,setModalState] = useState(false);
  const togel = () => setModalState(!isModalOpen);
  useEffect(() => {
    const init = async () => {
      setCalculatedResult("Cipher....");
      SetFirstBox("TEXT");
      SetSecondBox("SECRET KEY(BYTE)");
    }
    init();
  },[]
  );
  const response = (e:any) => {
    if(e.target.value === "1"){
        setCalculatedResult("Cipher....");
        SetFirstBox("PLAIN TEXT");
        SetSecondBox("SECRET KEY(BYTE)");
        SetThirdBox("CIPHER TEXT");
    }else{
        setCalculatedResult("Plain Text....");
        SetFirstBox("CIPHER TEXT");
        SetSecondBox("SECRET KEY(BYTE)");
        SetThirdBox("PLAIN TEXT");
    }
}
function aesDecrypt(cipher:string,key:string,iv:string){
    var bkey = CryptoJS.enc.Hex.parse(key);
    var ciphertext = CryptoJS.enc.Base64.parse(cipher.toString());
    var encryptedCP = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertext,
      formatter: CryptoJS.format.OpenSSL 
    })
    var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, bkey, { iv: CryptoJS.enc.Hex.parse(iv) })
    var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8)
    
    console.log(decryptedUtf8) // this should be 496271 but I keep getting blank
    return(decryptedUtf8);
}
  function aesEncrypt (data:string,key:string,iv:string) {
    var bkey = CryptoJS.enc.Hex.parse(key);
    const cipher = CryptoJS.AES.encrypt(data, bkey, {
        iv: CryptoJS.enc.Hex.parse(iv), // parse the IV 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })
    // e.g. B6AeMHPHkEe7/KHsZ6TW/Q==
    return cipher.toString()
 }
  const submitForm = async (e : any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringkey = String(data.get('key'));
    const dt = String(data.get('msg'));
    const iv = String(data.get('iv'));
    const btn = String(data.get('radio-1'))
    if(btn==="1"){
    const ciphertext = aesEncrypt(dt,stringkey,iv);
    setCalculatedResult(ciphertext)
    }else{
        const plaintext = aesDecrypt(dt,stringkey,iv);
        console.log(plaintext);
        if(plaintext===""){
        SetResult("Decrypt Failed")
        setModalState(true);
        }else{
        setCalculatedResult(plaintext)
        }
    }
  }
    return (
        <div className="min-h-screen bg-cover bg-opacity-20 flex flex-col justify-center bg-no-repeat w-full"
            style={
                {backgroundImage: `url("https://img.wallpapersafari.com/desktop/1920/1080/97/48/IS4Amw.jpg")`}
        }>
            <div className="text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden -mt-24 text-center">
                AES-256
            </div>
            <form onSubmit={submitForm}>
            <div className="max-w-3xl w-full mx-auto mt-4 bg-black bg-opacity-50 p-8 border border-blue-300 rounded-lg -mt-50">
            <label className="text-sm front-bold text-white -mt-1 px-1 w-1/6"> {FirstBox} <span>  <RadioBT onClickBtn={response}></RadioBT></span></label>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={3}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="msg"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> {SecondBox} </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="key"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> IV (BYTE) </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="iv"></textarea>
                </div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> {ThirdBox} </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={3}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" readOnly value={CalculatedResult}></textarea>
                </div>
                <div><button  className="bg-gray-600 w-full py-2 px-4 rounded-md text-white text-sm mt-7 shadow transition ease-in duration-700 hover:bg-red-700">Excute</button></div>
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
export default AES;
