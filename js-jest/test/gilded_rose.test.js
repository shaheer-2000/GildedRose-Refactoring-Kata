const {Shop, Item} = require("../src/gilded_rose");

// describe("Gilded Rose", function() {
//   it("should foo", function() {
//     const gildedRose = new Shop([new Item("foo", 0, 0)]);
//     const items = gildedRose.updateQuality();
//     expect(items[0].name).toBe("fixme");
//   });
// });

describe("quality should degrade after updateQuality is called", function() {
  it("should degrade quality after calling updateQuality", function() {
    const gildedRose = new Shop([
      new Item("foo", 10, 50),
      new Item("bar", 10, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(49);
    expect(items[1].quality).toBe(9);
  })
});

describe("quality should remain between 0 and 50", function() {
  it("quality should remain between 0 and 50", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 10, 50),
      new Item("foo", 10, 0)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(0);
  })
});

describe("sellIn date should decrease after updateQuality is called", function() {
  it("sellIn date should decrease after updateQuality is called", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 10, 50),
      new Item("foo", 0, 0)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[1].sellIn).toBe(-1);
  })
});

describe("quality should not degrade for legendary items after updateQuality is called", function() {
  it("quality should not degrade after updateQuality is called", function() {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 50)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
});

describe("quality should increase for Aged Brie after updateQuality is called", function() {
  it("quality should increase for Aged Brie after updateQuality is called", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 10, 49),
      new Item("Aged Brie", 10, 50)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
  })
});

// TODO: Describe properly
// TODO: Use constants for these magic strings
describe("Backstage Passes after updateQuality is called", function() {
  it("Backstage passes after updateQuality is called", function() {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47),
    ]);
    const items = gildedRose.updateQuality();
    items.forEach((item) => expect(item.quality).toBe(50));
  })
});

describe("Backstage Passes after updateQuality is called", function() {
  it("Backstage passes after updateQuality is called", function() {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
});
