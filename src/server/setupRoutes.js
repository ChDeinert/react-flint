module.exports = ({ router, getTemplate }) => {
  router.get('*', (req, res) => {
    res.send(getTemplate())
  });

  return router;
};
