mkdir -p dst
pug src/index.pug --pretty --out dst
# pug src/call-for-papers.pug --pretty --out dst
cp -R src/downloads dst/downloads
