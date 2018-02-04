import createResolver from "lib/createResolver";

export default createResolver((parent, args, { user, device }) => {
  if (!user || !user.id || !device || !device.id) {
    throw new Error("Not authenticated");
  }
});
