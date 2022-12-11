import { Button, Text } from '@mantine/core';
import { useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import uuid from 'react-uuid';
import { useApp } from '../../context/AppContext';


function Flow() {
    const { appState, setAppState, ModelNodes, InputNodes, nodeTypes } = useApp();

    // const [nodes, setNodes] = useState(appState.nodes);
    // const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setAppState(prevAppState => {
            return ({
                ...prevAppState,
                nodes: applyNodeChanges(changes, prevAppState.nodes)
            })
        }), []
    );

    const onEdgesChange = useCallback(
        (changes) => setAppState(prevAppState => {
            return ({
                ...prevAppState,
                edges: applyEdgeChanges(changes, prevAppState.edges)
            })
        }), []
    );

    const onConnect = useCallback(
        (connection) => setAppState(prevAppState => {
            return ({
                ...prevAppState,
                edges: addEdge(connection, prevAppState.edges)
            })
        }), [setAppState]
    );

    const ModelButton = ({ model }) => {
        return (
            <div style={{ padding: '10px 10px 0px 10px', display: 'flex' }}>
                <Button
                    variant='outline'
                    style={{ display: 'flex', flex: 1, border: '1px solid #e5e5e5', color: 'black', padding: 0 }}
                    onClick={() => {
                        setAppState(prev => {
                            return ({
                                ...prev,
                                nodes: [
                                    ...prev.nodes,
                                    {
                                        id: `${model.type}-${uuid()}`,
                                        type: model.type,
                                        position: { x: 700, y: 700 },
                                        data: { value: 123, model: model }
                                    }
                                ]
                            })
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
                        nodes={appState.nodes}
                        edges={appState.edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Background variant='lines' />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </div >
    );
}

export default Flow;
