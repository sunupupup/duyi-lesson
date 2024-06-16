Mock.mock('cart', 'get', {
  code: 0,
  msg: '',
  'data|5-10': [
    {
      productName: '@csentence',
      productUrl: '@image(100x150, #008080, #fff, testimage)',
      'unitPrice|10-200.2': 0,
      'count|1-10': 0,
    },
  ],
});
