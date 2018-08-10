/* eslint-disable import/no-unresolved */
const { Provider } = require('../../providers/models');

const data = {
  name: 'Christian',
  lastname: 'Barrios',
  status: 'Active',
  email: 'christiandbf@hotmail.com',
  city: 'Cartagena',
  address: 'Urb. Villa',
  specialty: '5a1ee5e6d0e8cfb9049a7904',
  document: '123456789',
};

describe('Provider model', () => {
  it('Validate provider', () => {
    const provider = new Provider(data);
    expect(provider.validateSync()).toBeFalsy();
  });
});
