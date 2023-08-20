.PHONY: serve-api-gateway serve-auth serve-cart serve-category serve-frontend serve-frontend-admin serve-midtrans serve-order serve-product serve-rajaongkir serve-role serve-sliders serve-user

serve-api-gateway:
	npx nx serve api-gateway

serve-auth:
	npx nx serve auth

serve-cart:
	npx nx serve cart

serve-category:
	npx nx serve category

serve-frontend:
	npx nx serve frontend

serve-frontend-admin:
	npx nx serve frontend-admin

serve-midtrans:
	npx nx serve midtrans

serve-order:
	npx nx serve order

serve-product:
	npx nx serve product

serve-rajaongkir:
	npx nx serve rajaongkir

serve-role:
	npx nx serve role

serve-sliders:
	npx nx serve sliders

serve-user:
	npx nx serve user

run-many: serve-api-gateway serve-auth serve-cart serve-category serve-frontend serve-frontend-admin serve-midtrans serve-order serve-product serve-rajaongkir serve-role serve-sliders serve-user
