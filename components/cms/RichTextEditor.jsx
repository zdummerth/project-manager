import { useState } from "react";
// import DOMPurify from 'isomorphic-dompurify';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function RichTextEditor() {
    const [value, setValue] = useState('')
    console.log(value)
    // const clean = DOMPurify.sanitize(value)
    return (
        <>
            <ReactQuill value={value} onChange={setValue} />
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </>
    )
}

export default RichTextEditor;
