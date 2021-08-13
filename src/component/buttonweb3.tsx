import React from 'react'
import './modal.css'
interface BtnProp{
    onClickBtn: (e:any) => void;
}
export const RadioBT: React.FC <BtnProp>= ({onClickBtn}) => (

    <label className="inline-flex ml-1">
        <input type="radio" className="form-radio text-indigo-600 ml-10" onClickCapture={onClickBtn} name="radio-1" value="1" defaultChecked>
    </input>
    <span className="ml-2 -mt-0.5">GENERATE</span>
        <input type="radio" className="form-radio text-indigo-600 ml-10" onClickCapture={onClickBtn} name="radio-1" value="2">
    </input>
    <span className="ml-2 -mt-0.5">DECRYPT</span>
    </label>   

);
