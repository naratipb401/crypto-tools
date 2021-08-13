import React, {useEffect, useState} from 'react';
import './App.css';
import CreateSig from './view/RSAsigcreate';
import VerifySig from './view/RSAsigverify';
import AES from './view/AES';
import ETH from './view/ETH';
//import Menu from './menu';
    const App: React.FC = () => {
      const [Select,SetSelect] = useState('');
      useEffect(() => {
        const init = async () => {
          SetSelect("0");
        }
        init();
      },[]
      );
      function changetab(e : any) {
      switch(e.target.id){
        case "0":
          SetSelect("0");
          break;
        case "1":
          SetSelect("1");
          break;
        case "2":
          SetSelect("2");
          break;
        case "3":
          SetSelect("3");
          break;
      }
      }
      return (
        <div>
          <ul id="tabs" className="inline-flex w-full px-1 pt-1 flex justify-center items-center bg-gray-900 h-12">
                          <li className={`${Select === "0" ? 'border-green-400' :''} ${Select === "0" ? 'border-b-4':''} px-4 py-2 h-12 font-semibold text-white rounded-t opacity-50 rounded-t}`}  onClick={changetab}><a id="0" href="#B">AES-256</a></li>
                          <li className={`${Select === "1" ? 'border-green-400' :''} ${Select === "1" ? 'border-b-4':''} px-4 py-2 h-12 font-semibold text-white rounded-t opacity-50 rounded-t}`} onClick={changetab}><a id="1" href="#BKC">ETH</a></li>
                          <li className={`${Select === "2" ? 'border-green-400' :''} ${Select === "2" ? 'border-b-4':''} px-4 py-2 h-12 font-semibold text-white rounded-t opacity-50 rounded-t}`}  onClick={changetab}><a id="2" href="#p">Signature Create</a></li>
                          <li className={`${Select === "3" ? 'border-green-400' :''} ${Select === "3" ? 'border-b-4':''} px-4 py-2 h-12 font-semibold text-white rounded-t opacity-50 rounded-t}`}  onClick={changetab}><a id="3" href="#PPPP">Signature Verify</a></li>
                        </ul>
           {Select==="0" && <div><AES /></div>}
           {Select==="1" && <div><ETH /></div>}
           {Select==="2" && <div><CreateSig /></div>}
           {Select==="3" && <div><VerifySig /></div>}

        </div>
        
      );
    };


export default App;
