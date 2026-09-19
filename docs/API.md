# API Documentation

## Nager.Date API

Endpoint: `https://nagerholidays.com/api/v3/publicholidays/{year}/{countryCode}`

Returns JSON array of holiday objects:
- `date`: ISO 8601 date string
- `localName`: Local language name
- `name`: English name
- `countryCode`: ISO 3166-1 alpha-2
- `fixed`: Whether date is fixed
- `global`: Whether holiday is nationwide
- `counties`: Subdivision codes
- `types`: Array of holiday types
