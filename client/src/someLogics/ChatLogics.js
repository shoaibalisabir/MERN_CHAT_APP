export const getSender = (user, allUsers) => {
  //   console.log("User:", user, "allUsers:", allUsers);
  return allUsers[0]._id === user._id
    ? allUsers[1].firstName
    : allUsers[0].firstName;
};
