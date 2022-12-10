import { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, Loader, LoadingOverlay, Text, Textarea, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';

function SpeechToTextNode({ data }) {
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        console.log(data)
    }, [data])

    const processSpeech = async () => {
        setLoading(true);

        var audioFile = data.sourceData;
        const form = new FormData();
        form.append('audio_mp3', audioFile[0]);

        const response = await axiosInstance.post('/transcribe', form, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })

        setLoading(false);
        setResponseData(response.data);
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
                        <Text>Seed</Text>
                        <TextInput />
                    </Group>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button
                        variant="outline"
                        style={{ width: 150, borderColor: baseColor, color: baseColor }}
                        onClick={() => processSpeech()}
                        disabled={!data.sourceData}
                    >
                        {loading ? <Loader variant="bars" size="xs" color='yellow' /> : 'Apply'}
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

export default SpeechToTextNode;