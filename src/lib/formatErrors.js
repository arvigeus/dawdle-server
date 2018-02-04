export default (e, models) =>
  e instanceof models.sequelize.ValidationError
    ? e.errors.map(({ path, message }) => ({ path, message }))
    : [{ path: "name", message: e.message }];
