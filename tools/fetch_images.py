#!/usr/bin/env python3
"""Fetch relevant food photos from Wikimedia Commons and save them locally.

Usage: python3 tools/fetch_images.py
Images are written to images/<slug>.jpg
"""
import json
import os
import ssl
import time
import urllib.parse
import urllib.request

try:
    import certifi
    SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except Exception:
    SSL_CTX = ssl._create_unverified_context()

UA = "TwoSpoonsBakerySite/1.0 (educational demo; contact: whatspoppin@twospoons.example)"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "images")
API = "https://commons.wikimedia.org/w/api.php"

# slug -> list of search queries (tried in order until one yields a valid image)
ITEMS = {
    # Featured specials
    "tres-leches": ["tres leches cake", "milk cake dessert", "vanilla sponge cake slice"],
    "white-sauce-pasta": ["white sauce pasta", "penne alfredo pasta", "creamy pasta"],
    "gochujang-bun": ["korean cheese bun", "gochujang bread", "stuffed cheese bun"],
    # Savoury
    "korean-cream-cheese-bun": ["korean cheese bun", "cream cheese bun", "stuffed bun"],
    "tandoori-cheese-fries": ["loaded cheese fries", "cheese fries", "poutine fries"],
    "french-fries": ["french fries", "potato fries"],
    "peri-peri-fries": ["seasoned french fries", "spicy fries", "french fries"],
    "mozzarella-buns": ["mozzarella stuffed bread", "cheese pull bun", "cheese bread roll"],
    "stuffed-garlic-bread": ["stuffed garlic bread", "cheese garlic bread", "garlic bread"],
    "chilli-cheese-toast": ["cheese toast", "chilli cheese toast", "cheese on toast"],
    "cheese-balls": ["fried cheese balls", "mozzarella sticks fried", "arancini"],
    "milk-honey-bread": ["milk bread loaf", "honey bread", "sweet bread loaf"],
    "garlic-brioche": ["garlic bread cheese", "brioche bread", "cheese garlic bread"],
    "garlic-rolls": ["garlic rolls bread", "dinner rolls", "bread rolls"],
    "subway-loaf": ["submarine sandwich", "sub sandwich baguette", "baguette sandwich"],
    "kaffir-lime-chicken": ["fried chicken boneless", "korean fried chicken", "chicken bites"],
    # Sweet tooth
    "belgium-brownie": ["chocolate brownie", "fudge brownie"],
    "popcorn-churros": ["churros", "churro dessert"],
    "burnt-cheesecake": ["basque burnt cheesecake", "burnt cheesecake", "cheesecake slice"],
    "brookie": ["chocolate cookie brownie", "brookie dessert", "chocolate chip cookie"],
    "fudge-brownie": ["fudge brownie", "chocolate brownie slice"],
    "brownie-tub": ["brownie chunks", "chocolate brownie pieces", "brownie"],
    "chocochip-cookie": ["chocolate chip cookie", "cookie chocolate"],
    "tiramisu-brownie": ["tiramisu", "tiramisu dessert"],
    "custom-cakes": ["decorated birthday cake", "celebration cake", "layer cake"],
    "almond-stick": ["almond biscotti", "almond pastry", "almond cookie"],
    "lemon-blueberry-cake": ["lemon blueberry cake", "blueberry loaf cake", "lemon cake"],
    # Bakes / gifting
    "dry-fruit-laddu": ["laddu sweet", "dry fruit laddu", "indian sweet laddu"],
    "coconut-cookie": ["coconut cookie", "coconut macaroon"],
    "walnut-cookie": ["walnut cookie", "date cookie", "oatmeal cookie"],
    "carrot-halwa": ["gajar halwa carrot", "carrot halwa", "indian carrot dessert"],
    "nutella-bomboloni": ["bomboloni doughnut", "filled doughnut", "chocolate doughnut"],
    "cranberry-pistachio-stick": ["pistachio biscotti", "cranberry cookie", "pistachio cookie"],
    "paneer": ["paneer cheese", "cottage cheese block", "fresh cheese block"],
    # Site imagery
    "hero": ["assorted pastries bakery display", "bakery pastries", "dessert table"],
    "story": ["baker kneading dough bakery", "artisan bakery bread", "baking pastry"],
}


def search_thumb(query, width=1000):
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"{query} filetype:bitmap",
        "gsrnamespace": "6",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|mime|size",
        "iiurlwidth": str(width),
        "format": "json",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20, context=SSL_CTX) as r:
        data = json.load(r)
    pages = data.get("query", {}).get("pages", {})
    # sort by search index if available
    cands = sorted(pages.values(), key=lambda p: p.get("index", 999))
    for p in cands:
        ii = p.get("imageinfo")
        if not ii:
            continue
        info = ii[0]
        mime = info.get("mime", "")
        if "image" not in mime or "svg" in mime:
            continue
        thumb = info.get("thumburl")
        if thumb:
            return thumb
    return None


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30, context=SSL_CTX) as r:
        data = r.read()
    if len(data) < 4000:
        raise ValueError("file too small")
    with open(path, "wb") as f:
        f.write(data)
    return len(data)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    results = {}
    for slug, queries in ITEMS.items():
        out = os.path.join(OUT_DIR, f"{slug}.jpg")
        got = False
        for q in queries:
            try:
                thumb = search_thumb(q)
                if not thumb:
                    continue
                size = download(thumb, out)
                print(f"OK   {slug:28s} <- '{q}'  ({size//1024} KB)")
                results[slug] = q
                got = True
                break
            except Exception as e:
                print(f"..   {slug:28s} '{q}' failed: {e}")
            time.sleep(0.3)
        if not got:
            print(f"MISS {slug:28s} (no image found)")
        time.sleep(0.2)
    print(f"\nDone. {len(results)}/{len(ITEMS)} images fetched.")


if __name__ == "__main__":
    main()
