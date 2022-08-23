import { writable } from "svelte/store"
import * as chromeStorage from "@/chromestorage"

export const settings = writable({
  theme: "Blue-Grey",
  darkColors: true,
  cardWidth: 11,
  cardMargin: 0.3,
  colCount: 4,
  fitWidth: false,
  iconSize: 1.6,
  hideText: false,
  reorderMode: true,
})
chromeStorage.storeSync("settings", settings)

export const links = writable([
  {
    id: Date.now(),
    name: "This is a guide box. You can delete this and add new ones.",
    link: "http://google.com",
  },
])
chromeStorage.storeSync("links", links)
