import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Group, Text, TextInput } from '@mantine/core';
import AudioDropzone from '../../../AudioDropzone/AudioDropzone';
import { Tex } from 'tabler-icons-react';


function SpeechInputNode({ data }) {
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [audioFile, setAudioFile] = useState(null);

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
                onConnect={(params) => console.log('handle source onConnect', params)}
            />
        </>
    );
}

export default SpeechInputNode;