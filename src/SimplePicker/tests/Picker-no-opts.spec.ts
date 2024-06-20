/* eslint-disable prefer-destructuring */

import { pickerNumbers1, pickerNumbersData1, pickerStrings1, pickerStringsData1, resetData } from "./fixtures";

beforeEach(() => {
  resetData();
} );

it("picked numbers are within initial data array", () => {
  const picker = pickerNumbers1();
  const picked = picker.pick(100);

  picked.forEach((a) => {
    expect(pickerNumbersData1).toContain(a);
  } );
} );

it("picker length matches data array length", () => {
  const picker = pickerNumbers1();

  expect(picker.length).toBe(picker.data.length);
} );

it("on trying to pick more items than existing in the picker, picked elements length should be greater than data array length", () => {
  const picker = pickerNumbers1();
  const picked = picker.pick(30);

  expect(picked.length).toBeGreaterThan(picker.data.length);
} );

describe("put", ()=>{
  it("should add an element", () => {
    const picker = pickerNumbers1();

    picker.put(7);
    expect(picker.length).toBe(7);
    expect(picker.data.at(-1)).toBe(7);

    // Should mutate the original data
    expect(pickerNumbersData1.length).toBe(7);
  } );

  it("picker should not re-add an existing element", () => {
    const picker = pickerStrings1();
    const initial = picker.data[0];

    picker.put(initial);
    expect(picker.length).toBe(2);
    const current = picker.data[0];

    expect(current).toBe(initial);
  } );
} );

describe("remove item tests", () => {
  it("successfully removes existing item", () => {
    const picker = pickerStrings1();

    expect(picker.data.includes("A")).toBeTruthy();
    const ret = picker.remove("A");

    expect(ret).toBe("A");
    expect(picker.data.includes("A")).toBeFalsy();

    // Should mutate the original data
    expect(pickerStringsData1.includes("A")).toBeFalsy();
  } );

  it("returns undefined when trying to remove non-existing item", () => {
    const picker = pickerStrings1();

    expect(picker.data.includes("C")).toBeFalsy();
    const ret = picker.remove("C");

    expect(ret).toBeUndefined();
  } );

  it("picker should be cleared", () => {
    const picker = pickerNumbers1();

    picker.clear();
    expect(picker.length).toBe(0);

    // Should mutate the original data
    expect(pickerNumbersData1.length).toBe(0);
  } );
} );

it("custom onAfterpick", () => {
  const picker = pickerNumbers1();
  let counter = 0;

  picker.onAfterPick = () => {
    counter++;
  };

  picker.pick(123);
  expect(counter).toBe(123);
} );

it("pick if picker is empty", () => {
  const picker = pickerNumbers1();

  picker.clear();
  const ret = picker.pick();

  expect(ret).toEqual([]);
} );

it("pickOne if picker is empty", () => {
  const picker = pickerNumbers1();

  picker.clear();

  const ret = picker.pickOne();

  expect(ret).toBeUndefined();
} );

it("pick if picker has only one item", () => {
  const picker = pickerNumbers1();

  picker.data.splice(1);

  expect(picker.length).toBe(1);
  const ret = picker.pick();

  expect(ret).toBeDefined();
} );
