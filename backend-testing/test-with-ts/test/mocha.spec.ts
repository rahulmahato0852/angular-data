import * as assert from "assert";
import { expect, should } from "chai";
import { describe, it } from "mocha";
import { getData } from "../src/controllers/test.controller";
import { Router } from "express";
// import { describe, it } from 'mocha';
should();

describe("just test", () => {
  const a = { name: "Key" };
  const b = { name: "Key" };
  it("is euqal too 5", () => {
    assert.equal(2, "2");
  });
  it("deep equal", () => {
    assert.deepEqual(a, b);
  });
  it("chbhheck true or false", () => {
    assert.ok(1 == 1);
  });
  it("something new ", () => {
    assert.ok(1 == 1);
  });

  it("test-user-function", () => {
    expect(12).to.be.equal(12);
  });
  it("check data", () => {
    const data = getData();
    expect(data).to.be.an("array");
  });

  it("check data", () => {
    const data = getData();
    expect(data).to.be.an("array");
  });
});
