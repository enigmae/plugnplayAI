import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { TextInput } from '@mantine/core';

function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Right} />
            <div style={{ border: '1px solid black', padding: 10, borderRadius: 10 }}>
                <TextInput
                    placeholder="Prompt"
                    label="Input prompt"
                    withAsterisk
                />
            </div>
            <Handle type="source" position={Position.Left} id="a" />
        </>
    );
}

export default TextUpdaterNode;