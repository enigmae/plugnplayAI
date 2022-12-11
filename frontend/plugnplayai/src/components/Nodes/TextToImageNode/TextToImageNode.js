import { useEffect, useState } from 'react';
import { Handle, Position, useEdges } from 'reactflow';
import { Button, Group, Loader, Text, Textarea, TextInput } from '@mantine/core';
import axiosInstance from '../../../services/axiosInstance';
import { useApp } from '../../../context/AppContext';
import { useForm } from '@mantine/form';

function TextToImageNode({ data, id }) {
    const { setAppState } = useApp()
    const { model } = data;
    const baseColor = model.color;
    const handleSize = 15;

    const [loading, setLoading] = useState(false);
    const [responseImage, setResponseImage] = useState(null);

    const edges = useEdges();

    const form = useForm({
        initialValues: {
            promptStr: 'Batman fighting an AI overlord',
            seed: 26031998,
            steps: 20,
            cfgScale: 10
        },

        validate: {
            seed: (value) => Number.isInteger(value),
            steps: (value) => Number.isInteger(value),
            cfgScale: (value) => Number(value) === value && value % 1 !== 0
        },
    });

    useEffect(() => {
        if (data.sourceData) {
            form.setFieldValue('promptStr', data.sourceData)
        }
    }, [data])

    const processTextToImage = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.post('/generate_image', null, {
                params: {
                    prompt: form.values.promptStr,
                    seed: form.values.seed,
                    steps: form.values.steps,
                    cfg_scale: form.values.cfgScale
                },
                responseType: 'arraybuffer',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })

            const imageData = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            // const image = "data:image/png;base64," + Buffer.from(response.data, 'binary').toString('base64');
            setLoading(false);
            setResponseImage(imageData);
            console.log("success", imageData, response)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
                <form>
                    <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `2px solid ${baseColor}`, background: baseColor, padding: 8 }}>
                        <Text color='white' weight={800} size='xl'>{model.name}</Text>
                    </div>
                    <div style={{ padding: 8 }}>
                        <Group position='apart' style={{ padding: 8 }}>
                            <Text>Prompt</Text>
                            <Textarea
                                minRows={4}
                                // value={data.sourceData} 
                                {...form.getInputProps('promptStr')}
                            />
                        </Group>
                        <Group position='apart' style={{ padding: 8 }}>
                            <Text>Seed</Text>
                            <TextInput
                                {...form.getInputProps('seed')}
                            />
                        </Group>
                        <Group position='apart' style={{ padding: 8 }}>
                            <Text>Steps</Text>
                            <TextInput {...form.getInputProps('steps')} />
                        </Group>
                        <Group position='apart' style={{ padding: 8 }}>
                            <Text>CFG</Text>
                            <TextInput {...form.getInputProps('cfgScale')} />
                        </Group>
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <Button
                            variant="outline"
                            type='submit'
                            style={{ width: 150, borderColor: baseColor, color: baseColor }}
                            onClick={(e) => {
                                e.preventDefault()
                                // form.validate();
                                processTextToImage()
                            }}
                            disabled={!form.values.promptStr}
                        >
                            {loading ? <Loader variant="bars" size="xs" color='magenta' /> : 'Apply'}
                        </Button>
                    </div>
                </form>

                {responseImage && (
                    <div style={{ padding: 10, display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: 200, height: 200 }} src={`data:image/png;base64,${responseImage}`} />
                        {/* <img style={{ height: 200, width: 200 }} src={responseImage} /> */}
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