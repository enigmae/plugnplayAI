import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Group, Text, TextInput } from '@mantine/core';

const baseColor = '#ffaa00';
const handleSize = 15;

function SpeechToTextNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="source" position={Position.Left} id="a" style={{ width: handleSize, height: handleSize }} />
            <div style={{ border: `2px solid ${baseColor}`, borderRadius: 5, width: 300, height: 200 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>Speech to Text</Text>
                </div>
                <div style={{ padding: 8 }}>
                    <Group position='apart' style={{ padding: 8 }}>
                        <Text>Seed</Text>
                        <TextInput />
                    </Group>
                </div>
            </div>
            <Handle type="target" position={Position.Right} style={{ width: handleSize, height: handleSize }} />
        </>
    );
}

export default SpeechToTextNode;