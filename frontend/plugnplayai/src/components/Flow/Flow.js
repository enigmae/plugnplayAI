import { Button, Text } from '@mantine/core';
import { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import SpeechToTextNode from '../SpeechToTextNode/SpeechToTextNode.js';
import { MessageChatbot, Microphone2, Mountain, TextRecognition } from 'tabler-icons-react';

const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 550, y: 350 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 600, y: 600 },
    },
    {
        id: 'node-1',
        type: 'textUpdater',
        position: { x: 200, y: 200 },
        data: { value: 123 }
    },

];

const nodeTypes = { textUpdater: SpeechToTextNode };

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'there', animated: true, style: { stroke: 'black', strokeWidth: 2 }, }];

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const ModelButton = ({ icon, modelName }) => {
        return (
            <div style={{ padding: '10px 10px 0px 10px', display: 'flex' }}>
                <Button
                    variant='outline'
                    style={{ display: 'flex', flex: 1, border: '1px solid #e5e5e5', color: 'black', padding: 0 }}
                >
                    <div style={{ width: '160px', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <div style={{ padding: '0px 10px 0px 10px' }}>
                            {icon}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', }}>
                            <Text size='md' weight={400} >
                                {modelName}
                            </Text>
                        </div>
                    </div>
                </Button>
            </div>
        )
    }

    return (

        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100hw' }}>
                {/* Model Menu */}
                <div style={{ display: 'flex', flexDirection: 'column', background: '#FCFDFD', height: '100%', width: '15%', borderRight: '1px solid #efefef' }}>
                    <div style={{ color: '#333333', fontSize: 25, textAlign: 'center' }}>
                        Models
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <ModelButton
                            icon={<Microphone2
                                size={25}
                                strokeWidth={1.5}
                                color={'#ffaa00'}
                            />}
                            modelName="Speech-to-Text"
                        />
                        <ModelButton
                            icon={<TextRecognition
                                size={25}
                                strokeWidth={1.5}
                                color={'#7dd279'}
                            />}
                            modelName="Text-to-Text"
                        />
                        <ModelButton
                            icon={<Mountain
                                size={25}
                                strokeWidth={1.5}
                                color={'#bf40af'}
                            />}
                            modelName="Text-to-Image"
                        />
                        <ModelButton
                            icon={<MessageChatbot
                                size={25}
                                strokeWidth={1.5}
                                color={'#ff3f3f'}
                            />}
                            modelName="Text-to-Chat"
                        />
                    </div>
                </div>

                {/* ReactFlow  */}
                <div style={{ height: '100%', width: '85%' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </div >
    );
}

export default Flow;
