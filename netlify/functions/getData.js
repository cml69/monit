const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const store = getStore('sales-data');
    const data = await store.get('allPromoData', { type: 'text' });
    
    if (!data) {
      // Return default data structure if nothing exists
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          palingMurah: [],
          hematMingguIni: [],
          tebusHeboh: []
        })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: data
    };
  } catch (error) {
    console.error('getData error:', error);
    
    // Return default data on error
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        palingMurah: [],
        hematMingguIni: [],
        tebusHeboh: []
      })
    };
  }
};