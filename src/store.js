export default (app) => {
  const store = {
    user: null,
    status: null
  };
  app.config.globalProperties.$store = store
  Object.defineProperty(app.config.globalProperties, '$store', {
    enumerable: true,
    get: () => store
  })
}