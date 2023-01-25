build:
	node icon-builder.mjs

publish: build
	vsce publish