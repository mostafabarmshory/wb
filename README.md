# خانه

[![pipeline status](https://gitlab.com/angular-material-home/apps/my-home/badges/master/pipeline.svg)](https://gitlab.com/angular-material-home/apps/my-home/commits/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0999a1de78ca4a7f8c26386087693936)](https://www.codacy.com/app/amh-apps/my-home?utm_source=gitlab.com&amp;utm_medium=referral&amp;utm_content=angular-material-home/apps/my-home&amp;utm_campaign=Badge_Grade)

توی تمام نرم افزارها، کاربردهای مشترکی وجود داره، مثل چند زبانی، ورود کاربر، ثبت نام، تنظیم‌های برند و ... . تمام این کاربردهای مشتری توی این بسته جمع شده که به سادگی بتونیم یه نرم افزار جدید رو با کمترین هزینه ایجاد کنیم.


## وابستگی‌ها

کاربردهایی که در این بسته در نظر گرفته شده، به صورت یک لایه مجازی ارائه شده، در صورتی که از این بسته استفاده می‌کنید و یا آن را توسعه می‌دهید، از همین لایه‌های مجازی استفاده کنید. استفاده مستقیم از سایر بسته ها و وابستگی‌هایی که در این پروژه تعریف شده، هزینه انتقال نرم‌افزارهای شما را افزایش خواهد داد.

وابستگی‌های اصلی

- angular
- angular-material
- angular-pluf
- angular-weburger

سایر وابستگی‌ها

- angular-cookies
- angular-sanitize
- angular-route
- ng-appcache
- ngstorage

## نصب

### دستی

برای نصب دستی بسته را دانلود کنید و فایل‌های موجود در مسیر dist را در پروژه خود قرار دهید.

### bower

برای نصب این بسته با استفاده از bower دستور زیر رو در خط فرمان وارد کنید. این دستور باید در مسیر پروژه اجرا شود:

	bower install --save angular-material-home

### Yeoman

سازنده pluf در yeoman‌ قادر است پروژه‌ جدیدی بر اساس ساختارهای معرفی شده در این بسته ایجاد کند. برای ایجاد یک پروژه جدید ابتدا یک پوشه (هم نام با پروژه) ایجاد کنید و در مسیر این پوشه دستور زیر را وارد کنید:

	yo pluf:material-home

## توصعه

ابزارهایی که برای توسعه این بسته در نظر گرفته شده، در این بخش تشریح شده است.

### ابزارها

پیش از شروع فرآیند توسعه باید ابزارهای زیر را نصب کنید:

- nodejs
- npm
- grunt-cli
- bower


### آماده سازی

کد پروژه رو با دستور زیر بگیرید:

	git clone https://gitlab.com/pluf-spa/angular-material-home.git
	
برای آماده شدن محیط توسعه دستورهای زیر را در مسیر پروژه اجرا کنید:

	npm install
	bower install

اجرای این دستورها ممکن است زمان بر باشد و به اینترنت نیاز دارد. در صورتی که قبلا از این دستورها استفاده کرده‌اید، بسته‌های مشترک کش می‌شوند و دوباره دانلود نخواهند شد.

### اجرا نمونه

برای اجرای برنامه نمونه دستور زیر را درمسیر پروژه اجرا کنید:

	grunt demo

با این دستور یک سرور محلی اجرا شده و نمونه به صورت خودکار در کروم باز خواهد شد.