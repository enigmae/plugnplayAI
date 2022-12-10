import { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Group, Text, Textarea, TextInput } from '@mantine/core';
import { useApp } from '../../../../context/AppContext';


function TextInputNode({ data, id }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;
    const [textInput, setTextInput] = useState('')

    const edges = useEdges();

    useEffect(() => {
        if (textInput) {
            let outgoingEdges = edges.find(edg => edg.source === id);
            outgoingEdges && handleTextInput(outgoingEdges)
        }
    }, [textInput]);

    const handleTextInput = (params) => {
        const { target } = params
        setAppState(prevState => {
            let targetNode = prevState.nodes.find(node => node.id === target);
            let restNodes = prevState.nodes.filter(node => node.id !== target);

            targetNode = {
                ...targetNode,
                data: {
                    ...targetNode.data,
                    sourceData: textInput
                }
            }

            return ({
                ...prevState,
                nodes: [
                    ...restNodes,
                    targetNode
                ]
            })
        })
    }

    return (
        <>
            <div style={{ border: `2px solid ${baseColor}`, borderRadius: 5, width: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>{model.name}</Text>
                </div>
                <Textarea
                    minRows={8}
                    placeholder='Write something fun'
                    value={textInput}
                    onChange={(ev) => { setTextInput(ev.target.value) }}
                />
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: handleSize, height: handleSize }}
                onConnect={(params) => handleTextInput(params)}
            />
        </>
    );
}

export default TextInputNode;