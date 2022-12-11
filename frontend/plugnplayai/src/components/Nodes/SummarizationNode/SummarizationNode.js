import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, Loader, LoadingOverlay, Text, Textarea, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import { useApp } from '../../../context/AppContext';

function SummarizationNode({ data, id }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState('');
    const [responseData, setResponseData] = useState(null);

    const edges = useEdges();

    useEffect(() => {
        if (data.sourceData) {
            setSummaryData(data.sourceData);
        }
    }, [data])

    useEffect(() => {
        if (responseData) {
            let outgoingEdges = edges.find(edg => edg.source === id);
            outgoingEdges && handleTextInput(outgoingEdges)
        }
    }, [responseData]);

    const handleTextInput = (params) => {
        const { target } = params
        setAppState(prevState => {
            let targetNode = prevState.nodes.find(node => node.id === target);
            let restNodes = prevState.nodes.filter(node => node.id !== target);

            targetNode = {
                ...targetNode,
                data: {
                    ...targetNode.data,
                    sourceData: responseData
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

    const processSummarization = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.post('/summarize', null, {
                params: {
                    text_file: summaryData,
                },
                responseType: 'arraybuffer',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })

            var enc = new TextDecoder("utf-8");
            var arr = new Uint8Array(response.data);

            setLoading(false);
            console.log(enc.decode(arr));
            setResponseData(enc.decode(arr));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
            <div style={{ border: `2px solid ${baseColor}`, borderRadius: 5, width: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>{model.name}</Text>
                </div>
                <div style={{ padding: 8, flex: 1 }}>
                    <div>
                        <Textarea
                            minRows={4}
                            value={summaryData}
                            onChange={(ev) => setSummaryData(ev.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        variant="outline"
                        style={{ width: 150, borderColor: baseColor, color: baseColor }}
                        onClick={() => processSummarization()}
                        disabled={!summaryData}
                    >
                        {loading ? <Loader variant="bars" size="xs" color='green' /> : 'Apply'}
                    </Button>
                </div>
                {responseData && (
                    <div style={{ padding: 10 }}>
                        <Textarea
                            minRows={5}
                            value={responseData}
                            onChange={(ev) => setResponseData(ev.target.value)}
                        />
                    </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: baseColor, marginTop: 10 }}>
                    <Text color='white' weight={500}>Powered by</Text>
                    <Text
                        weight={500}
                        color='white'
                        style={{ textAlign: 'center' }}
                    >
                        HuggingFace
                        <br />
                        Google Flan-T5-Transformer
                    </Text>
                </div>
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

export default SummarizationNode;