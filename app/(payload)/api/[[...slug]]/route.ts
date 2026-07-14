import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '../../../../payload.config'

export const GET = REST_GET(config)
export const PATCH = REST_PATCH(config)
export const DELETE = REST_DELETE(config)
export const OPTIONS = REST_OPTIONS(config)

const basePostHandler = REST_POST(config)

type RouteContext = {
  params: Promise<{ slug?: string[] }>
}

// Debugging wrapper for POST requests to log 500 internal errors to the server console
export const POST = async (req: Request, context: RouteContext) => {
  const res = await basePostHandler(req, context)
  
  if (res.status >= 500) {
    console.log('\n=============================================');
    console.log(`[DEBUG] POST Request failed with status ${res.status}`);
    console.log(`URL: ${req.url}`);
    
    try {
      const clone = res.clone()
      const json = await clone.json()
      console.log('Error Response JSON:');
      console.log(JSON.stringify(json, null, 2));
    } catch (err) {
      try {
        const text = await res.clone().text()
        console.log('Error Response Text:', text);
      } catch (readErr) {
        console.log('Failed to read response body.');
      }
    }
    console.log('=============================================\n');
  }
  
  return res
}
