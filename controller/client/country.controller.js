const countryData = require("../../model/country.model");
const stateCity = require("../../model/stateCities.model");

exports.getCountry = async (req, res) => {
  try {
    const data = await countryData?.find();

    return res.status(201).json({
      message: "Get All Country Data",
      status: 201,
      data: data,
      Success: 1,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      Success: 0,
    });
  }
};
exports.getStateCities = async (req, res) => {
  try {
    const data = await stateCity?.find().select("-__v");

    return res.status(201).json({
      message: "Get All State Cities Data",
      status: 201,
      data: data,
      Success: 1,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      status: 400,
      Success: 0,
    });
  }
};
