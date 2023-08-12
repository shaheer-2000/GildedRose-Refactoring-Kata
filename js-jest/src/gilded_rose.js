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
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === itemsNamesConstants.SULFURAS) continue;
      if (
        this.items[i].name != itemsNamesConstants.AGED_BRIE &&
        this.items[i].name != itemsNamesConstants.BACKSTAGE_PASSES
      ) {
        this.decreamentQualityBy(this.items[i], 1);
      } else {
        this.increamentQualityBy(this.items[i], 1);
        if (this.items[i].name == itemsNamesConstants.BACKSTAGE_PASSES) {
          if (this.items[i].sellIn < 11) {
            this.increamentQualityBy(this.items[i], 1);
          }
          if (this.items[i].sellIn < 6) {
            this.increamentQualityBy(this.items[i], 1);
          }
        }
      }
      this.items[i].sellIn = this.items[i].sellIn - 1;
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != itemsNamesConstants.AGED_BRIE) {
          if (this.items[i].name != itemsNamesConstants.BACKSTAGE_PASSES) {
            this.decreamentQualityBy(this.items[i], 1);
          } else {
            this.decreamentQualityBy(this.items[i], this.items[i].quality);
          }
        } else {
          this.increamentQualityBy(this.items[i], 1);
        }
      }
    }

    return this.items;
  }

  increamentQualityBy(item, multiplier) {
    if (item.quality >= 50) return;
    item.quality += multiplier;
  }

  decreamentQualityBy(item, multiplier) {
    if (item.quality <= 0) return;
    item.quality -= multiplier;
  }
}

module.exports = {
  Item,
  Shop,
};
