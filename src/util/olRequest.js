const getUrl = (path) => `/api/${path}`;

const olRequest = async (
  path,
  tokens,
  method = 'GET',
  body = {},
) => {
  const { accessToken } = tokens;
  const url = getUrl(path);
  const headers = { Authorization: `Bearer: ${accessToken}` };
  try {
    if (method === 'POST') {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      return response.json();
    }
    if (method === 'GET') {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      return response.json();
    }
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error making OL request', e.getError());
    return null;
  }
};

export default olRequest;
