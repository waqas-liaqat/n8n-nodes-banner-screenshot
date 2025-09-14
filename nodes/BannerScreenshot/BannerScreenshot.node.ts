import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import axios from 'axios';

export class BannerScreenshot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Banner Screenshot',
		name: 'bannerScreenshot',
		icon: 'file:image.png',
		group: ['transform'],
		version: 1,
		description: 'Send HTML to API and get a 1080x1080 screenshot (base64)',
		defaults: {
			name: 'Banner Screenshot',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'API URL',
				name: 'apiUrl',
				type: 'string',
				default: 'https://your-service.up.railway.app/screenshot',
				required: true,
				description: 'Public URL of your deployed screenshot API',
			},
			{
				displayName: 'HTML Content',
				name: 'html',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '<div style="background:red;width:100%;height:100%">Hello World</div>',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const apiUrl = this.getNodeParameter('apiUrl', i) as string;
			const html = this.getNodeParameter('html', i) as string;

			const response = await axios.post(apiUrl, { html });

			returnData.push({
				json: {
					status: response.data.status,
					imageBase: response.data.imageBase,
				},
			});
		}
		return [returnData];
	}
}
