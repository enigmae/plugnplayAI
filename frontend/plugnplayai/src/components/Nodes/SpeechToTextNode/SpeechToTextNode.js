import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Button, Group, Text, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';

function SpeechToTextNode({ data }) {
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const processSpeech = async () => {
        console.log("here1")
        const response = await axiosInstance.get(
            '/transcribe'
        );
        console.log("here2")

        console.log(response);
    }

    return (
        <>
            <Handle type="source" position={Position.Left} id="a" style={{ width: handleSize, height: handleSize }} />
            <div style={{ border: `2px solid ${baseColor}`, borderRadius: 5, width: 300, height: 200 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>{model.name}</Text>
                </div>
                <div style={{ padding: 8 }}>
                    <Group position='apart' style={{ padding: 8 }}>
                        <Text>Seed</Text>
                        <TextInput />
                    </Group>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button style={{ width: 150 }} onClick={() => processSpeech()}>Apply</Button>
                </div>
            </div>
            <Handle type="target" position={Position.Right} style={{ width: handleSize, height: handleSize }} />
        </>
    );
}

export default SpeechToTextNode;