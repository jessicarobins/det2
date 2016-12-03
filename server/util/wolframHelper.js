import wajs from 'wajs';

export const WA_APP_ID = 'G6UJXE-UG88XXUYPK'//process.env.WA_APP_ID;

export const waClient = new wajs(WA_APP_ID);

export const QUERY_OPTIONS = {
  format: 'plaintext',
  podState: '100@More',
  ignoreCase: true,
  includePodId: ['Result']
};

export const formatQuery = (query) => query //`list of ${query}`;

export const formatResponse = (response) => {
  if (!response.pods()[0]){
    console.log('no results? ', response)
    return false;
  }
  let queryString = response.pods()[0].subpod[0].plaintext[0];
  console.log('querystring', queryString)
  const totalIndex = queryString.indexOf('(total:');
  if (totalIndex > -1) {
    queryString = queryString.substring(0, totalIndex);
  }
  queryString = queryString.trim();
  const resultArray = queryString.split('  |  ');
  return resultArray;
}