const formFields = {
  week_time: {
    required: true,
    title: 'Cafe week time',
    day: {
      type: String,
      required: true,
      // default: 0,
      title: 'Day',
      options: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    },
    is_open: {
      type: Boolean,
      default: false,
      title: 'Is open'
    },
    opening_time: { type: String, default: '', title: 'Opening time' },
    closing_time: { type: String, default: '', title: 'Closing time' }
  },
  cafe_timezone: {
    required: true,
    type: String,
    default: '',
    title: 'Cafe timezone'
  },
  location: {
    required: true,
    lat: { type: Number, default: null, title: 'Latitude' },
    lon: { type: Number, default: null, title: 'Longitude' }
  },
  name: {
    required: true,
    type: String,
    default: '',
    title: 'Cafe name',
    maxLength: 255,
    minLength: 1
  },
  description: {
    type: String,
    default: '',
    title: 'Description cafe',
    minLength: 1
  },
  call_center: {
    type: String,
    default: '',
    title: 'Phone',
    maxLength: 50,
    minLength: 1
  },
  website: {
    type: String,
    default: '',
    title: 'Website',
    maxLength: 250
  },
  status: {
    type: Number,
    // default: 0,
    title: 'Status',
    options: [
      { label: 'Inactive', value: 0 },
      { label: 'Active', value: 1 },
      { label: 'Unknown', value: 2 }
    ]
  },
  country: {
    type: String,
    default: '',
    title: 'Country',
    maxLength: 50
  },
  city: {
    type: String,
    default: '',
    title: 'City',
    maxLength: 220
  },
  state: {
    type: String,
    default: '',
    title: 'State',
    maxLength: 250
  },
  postal_code: {
    type: String,
    default: '',
    title: 'Postal code',
    maxLength: 12
  },
  address: {
    type: String,
    default: '',
    title: 'Address 1'
  },
  second_address: {
    type: String,
    default: '',
    title: 'Address 2'
  },
  tax_rate: {
    type: Number,
    // default: '',
    title: 'Tax rate'
  },
  delivery_available: {
    type: Boolean,
    // default: '',
    title: 'Delivery available'
  },
  delivery_max_distance: {
    type: Number,
    // default: '',
    title: 'Delivery max distance',
    max: 2147483647,
    min: -2147483648
  },
  delivery_min_distance: {
    type: Number,
    // default: '',
    title: 'Delivery min distance',
    max: 2147483647,
    min: -2147483648
  },
  delivery_fee: {
    type: Number,
    // default: '',
    title: 'Delivery fee'
  },
  delivery_percent: {
    type: Number,
    // default: '',
    title: 'Delivery percent'
  },
  delivery_km_amount: {
    type: Number,
    // default: '',
    title: 'Delivery km amount'
  },
  delivery_min_time: {
    type: Number,
    // default: '',
    title: 'Delivery min time',
    max: 2147483647,
    min: -2147483648
  },
  version: {
    type: Number,
    // default: '',
    title: 'Version',
    max: 2147483647,
    min: 0
  },
  order_limit: {
    type: Number,
    // default: '',
    title: 'Order limit per window',
    max: 2147483647,
    min: -2147483648
  },
  order_time_limit: {
    type: Number,
    // default: '',
    title: 'Order limit window',
    max: 2147483647,
    min: -2147483648
  },
  is_use_square: {
    type: Boolean,
    // default: '',
    title: 'Is use square'
  },
  square_location_id: {
    type: Boolean,
    default: '',
    title: 'Square location id',
    maxLength: 50
  },
  company: {
    type: Number,
    title: 'Company'
  },
  menu: {
    type: Number,
    title: 'Menu'
  }
};

export default formFields;
