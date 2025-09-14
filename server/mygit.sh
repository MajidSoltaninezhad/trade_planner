#!/bin/bash

# اگر پیامی داده نشده بود، پیش‌فرض "Update"
MSG=${1:-"Update"}

git add .
git commit -m "$MSG"
git push origin main
