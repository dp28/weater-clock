const { convertToColour } = require("./colour");

describe("convertToColour", () => {
  it("maps 'snow' to #FFFFFF", () => {
    expect(convertToColour("snow")).toEqual("#FFFFFF");
  });

  it("maps 'rain' to #0288D1", () => {
    expect(convertToColour("rain")).toEqual("#0288D1");
  });

  it("maps 'clear' to #FDD835", () => {
    expect(convertToColour("clear")).toEqual("#FDD835");
  });

  it("maps 'cloudy' to #9E9E9E", () => {
    expect(convertToColour("cloudy")).toEqual("#9E9E9E");
  });

  it("maps 'hot' to #FF8A65", () => {
    expect(convertToColour("hot")).toEqual("#FF8A65");
  });

  it("maps 'cold' to #4DD0E1", () => {
    expect(convertToColour("cold")).toEqual("#4DD0E1");
  });
});
