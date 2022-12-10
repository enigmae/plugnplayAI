import { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, LoadingOverlay, Text, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';

function SpeechToTextNode({ data }) {
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;
    const [loading, setLoading] = useState(false);

    const edges = useEdges();

    useEffect(() => {
        console.log(edges);
    }, [edges]);

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data])

    const processSpeech = async () => {
        console.log("here1")
        setLoading(true);

        const response = await axiosInstance.get(
            '/transcribe'
        );

        setLoading(false);
        console.log("here2")

        console.log(response);
    }

    return (
        <>
            <Handle type="target" position={Position.Left} id="a" style={{ width: handleSize, height: handleSize }} />
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
                    <Button variant="outline" style={{ width: 150, borderColor: baseColor, color: baseColor }} onClick={() => processSpeech()}>
                        {loading ? <LoadingOverlay visible={true} overlayBlur={2} radius='sm' /> : 'Apply'}
                    </Button>
                </div>
            </div>
            <Handle type="source" position={Position.Right} style={{ width: handleSize, height: handleSize }} />
        </>
    );
}

export default SpeechToTextNode;