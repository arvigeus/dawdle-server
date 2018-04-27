import Fuse from "fuse.js";

const options = {
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

export default (list, text, keys) => {
  var fuse = new Fuse(list, { ...options, keys });
  return fuse.search(text);
};