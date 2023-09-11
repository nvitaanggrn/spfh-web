export default (callback, fallback = console.error) => ((...args) => {
  try {
    callback(...args);
  } catch (e) {
    fallback(e);
  }
});