const { convertToColour, convertHourToColours } = require("./colour");

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

describe("convertHourToColours", () => {
  it("maps 'snow' to 5 #FFFFFF", () => {
    expect(convertHourToColours("snow")).toEqual(Array(5).fill("#FFFFFF"));
  });

  it("maps 'light_snow' to 3 #9E9E9E with two interleaved #FFFFFF", () => {
    expect(convertHourToColours("light_snow")).toEqual([
      "#9E9E9E",
      "#FFFFFF",
      "#9E9E9E",
      "#FFFFFF",
      "#9E9E9E",
    ]);
  });

  it("maps 'rain' to #0288D1", () => {
    expect(convertHourToColours("rain")).toEqual(Array(5).fill("#0288D1"));
  });

  it("maps 'light_rain' to 3 #9E9E9E with two interleaved #0288D1", () => {
    expect(convertHourToColours("light_rain")).toEqual([
      "#9E9E9E",
      "#0288D1",
      "#9E9E9E",
      "#0288D1",
      "#9E9E9E",
    ]);
  });

  it("maps 'clear' to #FDD835", () => {
    expect(convertHourToColours("clear")).toEqual(Array(5).fill("#FDD835"));
  });

  it("maps 'cloudy' to #9E9E9E", () => {
    expect(convertHourToColours("cloudy")).toEqual(Array(5).fill("#9E9E9E"));
  });

  it("maps 'light_clouds' to 3 #9E9E9E with two interleaved #FDD835", () => {
    expect(convertHourToColours("light_clouds")).toEqual([
      "#9E9E9E",
      "#FDD835",
      "#9E9E9E",
      "#FDD835",
      "#9E9E9E",
    ]);
  });
});
