import React from 'react'
interface UploadProp{
    textinline: string;
    onClickBtn?: (e:any) => void;
}
export const UploadFile: React.FC <UploadProp>= ({onClickBtn,textinline}) => (

    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
            <div className="w-full p-3">
                <div className="opacity-70 relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-800 flex justify-center items-center hover:border-green-700 hover:text-green-700">
                    <div className="absolute">
                <div className="flex flex-col items-center"> <i className="fa fa-folder-open fa-4x text-blue-700">{textinline}</i> <span className="block text-green-400 font-normal"></span> </div>
                    </div> <input type="file" className="h-full w-full opacity-0" onChange={onClickBtn} name="input"></input>
                </div>
            </div>
        </div>
    </div>
);


