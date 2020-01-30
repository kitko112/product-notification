import axios from 'axios';

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15';

export const httpGet = async (url: string): Promise<string> => {
    const content = await axios.get(url, {
      headers: { "User-Agent": userAgent }
    });
    if (content.status) {
      return content.data;
    }

    return "";
  }