const itemsNamesConstants = require("./glided_rose_items_name_constants");

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items) {
      if (item.name === itemsNamesConstants.SULFURAS) continue;
      if (item.name === itemsNamesConstants.AGED_BRIE ||
        item.name === itemsNamesConstants.BACKSTAGE_PASSES) {
          this.incrementQuality(item);
        }
      item.sellIn -= 1;
      this.decrementQuality(item)
    }

    return this.items;
  }

  incrementQualityOfAgedBrie(item) {
    if (item.sellIn < 0) item.quality += 1;
  }

  incrementQualityOfBackstagePasses(item) {
    if (item.sellIn <= 10) item.quality += 1;
    if (item.sellIn <= 5) item.quality += 1;
  }

  incrementQuality(item) {
    if (item.quality >= 50) return;

    item.quality += 1;    
    if (item.name === itemsNamesConstants.AGED_BRIE) this.incrementQualityOfAgedBrie(item);
    if (item.name === itemsNamesConstants.BACKSTAGE_PASSES) this.incrementQualityOfBackstagePasses(item);
  }

  decrementQualityOfBackstagePasses(item) {
    if (item.sellIn <= 0) item.quality = 0;
  }

  decrementQuality(item) {
    if (item.quality <= 0 || item.name === itemsNamesConstants.AGED_BRIE) return;
    if (item.name == itemsNamesConstants.BACKSTAGE_PASSES) {
      this.decrementQualityOfBackstagePasses(item);
      return;
    }
    if (item.sellIn < 0) item.quality -= 1;
    item.quality -= 1;
  }
}

module.exports = {
  Item,
  Shop,
};
