import React, {useEffect, useState} from 'react';
import './App.css';
    const Menu: React.FC = () => {
    const [Select,SetSelect] = useState(0);
      useEffect(() => {
        const init = async () => {
          SetSelect(0);
        }
        init();
      },[]
      );
      function changetab(e : any) {
        console.log(e)
        console.log(e.target.id)
        switch(e.target.id){
          case "0":
            SetSelect(0);
            break;
          case "1":
            SetSelect(1);
            break;
          case "2":
            SetSelect(2);
            break;
          default:
            SetSelect(0);
        }
        }
      return (
        <div>
                 <ul id="tabs" className="inline-flex w-full px-1 pt-2 flex justify-center items-center">
                          <li className="px-4 py-2 -mb-px font-semibold text-gray-800 opacity-50"  onClick={changetab}><a id="0" href="/">Mobile No</a></li>
                          <li className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 border-b-2 border-blue-400 rounded-t" onClick={changetab}><a id="1" href="/mnt">SHA256-BASE64 {Select}</a></li>
                          <li className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50"><a href="/">Signature Create</a></li>
                          <li className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50"><a href="/mn">Signature Verify</a></li>
                        </ul>
       </div>
      );
    };
export default Menu;
