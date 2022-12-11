import { Handle, Position } from 'reactflow';
import { Button, Group, Loader, LoadingOverlay, Text, Textarea, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';


function TranslationNode({ data }) {
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        console.log(data)
    }, [data])

    const processTranslate = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.post('/translate', null, {
                params: {
                    text_file: data.sourceData,
                    language: 'german'
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
            <div style={{ border: `2px solid ${baseColor}`, borderRadius: 5, width: 300, paddingBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                    <Text color='white' weight={800} size='xl'>{model.name}</Text>
                </div>
                <div style={{ padding: 8, flex: 1 }}>
                    <div>
                        <Textarea
                            minRows={4}
                            value={data.sourceData ? data.sourceData : ''}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        variant="outline"
                        style={{ width: 150, borderColor: baseColor, color: baseColor }}
                        onClick={() => processTranslate()}
                        disabled={!data.sourceData}
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
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: handleSize, height: handleSize }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </>
    );
}

export default TranslationNode;