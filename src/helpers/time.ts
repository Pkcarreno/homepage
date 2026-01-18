import {
  type CollectionEntry,
  type CollectionKey,
  getCollection,
} from "astro:content";
import timestampsRaw from "../content/timestamps.json";

export const getFormattedDate = (date: Date | string) => {
  if (date instanceof Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}.${month}.${day}`;
  }

  return String(date);
};

interface TimestampData {
  created: string;
  updated: string;
}

const timestamps = timestampsRaw as Record<string, TimestampData | undefined>;

const EXTENSION_REGEX = /\.[^/.]+$/;

export type EntryWithDates<C extends CollectionKey> = Omit<
  CollectionEntry<C>,
  "data"
> & {
  data: CollectionEntry<C>["data"] & {
    created: Date;
    updated: Date;
  };
};

export function getPageDates(pagePath: string) {
  const keyFromPageDir = pagePath.startsWith("/")
    ? pagePath.slice(1)
    : pagePath;
  const key = `src/pages/${keyFromPageDir}`;
  return {
    created: timestamps[key] ? new Date(timestamps[key].created) : new Date(),
    updated: timestamps[key] ? new Date(timestamps[key].updated) : new Date(),
  };
}

export function withDates<C extends CollectionKey>(
  entry: CollectionEntry<C>,
): EntryWithDates<C> {
  const folder = entry.collection;
  const id = entry.id;
  const basePath = `src/content/${folder}/${id}`.replace(EXTENSION_REGEX, "");

  const meta = timestamps[basePath]
    ? timestamps[basePath]
    : {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };

  return {
    ...entry,
    data: {
      ...entry.data,
      created: new Date(meta.created),
      updated: new Date(meta.updated),
    },
  };
}

export async function getCollectionWithDates<C extends CollectionKey>(
  key: C,
): Promise<EntryWithDates<C>[]> {
  const entries = await getCollection(key);

  return entries.map(withDates);
}
