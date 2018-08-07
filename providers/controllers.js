/* eslint-disable consistent-return */
const Provider = require('./model');

const getProviders = (req, res) => {
  const { id } = req.query;
  if (!id) {
    Provider.find()
      .then((data) => {
        if (!data) res.status(404).json({ message: 'There are not providers' });
        if (data) res.status(200).json(data);
      })
      .catch(err => res.status(400).json({ message: err.message }));
  } else {
    Provider.findById(id)
      .then((data) => {
        if (!data) res.status(404).json({ message: `There is not provider with ID: ${id}` });
        if (data) res.status(200).json(data);
      })
      .catch(err => res.status(400).json({ message: err.message }));
  }
};

const createProvider = (req, res) => {
  const now = Date.now();
  const dataToSave = { ...req.body, createdAt: now, updatedAt: now };
  const provider = new Provider(dataToSave);
  provider.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ message: err.message }));
};

const updateProvider = (req, res) => {
  const { id } = req.query;
  const { createdAt } = req.body;
  if (!id) return res.status(400).json({ message: 'You have to provide an ID' });
  if (createdAt) return res.status(400).json({ message: 'Do not do this -_-' });
  const now = Date.now();
  Provider.findByIdAndUpdate(id, { ...req.body, updatedAt: now })
    .then((data) => {
      if (!data) res.status(400).json({ message: `There is not provider with ID ${id}` });
      if (data) res.status(200).json(data);
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

const deleteProvider = (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'You have to provide an ID' });
  Provider.findByIdAndRemove(id)
    .then((data) => {
      if (!data) res.status(404).json({ message: `There is not provider with ID: ${id}` });
      if (data) res.status(200).json(data);
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

module.exports = {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
};
