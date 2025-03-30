const axios = require('axios');

const panchang = {

 getPanchang : async (req, res) => {
  console.log("called");
  const { day, month, year,hour,min } = req.body;

  const data = {
    day: day || new Date().getDate(),
    month: month || new Date().getMonth() + 1,
    year: year || new Date().getFullYear(),
    hour: hour || new Date().getHours(),
    min: min || new Date().getMinutes(),
    lat: 19.132, 
    lon: 72.342, 
    tzone: 5.5,  
  };

  const userId = process.env.ASTROLOGY_API_USER_ID;
  const apiKey = process.env.ASTROLOGY_API_KEY;
  const auth = "Basic " + Buffer.from(`${userId}:${apiKey}`).toString("base64");

  try {
    const response = await axios.post(
      'https://json.astrologyapi.com/v1/advanced_panchang',
      data, 
      {
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract only the required fields from the response
    const panchangData = {
      day: response.data.day,
      sunrise: response.data.sunrise,
      sunset: response.data.sunset,
      moonrise: response.data.moonrise,
      moonset: response.data.moonset,
      vedic_sunrise: response.data.vedic_sunrise,
      vedic_sunset: response.data.vedic_sunset,
      tithi_name: response.data.tithi.details.tithi_name,
      nak_name: response.data.nakshatra.details.nak_name,
      yog_name: response.data.yog.details.yog_name,
      purnimanta: response.data.hindu_maah.purnimanta,
      paksha: response.data.paksha,
      ritu: response.data.ritu,
      sun_sign: response.data.sun_sign,
      moon_sign: response.data.moon_sign,
    };

    console.log(panchangData);
    res.status(200).json(panchangData); 
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch Panchang data' });
  }
},


}


module.exports = panchang;
