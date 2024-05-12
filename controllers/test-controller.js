const testUserCotrollers = (req, res) => {
  try {
    res.status(200).send({
      sucess: true,
      message: "test user data",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { testUserCotrollers };
