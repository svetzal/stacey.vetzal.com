cd ../blog-content
git commit -am "updates"
git push
cd ../stacey.vetzal.com
git submodule update --remote --recursive
git commit -am "updates"
git push
