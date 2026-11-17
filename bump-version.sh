#!/bin/sh
# Run before every push: stamps a new version into all pages so browsers
# fetch fresh CSS/JS and open tabs reload themselves to the latest version.
V=$(date -u +%Y%m%d%H%M%S)
for f in *.html; do
  sed -i -E \
    -e "s#href=\"style\.css(\?v=[0-9]+)?\"#href=\"style.css?v=$V\"#" \
    -e "s#src=\"script\.js(\?v=[0-9]+)?\"#src=\"script.js?v=$V\"#" \
    -e "s#<meta name=\"site-version\" content=\"[0-9]*\">#<meta name=\"site-version\" content=\"$V\">#" \
    "$f"
  grep -q 'name="site-version"' "$f" || sed -i "s#<meta charset=\"UTF-8\">#<meta charset=\"UTF-8\">\n  <meta name=\"site-version\" content=\"$V\">\n  <meta http-equiv=\"Cache-Control\" content=\"no-cache\">#" "$f"
done
echo "version $V"
