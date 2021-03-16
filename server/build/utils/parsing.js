"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBookBase = exports.parseBook = void 0;

var parseBook = function parseBook(_ref) {
  var _volumeInfo$imageLink;

  var id = _ref.id,
      etag = _ref.etag,
      saleInfo = _ref.saleInfo,
      volumeInfo = _ref.volumeInfo;
  return {
    id: id,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    coverPhoto: (volumeInfo === null || volumeInfo === void 0 ? void 0 : (_volumeInfo$imageLink = volumeInfo.imageLinks) === null || _volumeInfo$imageLink === void 0 ? void 0 : _volumeInfo$imageLink.thumbnail) || '',
    language: volumeInfo.language,
    averageRating: volumeInfo.averageRating,
    etag: etag,
    publisher: volumeInfo.publisher,
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    pageCount: volumeInfo.pageCount,
    printType: volumeInfo.pageCount,
    mainCategory: volumeInfo.mainCategory,
    categories: volumeInfo.categories,
    ratingsCount: volumeInfo.ratingsCount,
    images: volumeInfo.imageLinks,
    isEbook: saleInfo.isEbook,
    listPrice: saleInfo.listPrice
  };
};

exports.parseBook = parseBook;

var parseBookBase = function parseBookBase(_ref2) {
  var _volumeInfo$imageLink2;

  var id = _ref2.id,
      volumeInfo = _ref2.volumeInfo;
  return {
    id: id,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    coverPhoto: (volumeInfo === null || volumeInfo === void 0 ? void 0 : (_volumeInfo$imageLink2 = volumeInfo.imageLinks) === null || _volumeInfo$imageLink2 === void 0 ? void 0 : _volumeInfo$imageLink2.thumbnail) || '',
    language: volumeInfo.language,
    averageRating: volumeInfo.averageRating
  };
};

exports.parseBookBase = parseBookBase;