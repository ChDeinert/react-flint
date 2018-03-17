module.exports = ({ router, getTemplate }) => {
  router.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.send(getTemplate());
  });

  return router;
};
