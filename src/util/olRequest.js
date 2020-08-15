const getUrl = (path) => `/api/${path}`;

const olRequest = async (
  path,
  accessToken,
  method = 'GET',
  body = {},
) => {
  const url = getUrl(path);
  const headers = { Authorization: `Bearer: ${accessToken}` };
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
  throw Error(`Unsupported method: ${method}`);
};

export default olRequest;
