const endpoints = {
  getDevices: {
    url: 'api/v1/devices',
    method: 'GET',
    token: true,
    cache: 0,
  },
  getBrands: {
    url: 'api/v1/ir/brands',
    method: 'GET',
    token: true,
    cache: 0,
  },
  getWeather: {
    url: 'api/v1/locations/${locationId}/weather_forecast',
    method: 'GET',
    token: true,
    cache: 1 * 60 * 1000, // 1 minute
  },
}

export default endpoints
