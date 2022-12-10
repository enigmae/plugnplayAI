import { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, Loader, Text, Textarea, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';
import { useApp } from '../../../context/AppContext';

function TextToImageNode({ data, id }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const [loading, setLoading] = useState(false);
    const [responseImage, setResponseImage] = useState(null);

    const edges = useEdges();

    useEffect(() => {
        console.log(data)
    }, [data])

    const processTextToImage = async () => {
        setLoading(true);

        const response = await axiosInstance.post('/generate_image', null, {
            params: {
                prompt: data.sourceData
            },
            headers: {
                'accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            }
        })

        setLoading(false);
        setResponseImage(Buffer.from(response.data, "binary").toString("base64"));
    }

    useEffect(() => {
        if (responseImage) {
            let outgoingEdges = edges.find(edg => edg.source === id);
            outgoingEdges && handleTextInput(outgoingEdges)
        }
    }, [responseImage]);

    const handleTextInput = (params) => {
        const { target } = params
        setAppState(prevState => {
            let targetNode = prevState.nodes.find(node => node.id === target);
            let restNodes = prevState.nodes.filter(node => node.id !== target);

            targetNode = {
                ...targetNode,
                data: {
                    ...targetNode.data,
                    sourceData: responseImage
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
                    <Group position='apart' style={{ padding: 8 }}>
                        <Text>Prompt</Text>
                        <TextInput value={data.sourceData} />
                    </Group>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        variant="outline"
                        style={{ width: 150, borderColor: baseColor, color: baseColor }}
                        onClick={() => processTextToImage()}
                        disabled={!data.sourceData}
                    >
                        {loading ? <Loader variant="bars" size="xs" color='yellow' /> : 'Apply'}
                    </Button>
                </div>
                {responseImage && (
                    <div style={{ padding: 10 }}>
                        <img src={`data:image/jpeg;charset=utf-8;base64,${responseImage}`} />
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

export default TextToImageNode;