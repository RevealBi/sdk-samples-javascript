//get the current lang from the sessionStorage, defaults to 'en' if not exists
const sessionLang = sessionStorage.getItem('lang') ?? 'en';

//map of index position by lang
const lang = {
    "en": 0, "ja": 1, "es": 2, "it": 3, "fr": 4
};

//dict of used words
const dictionaryTable = {
    //"OriginalWord": ["English", "Japanese", "Spanish", "Italian", "French"], => example guide
    "Date Filter": ["Date Filter", "日付フィルター", "Filtro de Fecha", "Filtro data", "Filtre de date"],
    "Date": ["Date", "日にち", "Fecha", "Data", "Date"],
    "Marketing": ["Marketing", "マーケティング", "Marketing", "Marketing", "Commercialisation"],
    "Spend": ["Spend", "費やす", "Gastado", "Spendere", "Dépenser"],
    "Budget": ["Budget", "バジェット", "Presupuesto", "Bilancio", "Budget"],
    "CTR": ["CTR", "クリック率", "CTR", "CTR", "CTR"],
    "Spend by Territory": ["Spend by Territory", "テリトリー別支出額", "Gastos por territorios", "Spese per territorio", "Dépenses par territoire"],
    "Spend vs Budget": ["Spend vs Budget", "支出対予算", "Gasto vs Presupuesto", "Spesa vs budget", "Dépenses vs budget"],
    "Organic Traffic": ["Organic Traffic", "オーガニックトラフィック", "Tráfico orgánico", "Traffico organico", "Trafic organique"],
};

//function to translate, expects an RVLocalizationElement and returns a localized string
function translate(element) {
    const elementDesc = element.title ? element.title : element.name;
    const candidateList = dictionaryTable[elementDesc];
    const candidate = candidateList ? candidateList[lang[sessionLang]] : undefined;
    return candidate ? candidate : elementDesc;
}

//function to set the language from the combobox and save it on sessionStorage
function changeLang(lang) {
    sessionStorage.setItem('lang', lang)
    location.reload();
}

// set this to your server url
$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");

// override locale
$.ig.RevealSdkSettings.overrideLocale(sessionLang).then(_ => {
    // check if the elements are inside the dictionary table, if so, the replacement is performed according to the language of the interface
    $.ig.RevealSdkSettings.localizedStringsProvider = function (element, context) {
        const translation = translate(element);
        // uppercase is performed for all the elements that are 'Titles' and lowercase for all those that are 'Field labels'
        if (element.elementType === $.ig.RVLocalizationElementType.DashboardFilterTitle || element.elementType === $.ig.RVLocalizationElementType.DashboardTitle) {
            return translation.toUpperCase()
        } else if (element.elementType === $.ig.RVLocalizationElementType.FieldLabel || element.elementType === $.ig.RVLocalizationElementType.VisualizationFieldLabel) {
            return translation.toLowerCase()
        }
        return translation;
    };
})

// load dashboard
$.ig.RVDashboard.loadDashboard("Marketing").then(dashboard => {
    const revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
})
