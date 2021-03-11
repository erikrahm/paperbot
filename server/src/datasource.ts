import { RESTDataSource } from "apollo-datasource-rest";

import { parseBook, parseBookBase } from "./utils/parsing";
import { GoogleVolume } from "../types";

const authorizePath = (path: string, isFirstParam = false) =>
  `${path}${isFirstParam ? "?" : "&"}key=${process.env.GOOGLE_BOOKS_API_KEY}`;

// Extending RESTDataSource to form our own executable API class
export class DataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GOOGLE_BOOKS_API_URL;
  }

  // You can create as many methods as you'd like here for your various REST requests
  async searchBook(searchString: string) {
    const sanatizedSearch = encodeURIComponent(searchString);
    // The API requests are triggered using `this` as the class instance followed by the
    // HTTP verb you'd like to use, so in this example it's a GET request
    const result = await this.get(
      authorizePath(
        `/volumes?q=${sanatizedSearch}&maxResults=5&printType=books`
      )
    );

    const authorResult = await this.get(
      authorizePath(
        `/volumes?q=+inauthor:${sanatizedSearch}&maxResults=5&printType=books`
      )
    );

    const bookPartials =
      result.items && result.items.length
        ? result.items.map((item: GoogleVolume) => parseBookBase(item))
        : null;

    // Returning the values we need, or null if the value is not required and return empty
    return bookPartials;
  }

  async getBookByID(id: string) {
    // The API requests are triggered using `this` as the class instance followed by the
    // HTTP verb you'd like to use, so in this example it's a GET request
    const result = await this.get(authorizePath(`/volumes/${id}`, true));

    const book = parseBook(result);

    // Returning the values we need, or null if the value is not required and return empty
    return book;
  }
}
