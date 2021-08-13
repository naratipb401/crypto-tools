import React, {useEffect, useState} from 'react';
//import CryptoJS from 'crypto-js'
import { RadioBT } from '../component/buttonweb3';
import { Modal } from '../component/modal';
import { ModalInput } from '../component/inputmodal';
import web3 from './web3';
import { UploadFile } from '../component/uploadbox';
import { FILE } from 'dns';

const ETH: React.FC = () => {
  const [CalculatedResult,setCalculatedResult] = useState('');
  const [HideDiv,SetHideDiv] = useState(false);
  const [FirstBox,SetFirstBox] = useState('');
  const [SecondBox,SetSecondBox] = useState('')
  const [ThirdBox,SetThirdBox] = useState('')
  const [Result,SetResult] = useState('');
  const [isModalOpen,setModalState] = useState(false);
  const [isErrorModalOpen,SetErrorModalOpen] = useState(false);
  const [fileContent,setfileContent] = useState(FILE);
  const [fileHash,setfileHash] = useState('');
  const [addr,Setaddr] = useState('');
  const [text,Settext] = useState('');
  const togel = () => setModalState(!isModalOpen);
  const togele = () => SetErrorModalOpen(!isErrorModalOpen);
  useEffect(() => {
    const init = async () => {
      setCalculatedResult("");
      SetFirstBox("ENTROPY");
      SetSecondBox("PRIVATE KEY(HEX)");
      SetThirdBox("ADDRESS");
      Settext("ATTACH JSON FILE");
      SetResult('');
    }
    init();
  },[]
);
  const response = (e:any) => {
    if(e.target.value === "1"){
        setCalculatedResult("");
        SetFirstBox("ENTROPY");
        SetSecondBox("PRIVATE KEY(HEX)");
        SetThirdBox("ADDRESS");
        SetHideDiv(false);
        Setaddr('');
    }else{
        setCalculatedResult("");
        SetFirstBox("CIPHER TEXT");
        SetSecondBox("PRIVATE KEY(HEX)");
        SetThirdBox("ADDRESS");
        Settext("ATTACH JSON FILE");
        SetHideDiv(true)
        Setaddr('');
    }
}

const onSubmitform =  (e:any)=> {
    SetResult("Input Passphase");
    const data = new FormData(e.target);
    const btn = String(data.get('passphase'));
    console.log(btn);
    try{
    const finalresult =  web3.eth.accounts.decrypt(JSON.parse(fileContent),btn)
    setCalculatedResult(finalresult.privateKey)
    //console.log(CryptoJS.SHA256("k").toString(CryptoJS.enc.Hex));
    console.log(finalresult);
    setfileHash(JSON.parse(fileContent).crypto.ciphertext)
    Setaddr(finalresult.address);
    setModalState(false);
    }catch{
    setModalState(false);
    SetResult("ERROR")
    SetErrorModalOpen(true);
    }
  }
function upload(e:any){
    SetResult("");
    let status = []
    const fileObj = e.target.files[0];
    const reader = new FileReader(); 
    try{
    let fileloaded = (r:any) => {
    const fileContents = r.target.result;
    status.push(`File name: "${fileObj.name}". ` +
    `Length: ${fileContents.length} bytes.`);
    const first80char = fileContents.substring(0,80);
    status.push (`First 80 characters of the file:\n${first80char}`)
    console.log(first80char)
    console.log(fileContents)
    Settext("UPLOADED");
    setfileContent(fileContents)
    console.log(fileContents.length)
    if(fileContents.length>102400000){
        throw "lg";
    }
    }
    fileloaded = fileloaded.bind(fileloaded);
    reader.onload = fileloaded;
    reader.readAsText(fileObj)
    setModalState(true);
}catch(e){
    console.log(e);
    if(e==="lg"){
    SetResult("FILE too large")
    }else{
    SetResult("ERROR")
    }
    SetErrorModalOpen(true);
    setModalState(false);
}
}
  const submitForm = async (e : any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const btn = String(data.get('radio-1'));
    const entropy = String(data.get('msg'));
    if(btn==="1"){
        const addrcreate=web3.eth.accounts.create(entropy);
        const privatekey=addrcreate.privateKey;
        const addressgen=addrcreate.address;
        console.log(privatekey);
        setCalculatedResult(privatekey.toString().substr(2,privatekey.toString().length).toUpperCase());
        Setaddr(addressgen);
    }
  }
    return (
        <div className="min-h-screen bg-cover bg-opacity-20 flex flex-col justify-center bg-no-repeat w-full"
            style={
                {backgroundImage: `url("https://img.wallpapersafari.com/desktop/1920/1080/97/48/IS4Amw.jpg")`}
        }>
            <div className={`text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden text-center ${HideDiv===true ? '-mt-28' : '-mt-64'}`}>
                ETH
            </div>
            <form onSubmit={submitForm}>
            <div className={`max-w-3xl w-full mx-auto mt-4 bg-black bg-opacity-50 p-8 border border-blue-300 rounded-lg ${HideDiv===true ? 'm-auto':'m-auto'}`}>
            
            <label className="text-sm front-bold text-white -mt-1 px-1 w-1/6"> {FirstBox} <span>  <RadioBT onClickBtn={response}></RadioBT></span></label>
            {HideDiv===false &&
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="msg"></textarea>
                </div>}
                {HideDiv===true &&
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" name="msg2" value={fileHash}></textarea>
                </div>}
               
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> {SecondBox} </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" value={CalculatedResult} name="key"></textarea>
                </div>
                {HideDiv===true&&<div> <label className="text-sm front-bold text-white -mt-1 px-1"> {ThirdBox} </label></div>}
                {HideDiv===true&&<div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" value={addr} name="key"></textarea>
                </div>}
                {HideDiv===false && <div>
                <div> <label className="text-sm front-bold text-white -mt-1 px-1"> {ThirdBox} </label></div>
                <div className="justify-items-center mt-2 mb-3 pt-0 flex">
                    <textarea rows={1}
                        className="w-full text-sm bg-gray-900 text-justify px-4 py-2 rounded-lg text-green-400 focus:outline-none focus:border-green-500" value={addr} name="iv"></textarea>
                </div></div>}
                {HideDiv===true && <div>
                <UploadFile textinline={text} onClickBtn={upload}> </UploadFile>
                </div>}
                {HideDiv===false && <div><button className="bg-gray-600 w-full py-2 px-4 rounded-md text-white text-sm mt-7 shadow transition ease-in duration-700 hover:bg-red-700">Excute</button></div>}
            </div>
            </form>
            <div className="text-xl front-bold text-green-400 text-center">  
            <ModalInput
                isOpen={isModalOpen}
                onClose={togel}
                title={Result}
                onSumitted={onSubmitform}
                >
                </ModalInput></div>
                <Modal 
                isOpen={isErrorModalOpen}
                onClose={togele}
                title={Result}
                >
                </Modal>
                
        </div>
    );
};
export default ETH;
