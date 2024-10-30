import {Author, Book} from '../features/bookReducer';

const GRAPHQL_URL = 'http://localhost:8080/graphql';
interface BookCreation {
    id: number;
    title: string;
    authorIds: number[];
    publishedDate: string;
    genre: string;
    price: number;
    language: string;
    summary: string;
    totalPages: number;
}

interface BookFilter {
    language?: string | null;
    genre?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    authorName?: string | null;
    publishedAfterYear?: number | null;
}

export const fetchBooks = async (filter?: BookFilter): Promise<Book[]> => {

    const filterString = filter && Object.keys(filter).length > 0
        ? `(filter: { ${Object.entries(filter)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
            .join(', ')} })`
        : '';

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
        findAllBooks${filterString} {
          id
          title
          publishedDate
          genre
          price
          language
          summary
          totalPages
          authors {
            id
            name
        }
        }
      }`,
        }),
    });

    const {data} = await response.json();
    return data.findAllBooks;
};

export const deleteBook = async (id: number): Promise<number> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `mutation($id: Int!) {
                deleteBook(id: $id)
            }`,
            variables: {id: id},
        }),
    });

    const {data} = await response.json();
    return data.deleteBook;
};

export const fetchBookById = async (id: number): Promise<Book> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
        findBookById {
          id
          title
          author
          publishedDate
        }
      }`,
            variables: {id: id},
        }),
    });

    const {data} = await response.json();
    return data.findBookById;
};

export const fetchAuthors = async (): Promise<Author[]> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `{
                findAllAuthors {
                    id
                    name
                    details
                }
            }`
        }),
    });

    const { data } = await response.json();
    return data.findAllAuthors;
};


export const createBook = async (book: Omit<BookCreation, 'id' | 'authors'> & { authorIds: number[] }): Promise<Book> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `mutation(
                $title: String!,
                $authorIds: [Int!]!,
                $publishedDate: String!,
                $genre: String!,
                $price: Float!,
                $language: String!,
                $summary: String!,
                $totalPages: Int!,
            ) {
                createBook(
                    title: $title,
                    authorIds: $authorIds,
                    publishedDate: $publishedDate,
                    genre: $genre,
                    price: $price,
                    language: $language,
                    summary: $summary,
                    totalPages: $totalPages,
                ) {
                    id
                    title
                    authors {
                        id
                        name
                    }
                    publishedDate
                    genre
                    price
                    language
                    summary
                    totalPages
                }
            }`,
            variables: book,
        }),
    });

    const { data } = await response.json();
    return data.createBook;
};

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `mutation(
                $name: String!,
                $details: String!,
            ) {
                createAuthor(
                    name: $name,
                    details: $details
                ) {
                    id
                    name
                    details
                }
            }`,
            variables: author,
        }),
    });

    const { data } = await response.json();
    return data.createAuthor;
};

export const deleteAuthor = async (id: number): Promise<number> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `mutation($id: Int!) {
                deleteAuthor(id: $id)
            }`,
            variables: { id },
        }),
    });

    const { data } = await response.json();
    return data.deleteAuthor;
};
