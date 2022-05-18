{
	// Copy this ENTIRE file into your user-defined snippets. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:

	"Reveal -- Add <div> Container in <name>.component.html": {
		"scope": "html",
		"prefix": "Reveal -- Insert 'div' Container for Dashboard Viewer'",
		"body": [
			"<div #revealView style='height: calc(100vh - 20px); width: 100%; position:relative;'></div>"
		],
		"description": "Add Reveal <div> container"
	},

	"Reveal -- Add Quill.js CSS Link in Index.html": {
		"scope": "html",
		"prefix": "Reveal -- Insert Quill.js CSS Link in Index.html'",
		"body": [
			"  <link href='https://cdn.quilljs.com/1.3.6/quill.snow.css' rel='stylesheet' type='text/css'>"
		],
		"description": "Insert Quill.js CSS link in Index.html"
	},

	"Reveal -- Add JavaScript Dependency Links in Index.html": {
		"scope": "html",
		"prefix": "Reveal -- Insert JavaScript Dependency Links in Index.html'",
		"body": [
			"    <script src='https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js'></script>\n    <script src='https://cdn.quilljs.com/1.3.6/quill.min.js'></script>\n    <script src='https://unpkg.com/dayjs@1.8.21/dayjs.min.js'></script> \n    <script src='assets/reveal/infragistics.reveal.js'></script>"
		],
		"description": "Insert JavaScript Dependency Links in Index.html"
	},

	"Reveal -- Insert @ViewChild / revealView": {
		"scope": "typescript",
		"prefix": "reveal viewChild",
		"body": [
			"@ViewChild('revealView') el!: ElementRef;",
			"private revealView: any;",
		],
		"description": "Insert @ViewChild / revealView"
	},


	"Reveal -- Insert $ for jQuery Selector": {
		"scope": "typescript",
		"prefix": "reveal $ Any",
		"body": [
			"declare let $: any;",
		],
		"description": "Insert $ for jQuery Selector"
	},


	 "Reveal -- ngAfterViewInit Code Block - Insert RevealView": {
	 	"scope": "typescript",
	 	"prefix": "reveal RevealView",
	 	"body": [

			"ngAfterViewInit(): void {",
			"    $.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');",
			 "    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {",
			"        $.ig.RVDashboard.loadDashboard('Sales', (dashboard: any) => {",
			"        this.revealView = new $.ig.RevealView(this.el.nativeElement);",
			"        this.revealView.dashboard = dashboard;",
			"    });",		
			  "  });",			
		  "}"

	 	],
	 	"description": "ngAfterViewInit Code Block - Insert RevealView"
	 },


	 "Reveal HTML -- Add <div> Container in index.html": {
		"scope": "html",
		"prefix": "Reveal HTML - Insert 'div' Container for Dashboard Viewer'",
		"body": [
			"<div id='revealView' style='height: calc(100vh - 20px); width: 100%; position:relative;'></div>"
		],
		"description": "Add Reveal <div> container"
	},


	 "Reveal HTML JS - Insert RevealView": {
		"scope": "html",
		"prefix": "Reveal HTML - JavaScript Load Server URL, Render Dashboard",
		"body": [
			"<script type='text/javascript'>",
			"//set this to your server url",
			"$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');",
			"$.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {",
			"    $.ig.RVDashboard.loadDashboard('Sales', (dashboard) => {",
			"       var revealView = new $.ig.RevealView('#revealView');",
			"       revealView.dashboard = dashboard;",
			"    });",
			"});",
			"</script>",

		],
		"description": "Insert RevealView in JavaScript / HTML app"
	}}
