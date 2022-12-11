import { useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, Loader, Text, Textarea, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';
import { useApp } from '../../../context/AppContext';


function ConversationalNode({ data, id }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;
    const edges = useEdges();

    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState(null);


    useEffect(() => {
        console.log(data)
    }, [data])

    const processConversation = async () => {
        setLoading(true);

        var textFeed = data.sourceData;

        const response = await axiosInstance.post('/chatbot', null, {
            params: {
                question: data.sourceData
            },
            responseType: 'string',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })

        setLoading(false);
        setResponseText(response.data);
    }

    useEffect(() => {
        if (responseText) {
            let outgoingEdges = edges.find(edg => edg.source === id);
            outgoingEdges && handleTextInput(outgoingEdges)
        }
    }, [responseText]);

    const handleTextInput = (params) => {
        const { target } = params
        setAppState(prevState => {
            let targetNode = prevState.nodes.find(node => node.id === target);
            let restNodes = prevState.nodes.filter(node => node.id !== target);

            targetNode = {
                ...targetNode,
                data: {
                    ...targetNode.data,
                    sourceData: responseText
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
            <Handle
                type="target"
                position={Position.Left}
                id="a"
                style={{ width: handleSize, height: handleSize }}
                onConnect={(params) => console.log('handle target onConnect', params)}
            />
            <div style={{ border: `2px solid ${baseColor}`, paddingBottom: 10, borderRadius: 5, width: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>{model.name}</Text>
                </div>
                <div style={{ padding: 8 }}>
                    {data.sourceData && data.sourceData[0].name}
                    {/* <Group position='apart' style={{ padding: 8 }}>
                        <Text>Seed</Text>
                        <TextInput />
                    </Group> */}
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        variant="outline"
                        style={{ width: 150, borderColor: baseColor, color: baseColor }}
                        onClick={() => processConversation()}
                        disabled={!data.sourceData}
                    >
                        {loading ? <Loader variant="bars" size="xs" color='yellow' /> : 'Apply'}
                    </Button>
                </div>
                {responseText && (
                    <div style={{ padding: 10 }}>
                        <Textarea
                            minRows={5}
                            value={responseText}
                            onChange={(ev) => setResponseText(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: handleSize, height: handleSize }}
                onConnect={(params) => handleTextInput(params)}
            />
        </>
    );
}

export default ConversationalNode;