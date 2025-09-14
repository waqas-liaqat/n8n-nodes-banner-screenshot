"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerScreenshot = void 0;
const axios_1 = __importDefault(require("axios"));
class BannerScreenshot {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const apiUrl = this.getNodeParameter('apiUrl', i);
            const html = this.getNodeParameter('html', i);
            const response = await axios_1.default.post(apiUrl, { html });
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
exports.BannerScreenshot = BannerScreenshot;
