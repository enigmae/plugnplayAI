import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Right} />
            <div>
                <input id="text" name="text" onChange={onChange} />
            </div>
            <Handle type="source" position={Position.Left} id="a" />
        </>
    );
}

export default TextUpdaterNode;