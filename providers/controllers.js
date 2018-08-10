/* eslint-disable consistent-return */
const { Provider } = require('./models');
const messages = require('./messages');

const getProviders = (req, res) => {
  const { id } = req.query;
  const populate = Boolean(req.query.populate === 'true');

  if (!id) {
    // Search all providers
    Provider.find().populate(populate ? 'specialty' : '')
      .then((data) => {
        // If there are not providers returns null
        if (!data) return res.status(404).json([]);
        if (data) return res.status(200).json(data);
      })
      .catch(err => res.status(500).json({ message: err.message }));
  } else {
    // ID is not valid
    if (id.length !== 24) return res.status(400).json(messages.ID_NOT_VALID);

    // Search provider by ID
    Provider.findById(id).populate(populate ? 'specialty' : '')
      .then((data) => {
        // If there is not provider with ID returns null
        if (!data) return res.status(404).json({});
        if (data) return res.status(200).json(data);
      })
      .catch(err => res.status(500).json({ message: err.message }));
  }
};

const deleteProvider = (req, res) => {
  const { id } = req.query;

  // ID is not provided
  if (!id) return res.status(400).json(messages.ID_NOT_PROVIDED);
  // ID is not valid
  if (id.length !== 24) return res.status(400).json(messages.ID_NOT_VALID);

  // Remove by ID
  Provider.findByIdAndRemove(id)
    .then((data) => {
      // If there is not provider with ID returns null
      if (!data) return res.status(404).json({});
      if (data) return res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const createProvider = (req, res) => {
  const provider = new Provider(req.body);
  const errValidation = provider.validateSync();

  // Body is incorrect
  if (errValidation) return res.status(400).json({ message: errValidation.message });

  // Save provider
  provider.save()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err.message }));
};

const updateProvider = (req, res) => {
  const { id } = req.query;

  // ID is not provided
  if (!id) return res.status(400).json(messages.ID_NOT_PROVIDED);
  // ID is not valid
  if (id.length !== 24) return res.status(400).json(messages.ID_NOT_VALID);

  Provider.findByIdAndUpdate(id, req.body, { runValidators: true })
    .then((data) => {
      // If there is not provider with ID returns null
      if (!data) return res.status(404).json({});
      if (data) return res.status(200).json(data);
    })
    .catch((err) => {
      // Check if it is a validation error or a server error
      if (err.message.includes('Validation')) return res.status(400).json({ message: err.message });
      return res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
};
