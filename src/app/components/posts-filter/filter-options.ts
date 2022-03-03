export class FilterOptions {
  usersNameQuery?: string; // Represents user filtering by part of user's full name.

  constructor(init?: Partial<FilterOptions>) {
    this.usersNameQuery = '';

    if (init) {
      Object.assign(this, init);
    }
  }
}