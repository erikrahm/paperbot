import { GoogleVolume } from '../../types';

export const parseBook = ({id, etag, saleInfo, volumeInfo}: GoogleVolume) => ({
  id: id,
  title: volumeInfo.title,
  authors: volumeInfo.authors,
  coverPhoto: volumeInfo?.imageLinks?.thumbnail || '',
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
  listPrice: saleInfo.listPrice,
})

export const parseBookBase = ({id, volumeInfo}: GoogleVolume) => ({
  id: id,
  title: volumeInfo.title,
  authors: volumeInfo.authors,
  coverPhoto: volumeInfo?.imageLinks?.thumbnail || '',
  language: volumeInfo.language,
  averageRating: volumeInfo.averageRating,
})