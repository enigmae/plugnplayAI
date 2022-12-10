import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Group, Text, TextInput } from '@mantine/core';
import AudioDropzone from '../../../AudioDropzone/AudioDropzone';
import { Tex } from 'tabler-icons-react';
import { useApp } from '../../../../context/AppContext';


function SpeechInputNode({ data }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;
    const [audioFile, setAudioFile] = useState(null);

    const handleSpeechInput = (params) => {
        const { target } = params
        setAppState(prevState => {
            let targetNode = prevState.nodes.find(node => node.id === target);
            let restNodes = prevState.nodes.filter(node => node.id !== target);

            targetNode = {
                ...targetNode,
                data: {
                    ...targetNode.data,
                    sourceData: audioFile
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
                <div style={{ padding: 8 }}>
                    <AudioDropzone setAudioFile={setAudioFile} />
                </div>
                <div style={{ padding: 10 }}>
                    {
                        audioFile && audioFile.map((file, index) => {
                            return (
                                <div key={index}>
                                    <Text>{file.name}</Text>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: handleSize, height: handleSize }}
                onConnect={(params) => handleSpeechInput(params)}
            />
        </>
    );
}

export default SpeechInputNode;