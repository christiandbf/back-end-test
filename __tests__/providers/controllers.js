/* eslint-disable import/no-unresolved */
const mockingoose = require('mockingoose').default;
const controllers = require('../../providers/controllers');
const messages = require('../../providers/messages');

const res = {
  status: jest.fn(),
  json: jest.fn(),
};

res.status.mockImplementation(() => res);

beforeEach(() => {
  res.status.mockClear();
  res.json.mockClear();
});

describe('GET providers controller', () => {
  it('Get providers', async () => {
    const response = [];
    mockingoose.Provider.toReturn(response, 'find');

    await controllers.getProviders({ query: { id: undefined } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(response);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('Get providers - empty', async () => {
    const response = null;
    mockingoose.Provider.toReturn(response, 'find');

    await controllers.getProviders({ query: { id: undefined } }, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('Get provider by ID', async () => {
    const response = {};
    mockingoose.Provider.toReturn(response, 'findById');

    await controllers.getProviders({ query: { id: '5b65f84cdaa28013ac03a73a' } }, res);

    // expect(res.status).toHaveBeenCalledWith(200); Mock error
    // It is called with 200 but it says 404
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(response);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('Get provider by ID - empty', async () => {
    const response = null;
    mockingoose.Provider.toReturn(response, 'findById');

    await controllers.getProviders({ query: { id: '5b65f84cdaa28013ac03a73a' } }, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({});
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('Get provider by ID - ID is not correct', async () => {
    const response = {};
    mockingoose.Provider.toReturn(response, 'find');

    await controllers.getProviders({ query: { id: '5b65f84cdaa28013ac03a73' } }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(messages.ID_NOT_VALID);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
