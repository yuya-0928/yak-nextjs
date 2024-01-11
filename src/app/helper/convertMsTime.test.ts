import convertMsTime from "./convertMsTime";

describe("convertMsTime", () => {
  test("ms timeがhh:mm:ssに変換されること", () => {
    expect(convertMsTime(1000)).toBe("00:00:01");
    expect(convertMsTime(10000)).toBe("00:00:10");
    expect(convertMsTime(60000)).toBe("00:01:00");
    expect(convertMsTime(600000)).toBe("00:10:00");
    expect(convertMsTime(3600000)).toBe("01:00:00");
    expect(convertMsTime(36000000)).toBe("10:00:00");
  });
});