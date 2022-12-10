import { Button, Text } from '@mantine/core';
import { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { AlphabetGreek, ClipboardText, FileText, MessageChatbot, Microphone, Microphone2, Mountain, TextRecognition } from 'tabler-icons-react';
import uuid from 'react-uuid';
import { ConversationalNode, SpeechInputNode, SpeechToTextNode, SummarizationNode, TextInputNode, TextToImageNode, TranslationNode } from '../Nodes';

const ModelNodes = [
    {
        name: "Speech-to-Text",
        type: 'SpeechToText',
        color: '#ffaa00',
        icon: <Microphone2
            size={25}
            strokeWidth={1.5}
            color={'#ffaa00'}
        />
    },
    {
        name: "Translation",
        type: 'Translation',
        color: '#7dd279',
        icon: <AlphabetGreek
            size={25}
            strokeWidth={1.5}
            color={'#7dd279'}
        />
    },
    {
        name: "Text-to-Image",
        type: 'TextToImage',
        color: '#bf40af',
        icon: <Mountain
            size={25}
            strokeWidth={1.5}
            color={'#bf40af'}
        />
    },
    {
        name: "Conversational",
        type: 'Conversational',
        color: '#ff3f3f',
        icon: <MessageChatbot
            size={25}
            strokeWidth={1.5}
            color={'#ff3f3f'}
        />
    },
    {
        name: "Summarization",
        type: 'SpeechToText',
        color: '#7676fc',
        icon: <ClipboardText
            size={25}
            strokeWidth={1.5}
            color={'#7676fc'}
        />
    }
]

const InputNodes = [
    {
        name: "Speech Input",
        type: 'SpeechInput',
        color: '#ffaa00',
        icon: <Microphone
            size={25}
            strokeWidth={1.5}
            color={'#ffaa00'}
        />
    },
    {
        name: "Text Input",
        type: 'TextInput',
        color: '#7dd279',
        icon: <FileText
            size={25}
            strokeWidth={1.5}
            color={'#7dd279'}
        />
    },
]

const initialNodes = [
    // {
    //     id: '1',
    //     data: { label: 'Hello' },
    //     position: { x: 550, y: 350 },
    //     type: 'input',
    // },
    // {
    //     id: '2',
    //     data: { label: 'World' },
    //     position: { x: 600, y: 600 },
    // },
    {
        id: 'node-1',
        type: 'SpeechToText',
        position: { x: 200, y: 200 },
        data: {
            value: 123, model: {
                name: "Speech-to-Text",
                type: 'SpeechToText',
                color: '#ffaa00',
                icon: <Microphone2
                    size={25}
                    strokeWidth={1.5}
                    color={'#ffaa00'}
                />
            }
        }
    },

];

const nodeTypes = {
    // Model Nodes
    SpeechToText: SpeechToTextNode,
    Translation: TranslationNode,
    TextToImage: TextToImageNode,
    Conversational: ConversationalNode,
    Summarization: SummarizationNode,

    // Input Nodes
    TextInput: TextInputNode,
    SpeechInput: SpeechInputNode
};

const initialEdges = [];

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

    const ModelButton = ({ model }) => {
        return (
            <div style={{ padding: '10px 10px 0px 10px', display: 'flex' }}>
                <Button
                    variant='outline'
                    style={{ display: 'flex', flex: 1, border: '1px solid #e5e5e5', color: 'black', padding: 0 }}
                    onClick={() => {
                        setNodes(prev => {
                            return ([
                                ...prev,
                                {
                                    id: `${model.name}-${uuid()}`,
                                    type: model.type,
                                    position: { x: 700, y: 700 },
                                    data: { value: 123, model: model }
                                }
                            ])
                        })
                    }}
                >
                    <div style={{ width: '160px', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <div style={{ padding: '0px 10px 0px 10px' }}>
                            {model.icon}
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', }}>
                            <Text size='md' weight={400} >
                                {model.name}
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
                        {ModelNodes.map((model, index) => {
                            return (
                                <ModelButton
                                    key={index}
                                    model={model}
                                />
                            )
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <div style={{ width: 200, borderTop: '1px solid #afafaf' }}></div>
                    </div>
                    <div style={{ color: '#333333', fontSize: 25, textAlign: 'center' }}>
                        Input Nodes
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        {InputNodes.map((model, index) => {
                            return (
                                <ModelButton
                                    key={index}
                                    model={model}
                                />
                            )
                        })}
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
