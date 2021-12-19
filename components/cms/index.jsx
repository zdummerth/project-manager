import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import RichTextEditor from 'components/cms/RichTextEditor'
import Image from 'next/image'
import Button from 'components/shared/Button'

const Container = styled.div`
    .preview {

    }

    .control-cell {
        display: flex;
        justify-content: space-between;
        border: 1px solid gray;
        padding: 5px;
        width: 100%;
    }
`

export default function CMS() {
    const [content, setContent] = useState([])
    const [textEditor, setTextEditor] = useState({
        open: true,
        value: ''
    })

    const toggleTextEditor = () => {
        setTextEditor({
            ...textEditor,
            open: !textEditor.open
        })
    }
    const handleTextChange = (value) => {
        setTextEditor({
            ...textEditor,
            value
        })
    }

    const handleTextSave = () => {
        setContent([...content, {
            type: 'html',
            data: textEditor.value
        }])
        setTextEditor({
            open: false,
            value: ''
        })
    }

    const removeCell = (ind) => {
        console.log('index: ', ind)
        const newArr = content.filter((c, i) => ind !== i)
        console.log('content: ', newArr)
        setContent(newArr)
    }



    // console.log('component', Component)

    return (
        <Container>
            <div>CMS</div>
            <div className="controls">
                <Button onClick={toggleTextEditor}>Add Text</Button>

                {/* <Button>Add Text</Button>
                <Button>Add Image</Button>
                <Button>Add Markdown File</Button> */}
                {content.map((c, ind) => {
                    return (
                        <div key={ind} className='control-cell'>
                            <div>{c.type}</div>
                            <div>{c.data?.substring(0, 10)}</div>
                            <button onClick={() => removeCell(ind)}>x</button>
                        </div>
                    )
                })}

                {textEditor.open && (
                    <>
                        <RichTextEditor value={textEditor.value} setValue={handleTextChange} />
                        <Button onClick={handleTextSave}>Save</Button>
                        <Button cancel onClick={toggleTextEditor}>Cancel</Button>


                    </>
                )}
            </div>
            <div className="preview">
                <p>Preview</p>
                {content.map((c, ind) => {
                    if (c.type === 'html') {
                        return (
                            <div
                                key={ind}
                                dangerouslySetInnerHTML={{ __html: c.data }}
                            />
                        )
                    }
                    if (c.type === 'image') {
                        return (
                            <Image
                                key={ind}
                                src={c.data}
                            />
                        )
                    }
                })}
                <div
                    dangerouslySetInnerHTML={{ __html: textEditor.value }}
                />
            </div>
        </Container>
    )
}