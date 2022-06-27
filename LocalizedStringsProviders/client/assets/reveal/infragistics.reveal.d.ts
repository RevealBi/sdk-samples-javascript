declare namespace RevealApi{
	/**
 * Represent a cell in the visualization data, includes.
 * Used in some {@link RevealView} events like:
 *  - {@link RevealView.onVisualizationDataPointClicked}
 *  - {@link RevealView.onTooltipShowing} & {@link ChartInteractionEventArgs}
 */
class RVCell {
    /**
     * The name of the column this cell belongs to.
     */
    columnName: null;
    /**
     * The label of the column this cell belongs to.
     */
    columnLabel: null;
    /**
     * The value of the cell.
     */
    value: null;
    /**
     * The formatted value of the cell.
     */
    formattedValue: null;
    constructor();
}
//# sourceMappingURL=rvCell.d.ts.map

/**
 * @enum
 */
enum RVChartType {
    Pivot = "Pivot",
    Grid = "Grid",
    AreaChart = "AreaChart",
    BarChart = "BarChart",
    BubbleChart = "BubbleChart",
    CandlestickChart = "CandlestickChart",
    ColumnChart = "ColumnChart",
    ComboChart = "ComboChart",
    DoughnutChart = "DoughnutChart",
    FunnelChart = "FunnelChart",
    LineChart = "LineChart",
    OHLC_Chart = "OHLC_Chart",
    PieChart = "PieChart",
    RadialLineChart = "RadialLineChart",
    ScatterChart = "ScatterChart",
    SplineChart = "SplineChart",
    SplineAreaChart = "SplineAreaChart",
    StackedAreaChart = "StackedAreaChart",
    StackedBarChart = "StackedBarChart",
    StackedColumnChart = "StackedColumnChart",
    StepAreaChart = "StepAreaChart",
    StepLineChart = "StepLineChart",
    RadialGauge = "RadialGauge",
    BulletGraph = "BulletGraph",
    LinearGauge = "LinearGauge",
    LabelGauge = "LabelGauge",
    TreeMap = "TreeMap",
    Image = "Image",
    DIY = "DIY",
    TextView = "TextView",
    Indicator = "Indicator",
    IndicatorTarget = "IndicatorTarget",
    Sparkline = "Sparkline",
    TextBox = "TextBox",
    Choropleth = "Choropleth",
    ScatterMap = "ScatterMap",
    TimeSeriesChart = "TimeSeriesChart"
}
//# sourceMappingURL=rvChartType.d.ts.map

/**
 * The class representing a visualization (widget) in the dashboard model.
 */
class RVVisualization {
    /** @ignore */
    _widgetModel: any;
    /** @ignore */
    constructor(widgetModel: any);
    /**
     * The ID of the visualization
     */
    get id(): string;
    /**
     * The title of the visualization
     */
    get title(): string;
    /**
     * The chart used in this visualization
     */
    get chartType(): RVChartType;
}

/** Class that represents all visualizations in a dashboard as an array. */
class VisualizationsArray extends Array<RVVisualization> {
    /**
     * Gets the first visualization with the given title.
     * Returns RVVisualization - The first visualization with the given title (case sensitive), null if there's no visualization with that title.
     */
    getByTitle(title: string): RVVisualization | null;
    /**
     * Gets the visualization with the given ID.
     * Returns RVVisualization - The visualization with the given ID (case sensitive), null if there's no visualization with that ID.
     */
    getById(id: string): RVVisualization | null;
}
//# sourceMappingURL=visualizationsArray.d.ts.map

/**
 * Class representing a possible value for a dashboard filter, retrieved from {@link RVDashboardFilter.getFilterValues}
 */
class RVFilterValue {
    /**
   * The dictionary with all values associated to this filter value, this object needs to be used when setting selected values for the filter.
   */
    value: any;
    /**
   * The label used to show this value to the user.
   */
    label: any;
    /** @ignore */
    constructor(value: any, label: string);
}
//# sourceMappingURL=rvFilterValue.d.ts.map

/** Class used to represent a dashboard filter. */
class RVDashboardFilter {
    /** @ignore */
    _filterModel: any;
    /** @ignore */
    _dashboard: RVDashboard;
    /** @ignore */
    _selectedValues: Array<Object>;
    /** @ignore */
    constructor(filterModel: any);
    /** The ID of the filter. */
    get id(): string;
    /** The title of the filter. */
    get title(): string;
    /** Get/sets filter's selected values. No items in the enumeration means all available values are selected. */
    get selectedValues(): Array<object>;
    set selectedValues(v: Array<object>);
    /**
     * Retrieves available filter values to be selected.
     * @param callback Will be invoked and the available values will be passed as an argument.
     * @param errorCallback Will be called in case of error.
     */
    getFilterValues(callback: (values: RVFilterValue[]) => void, errorCallback: (error: any) => void): void;
}
//# sourceMappingURL=rvDashboardFilter.d.ts.map

/**
 * @enum
 */
enum RVDateFilterType {
    /**No filter defined, all time is included */
    AllTime = "allTime",
    /**Custom range, an instance of $.ig.RVDateRange must be set in the range property. */
    CustomRange = "customRange",
    /**Last 7 days*/
    LastWeek = "lastWeek",
    /**Last 30 days*/
    LastMonth = "lastMonth",
    /**Last 365 days*/
    LastYear = "lastYear",
    /**From Jan 1st this year to today*/
    YearToDate = "yearToDate",
    /**From the first day of the current quarter*/
    QuarterToDate = "quarterToDate",
    /**From the first day of the current month*/
    MonthToDate = "monthToDate",
    /**Yesterday*/
    Yesterday = "yesterday",
    /**Today*/
    Today = "today",
    /**This month, including the rest of it*/
    ThisMonth = "thisMonth",
    /**This quarter, including the rest of it*/
    ThisQuarter = "thisQuarter",
    /**This year, including the rest of it. From Jan 1st to Dec 31st of the current year*/
    ThisYear = "thisYear",
    /**The previous month*/
    PreviousMonth = "previousMonth",
    /**The previous quarter*/
    PreviousQuarter = "previousQuarter",
    /**The previous year*/
    PreviousYear = "previousYear",
    /**The next month*/
    NextMonth = "nextMonth",
    /**The next quarter*/
    NextQuarter = "nextQuarter",
    /**The next year*/
    NextYear = "nextYear",
    /**The last 12 complete months*/
    TrailingTwelveMonths = "trailingTwelveMonths"
}
//# sourceMappingURL=rvDateFilterType.d.ts.map

/**
 * Class used to represent a date range for filtering.
 */
class RVDateRange {
    /** The beginning of the range. */
    from: Date;
    /** The end of the range.*/
    to: Date;
    /** @ignore */
    constructor(from: Date, to: Date);
}
//# sourceMappingURL=rvDateRange.d.ts.map

/**
 * Class representing the optional date filter defined in a dashboard model.
 */
class RVDateDashboardFilter {
    /** @ignore */
    _filterModel: any;
    /** @ignore */
    _dashboard: RVDashboard | null;
    /** @ignore */
    _dateFilterType: RVDateFilterType;
    /** @ignore */
    _range: RVDateRange | null;
    /** @ignore */
    constructor(filterType: RVDateFilterType | null, range: RVDateRange | null, filterModel: any);
    /**
     * The type of date filter, like YearToDate, MonthToDate, CustomRange, etc.
     */
    get dateFilterType(): RVDateFilterType;
    /**
     * The custom date range used for filtering, only valid when filterType is CustomRange
     */
    get range(): RVDateRange | null;
}
//# sourceMappingURL=rvDateDashboardFilter.d.ts.map

/**
 * @hidden
 */
class SdkDocumentDelegate {
    _dashboard: RVDashboard;
    constructor(dashboard: RVDashboard);
    widgetAdded(widget: any, index: number): void;
    titleUpdated(newTitle: string): void;
    widgetDeleted(index: number): void;
    widgetMoved(from: number, to: number): void;
    widgetUpdated(widget: any): void;
    dashboardFilterUpdated(filter: any, index: number): void;
    dashboardFilterDeleted(filter: any, index: number): void;
    dashboardFilterAdded(filter: any, index: number): void;
    dashboardDocumentChanged(newDashboard: any): void;
    dashboardDocumentHasChangesModified(hasPendingChanges: boolean): any;
}

/** Provides information about where data sources are being requested, one of visualization, dashboard filter or data blending */
enum RVDataSourcesRequestedTriggerType {
    /**Visualization */
    Visualization = "visualization",
    /**Dashboard Filter */
    DashboardFilter = "dashboardFilter",
    /**Data Blending*/
    DataBlending = "dataBlending"
}
//# sourceMappingURL=rvDataSoucesRequestedTriggerType.d.ts.map

/**
 *  The class contains custom theme settings about conditional formatting.
 *  See {@link RevealTheme.conditionalFormatting}.
 */
class RVConditionalFormatting {
    /** Conditional formatting color for HI values*/
    hiColor: string;
    /** Conditional formatting color for MID values*/
    midColor: string;
    /** Conditional formatting color for LOW values*/
    lowColor: string;
    /** Conditional formatting color when NO VALUE*/
    noneColor: string;
    constructor();
}
//# sourceMappingURL=rvConditionalFormatting.d.ts.map

/**
 * Class defining a theme to be used to render {@link RevealView} with.
 * When instantiated it has the values for the default reveal theme.
 * Create an instance tune it as you like and then set it to {@link RevealSdkSettings.theme}.
 * You should set the theme before RevealView is rendered.
 */
class RevealTheme {
    /**@hidden */
    static _oceanTheme: any;
    /**@hidden */
    static _mountainTheme: any;
    /**@hidden */
    isDark: Boolean;
    /**@hidden */
    isOceanBased: Boolean;
    /**
     * The list of chart colors. This color palette could have any number of elements.
     * Once the list is finished, Reveal will start auto generating shade of these colors.
     * ```javascript
     * theme.chartColors = ["rgb(255,0,0)","rgb(0,255,0)", "rgb(0,0,255)"];
     * ```
     * */
    chartColors: string[];
    /**
     * The list of background colors displayed as the palette when selecting the background
     * color for a visualization (if enabled). This color palette could have any number of elements.
     */
    backgroundColors: string[];
    /** Conditional Formatting set of colors HI, MID, LOW and NONE values.*/
    conditionalFormatting: RVConditionalFormatting;
    /**
     * Highlighting color that is used on specific scenarios for dashboards (forecast and outliers).
     * ```javascript
     * theme.highlightColor = "rgb(255,0,0)";
     * ```
     * */
    highlightColor: string;
    /** Font family used for regular font style */
    regularFont: string;
    /**
     * Font family used for medium font style
     * */
    mediumFont: string;
    /** Font family used for bold font style */
    boldFont: string;
    /** Font color */
    fontColor: string;
    /** Main background color */
    dashboardBackgroundColor: string;
    /** Visualizations, modals, list-items... secondary background color */
    visualizationBackgroundColor: string;
    /** Accent color */
    accentColor: string;
    /**
     * Rounded corners in buttons, tooltips, containers, visualizations, etc.
     * If false, squared corners will be shown
     * */
    useRoundedCorners: Boolean;
    constructor();
    /** Clones the current theme */
    clone(): RevealTheme;
    /**@hidden */
    protected initTheme(isDark: Boolean, isOceanBased: Boolean): void;
    /**@hidden */
    static initialize(): void;
}
/**
 * Dark version of the Mountain theme
 */
class MountainDarkTheme extends RevealTheme {
    constructor();
}
/**
 * Light version of the Mountain theme
 */
class MountainLightTheme extends RevealTheme {
    /**@hidden */
    constructor();
}
/**
 * Dark version of the Ocean theme
 */
class OceanLightTheme extends RevealTheme {
    /**@hidden */
    constructor();
}
/**
 * Light version of the Ocean theme
 */
class OceanDarkTheme extends RevealTheme {
    /**@hidden */
    constructor();
}
//# sourceMappingURL=revealTheme.d.ts.map

/** This class represents the chart settings for a visualization.
 * See {@link RevealView.setVisualizationChartSettings} method.
*/
class RVChartSettings {
    /** Minimum value for left axis. */
    leftAxisMinValue: number | null;
    /** Maximum value for left axis.  */
    leftAxisMaxValue: number | null;
    /** Minimum value for right axis (if present). */
    rightAxisMinValue: number | null;
    /** Maximum value for right axis (if present). */
    rightAxisMaxValue: number | null;
    /** @hidden */
    constructor();
}
//# sourceMappingURL=rvChartSettings.d.ts.map

/**
 *The class used as the argument to the onSave event.
 */
class DashboardSaveEventArgs {
    /**
     *  The name of the dashboard being saved, that could have been modified by the end user by editing the title.
     */
    name: string;
    /**
     * The ID of the dashboard being saved, for existing dashboards this is the ID used when loading it. For new dashboards or "save as"
     * operation the value will be null.
     * You should set the value of this property when "saving as" an existing dashboard or saving a new one before calling saveFinished,
     * if not set it will be assumed to match the dashboard name.
     */
    dashboardId: string | null;
    private _revealView;
    private _saveAs;
    private _isNew;
    constructor(saveAs: Boolean, name: string, revealView: any, dashboardId: string);
    /**
     *  A flag indicating if this event was originated by a 'save' (false) or 'save as' (true) operation.
     */
    get saveAs(): Boolean;
    /**
     * A flag indicating if this event was originated by saving a newly created dashboard, it will be false
     * when saving or "saving as" an existing dashboard.
     */
    get isNew(): Boolean;
    /**
     * Serializes the current dashboard to the '.rdash' file format, using the current name.
     * @param {(blob: Blob) => void} callback  This is the callback function used to receive the serialized dashboard
     * @param {(string) => void} errorCallback  This is the callback function invoked when an error occurs
     * @returns {Blob} A Blob object with the contents of the dashboard in '.rdash' file format.
     */
    serialize(callback: (blob: Blob) => void, errorCallback: (errorMessage: string) => void): void;
    /**
     * Serializes the current dashboard to the '.rdash' file format with the name provided.
     * @param {string} newName The new name for the dashboard.
     * @param {(blob: Blob) => void} callback This is the callback function used to receive the serialized dashboard
     * @param {(string) => void} errorCallback This is the callback function invoked when an error occurs
     * @returns {Blob} A Blob object with the contents of the dashboard in '.rdash' file format.
     */
    serializeWithNewName(newName: string, callback: (blob: Blob) => void, errorCallback: (errorMessage: string) => void): void;
    /**
     * Notifies the Reveal SDK the save operation has finished and it should switch to view mode.
     * When using server side saving and for a new dashboard or for the "save as" operation it expects:
     *  - name to be set to the name entered by the end user, that value will be set as the title for the displayed dashboard.
     *  - dashboardId to be set to the assigned id, this value will be used for subsequent save operations, name will be used as the ID if dashboardId is not set.
     */
    saveFinished(): void;
}
//# sourceMappingURL=dashboardSaveEventArgs.d.ts.map

/**
 * Class representing the event arguments visualizationEditorClosing event
 * @see {@link RevealView.onVisualizationEditorClosing}
 */
class VisualizationEditorClosingArgs {
    /**
     *  The visualization after the changes made in the editor.
     */
    visualization: RVVisualization;
    /**
     * Property indicating whether this is a brand new visualization the end user is trying to close.
     */
    isNewVisualization: Boolean;
    /**
     * Set this to true in case you need to reset any changes the end user might have done.
     */
    resetVisualization: boolean;
    /**
     * Set this to true to cancel closing of the visualization
     */
    cancel: boolean;
    /** @ignore */
    constructor(visualization: RVVisualization, isNewVisualization: Boolean);
}
//# sourceMappingURL=visualizationEditorClosingArgs.d.ts.map

/**
 * The type of the event arguments of the onVisualizationEditorClosed event.
 */
class VisualizationEditorClosedEventArgs {
    /**
     *  The visualization after the changes made in the editor.
     */
    visualization: RVVisualization;
    /**
     * This property is true if it is a new visualization that has been created.
     */
    isNewVisualization: Boolean;
    /**
     * This property is true if the editor was closed by discarding the changes (pressing the X button).
     */
    isCancelled: Boolean;
    /** @ignore */
    constructor(visualization: RVVisualization, isNewVisualization: Boolean, isCancelled: Boolean);
}
//# sourceMappingURL=visualizationEditorClosedEventArgs.d.ts.map

/**
 * The class used as the argument to the onTooltipShowing event.
 */
class ChartInteractionEventArgs {
    /**
     *  The visualization for which a tooltip is about to be shown.
     */
    visualization: RVVisualization;
    /**
     * The data cell for which a tooltip is about to be shown.
     */
    cell: RVCell;
    /**
     * The whole data row for which a tooltip is about to be shown.
     */
    row: RVCell[];
    /**
     * A flag which if set to true will disable the rendering of the tooltip.
     */
    cancel: boolean;
    /** @ignore */
    constructor(visualization: RVVisualization, cell: RVCell, cells: RVCell[]);
}
//# sourceMappingURL=chartInteractionEventArgs.d.ts.map

/**
 * Class representing the event arguments visualizationEditorOpening event
 * @see {@link RevealView.onVisualizationEditorOpening}
 */
class VisualizationEditorOpeningArgs {
    /**
     * Property indicating whether this is a brand new visualization the end user is trying to edit.
     */
    isNewVisualization: Boolean;
    /**
     * Set this to true to cancel opening the visualization
     */
    cancel: boolean;
    /**
     * The visualization that the user is trying to edit
     */
    visualization: RVVisualization;
    /** @ignore */
    constructor(visualization: RVVisualization, isNewVisualization: Boolean);
}
//# sourceMappingURL=visualizationEditorOpeningArgs.d.ts.map

/**
 * The type of the event arguments of the onVisualizationEditorOpened event.
 */
class VisualizationEditorOpenedEventArgs {
    /**
   *  The visualization being edited.
   */
    visualization: RVVisualization;
    /**
   * This property is true if it is a new visualization that is being created.
   */
    isNewVisualization: Boolean;
    /** @ignore */
    constructor(visualization: RVVisualization, isNewVisualization: Boolean);
}
//# sourceMappingURL=visualizationEditorOpenedEventArgs.d.ts.map

type nullableString = string | null;
type nullableDate = Date | null;
interface IKnownType {
    getType(): string;
}

/**
 * The base class representing a data source used in a dashboard, you can
 * RVDataSourceItem for more information about the relationship between data source and data source items.
 */
abstract class RVDashboardDataSource implements IKnownType {
    private _id;
    /**
     * The ID of the data source
     */
    get id(): nullableString;
    set id(value: nullableString);
    private _title;
    /**
     *  The title of the data source as displayed to users.
     */
    get title(): nullableString;
    set title(value: nullableString);
    private _subtitle;
    /**
    * The subtitle of the data source, if not null will be displayed to users instead of connection information like host and database name.
    */
    get subtitle(): nullableString;
    set subtitle(value: nullableString);
    /** @hidden */
    abstract getType(): string;
    /** @hidden */
    _createWrapperInstance(): any;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * @enum
 */
enum RVProviderType {
    AzureSqlServer = 0,
    AzureSynapse = 1,
    GoogleAnalytics = 2,
    GoogleBigQuery = 3,
    MicrosoftSqlServer = 4,
    MySql = 5,
    Oracle = 6,
    Postgres = 7,
    Sybase = 8,
    WebResource = 9,
    Rest = 10,
    S3 = 11,
    MicrosoftDynamics = 12,
    MicrosoftAnalysisServices = 13,
    MicrosoftReportingServices = 14,
    AmazonRedshift = 15
}
//# sourceMappingURL=rvProviderType.d.ts.map

/**
 * The class used as the argument to the dashboardSelectorRequested event.
 */
class DashboardSelectorRequestedEventArgs {
    callback: (dashboardId: string) => void | null;
    /** @ignore */
    constructor(callback: (dashboardId: string) => void);
}

/**
 * The basic class for data source items that can be used by visualizations to get data.
 * When getting data from a database for example, the data source object contains the information required to connect
 * to the database (like server host and database name) and the data source item contains
 * the information required to get the dataset itself (like table name or view name).
 */
abstract class RVDataSourceItem implements IKnownType {
    constructor(dataSource: RVDashboardDataSource);
    private _title;
    /** The title of the item, as displayed to the user, it might be for example the name of the table in a database. */
    get title(): nullableString;
    set title(value: nullableString);
    private _subtitle;
    /** The subtitle of the data source, if not null will be displayed to users instead of connection information like host and database name. */
    get subtitle(): nullableString;
    set subtitle(value: nullableString);
    private _id;
    /** The value that identifies this item in the data source, it might be for example the name of the schema concatenated with the table name. */
    get id(): nullableString;
    set id(value: nullableString);
    private _description;
    /** Description of this data source item. */
    get description(): nullableString;
    set description(value: nullableString);
    private _dataSource;
    /**
     * Reference to the data source object this item belongs to.
     */
    get dataSource(): RVDashboardDataSource;
    set dataSource(value: RVDashboardDataSource);
    /** @hidden */
    abstract getType(): string;
    /** @hidden */
    _createWrapperInstance(isResourceBased?: Boolean): any;
    /** @hidden */
    _getWrapper(isResourceBased?: Boolean): any;
}

class RevealDataSources {
    _dataSources: any[];
    _dataSourceItems: any[];
    _useDataInDashboard: boolean;
    constructor(dataSources: RVDashboardDataSource[], dataSourceItems: RVDataSourceItem[], useDataInDashboard: boolean);
    dataSourceItems(v: any): any[];
    dataSources(v: any): any[];
    useDataInDashboard(v: any): boolean;
    getInternal(): any;
}

/**
 * Used to create a new instance of the RevealView class.
 * The main class used to render a dashboard in your application, it also allows the editing of existing dashboards or the creation from scratch.
 */
class RevealView {
    private static _currentTheme;
    /** @internal */
    _navigationMgr: any;
    /** @internal */
    _dashboardView: any;
    /** @internal */
    _dashboardModel: any;
    private _selector;
    private _dashboard;
    private _appInstanceId;
    private _applyingParameters;
    private _sdkDelegate;
    private _canEdit;
    private _startInEditMode;
    private _canAddVisualization;
    private _canMaximizeVisualization;
    private _showMenu;
    private _showFilters;
    private _singleVisualizationMode;
    private _canSaveAs;
    private _showRefresh;
    private _showHeader;
    private _showChangeVisualization;
    private _showStatisticalFunctions;
    private _showExportImage;
    private _showExportToExcel;
    private _showExportToPDF;
    private _showExportToPowerpoint;
    private _startWithNewVisualization;
    private _serverSideSave;
    private _showChangeDataSource;
    private _showMachineLearningModelsIntegration;
    private _showDataBlending;
    private _crosshairsEnabled;
    private _hoverTooltipsEnabled;
    private _canAddCalculatedFields;
    private _canAddDashboardFilter;
    private _canAddDateFilter;
    private _canAddPostCalculatedFields;
    private _canCopyVisualization;
    private _canDuplicateVisualization;
    private _availableCharTypes;
    private _addDataSourceEnabledProviders;
    private _showEditDataSource;
    private _canChangeVisualizationBackgroundColor;
    /**
     * Instantiates a new RevealView component and renders it at the provided DOM selector location.
     * @param selector Selector to the DOM element where the RevealView should be rendered. Exception is thrown if no element is found in DOM matching the selector.
     */
    constructor(selector: string);
    private _presentRevealView;
    private _dashboardLoaded;
    private _setDashModel;
    private _applyRevealViewParameters;
    private _updateGlobalFiltersValues;
    private _addListeners;
    private _updateFilterSelectedValues;
    private _requiresFilterAvailableValues;
    /** @internal */
    _loadDashboard(): void;
    /** @internal */
    _dashboardViewSaveDashboard(dashboardView: any, dashboard: any, saveAs: Boolean): void;
    private _prepareDatePointClickedAndTooltipShowingEventargs;
    /**
     * Sets the selected values for the given filter
     *
     * @param {RVDashboardFilter} filter The filter to set the selection to. It might be obtained from dashboard.filters()[index] or dashboard.getFilterByTitle(title)
     * @param {object[]} selectedValues The array of selected values containing the new selection for the filter, like ['United States', 'France'].
     * @see RVDashboard#filters
     * @see RVDashboard#getFilterByTitle
     * @internal
     */
    _setFilterSelectedValues(filter: RVDashboardFilter, selectedValues: Array<object>): void;
    /** @internal */
    _setDateFilter(dateFilter: RVDateDashboardFilter): void;
    /** @internal */
    _sendServerSideSaveRequest(name: string, dashboardId: string | null): void;
    /** @internal */
    _dashboardSaveFinished(name: string, dashboardId: string | null): void;
    /** @internal */
    _getEnabledProvidersToAdd(): string[];
    /** @internal */
    _getCloudSignInBlock(): any;
    /** @internal */
    _showCloudLogin(providerKey: string, dataSourceId: string | null, callback: any): void;
    /** @internal */
    _onMissingOAuthCredentials(ds: any, callback: any): void;
    /** @internal */
    _showDashboardSelector(cell: any, callback: any): void;
    /** @internal */
    _isDashboardLinkingEditorEnabled(): boolean;
    private _setAvailableCharts;
    /**
     * This event is triggered when the end user clicks 'Save' or 'Save As'. However, if this event is set in RevealView then the callback server side
     * (SaveDashboardAsync) will not be called, and the application will handle how the dashboard is saved,
     * for example by implementing its own controller server side.
     *
     * ```javascript
     * revealView.onSave = function (rv, saveEvent) {
     *    if (saveEvent.saveAs) {
     *        var newName = prompt("Save as", dashboardId);
     *	      if (!newName) return;
     *            saveEvent.serializeWithNewName(newName,
     *                function (b) {
     *                    saveDashboard(newName, b, saveEvent);
     *            });
     *        } else {
     *            saveEvent.serialize(
     *                function (b) {
     *                    saveDashboard(dashboardId, b, saveEvent);
     *                });
     *        }
     * };
     * ```
     */
    onSave: ((rv: RevealView, saveEvent: DashboardSaveEventArgs) => void) | null;
    /**
     * This event is triggered when the end user maximizes or minimizes a visualization.
     * If the action is maximizing, the visualization the title of the maximized visualization can be retrieved via the maximizedVisualization
     * property of the revealView object.
     *
     * ```javascript
     * revealView.onMaximizedVisualizationChanged = function () {
     *     maximizedVisualization = revealView.maximizedVisualization;
     *     msg = "";
     *     if (maximizedVisualization != null) {
     *         msg = maximizedVisualization.title;
     *     } else {
     *          msg = "no current maximized widget";
     *     }
     *     console.log("Maximized widget changed! " + msg);
     * };
     * ```
     */
    onMaximizedVisualizationChanged: (() => void) | null;
    /**
     * This event is triggered whenever the end user clicks on a data point over a maximized visualization and not in edit mode.
     *
     * ```javascript
     * revealView.onVisualizationDataPointClicked = function (widget, cell, row) {
     *   console.log("Widget Data Point Clicked");
     *   console.log(widget.title);
     *   console.log(cell.columnLabel);
     *   console.log(cell.value);
     *   console.log(cell.formattedValue);
     *   console.log("First cell in the row has label:" + row[0].columnLabel)
     *}
     *```
     */
    onVisualizationDataPointClicked: ((visualization: RVVisualization, cell: RVCell, row: RVCell[]) => void) | null;
    /**
     * This event is triggered whenever the end user clicks on the 'Add visualization' button.
     * You can create custom datasources to replace the default/existing ones.
     * The argument is a callback function you're supposed to call and pass your custom collection of datasources which the end user will see.
     *
     * ```javascript
     * revealView.onDataSourcesRequested = function (callback, trigger) {
     *     if(trigger == RVDataSourcesRequestedTriggerType.Visualization){
     *         var inMemoryDSI = new RVInMemoryDataSourceItem("employees");
     *         inMemoryDSI.title = "My InMemory Title";
     *         inMemoryDSI.description ="My InMemory Description";
     *
     *         var sqlDs = new RVSqlServerDataSource();
     *         sqlDs.title = "Clients";
     *         sqlDs.id = "SqlDataSource1";
     *         sqlDs.host = "db.mycompany.local";
     *         sqlDs.port = 1433;
     *         sqlDs.database = "Invoices";
     *
     *         callback(new $.ig.RevealDataSources([sqlDs], [inMemoryDSI], true));
     *     }
     * };
     * ```
     */
    onDataSourcesRequested: ((callback: (datasources: RevealDataSources) => void, trigger: RVDataSourcesRequestedTriggerType) => void) | null;
    /**
       * This event is triggered when Reveal is requesting credentials for a given data source, and only when the creation
       * of new data sources is not enabled (by adding providers to addDataSourceEnabledProviders).
       * This is optional, as you can specify server side credentials for all your data sources, but if you don't
       * know in advance credentials your users should use (for example if you want your users to enter their own credentials to the database)
       * you can use this approach.
       * Please note how credentials are requested and stored is something you need to do in your application, this
       * event indicates credentials are needed, once the user entered credentials (or cancelled the flow) you
       * must call the callback function received as a parameter, the function receives a boolean parameter
       * that indicates if Reveal should try again (true) or the prompt was cancelled (false).
       * @type {$.ig.RevealView~onConfigureCredentials}
       *
       * @example
       * revealView.onConfigureCredentials = function (ds, callback) {
       *     //TODO: prompt for credentials, store them in your server and call the callback function when ready
       * };
       */
    onConfigureCredentials: ((dataSource: RVDashboardDataSource, callback: (success: boolean) => void) => void) | null;
    /**
    * Event fired when the user hover over a visualization and a tooltip is about to show up.
     * ```javascript
     * revealView.onTooltipShowing = function (args) {
     *{
     *    var vizTitle = args.Visualization.Title;
     *    if(vizTitle == "noNeedForTooltipsHere")
     *    {
     *        args.Cancel = true;
     *    }
     *}
     *```
     */
    onTooltipShowing: ((args: ChartInteractionEventArgs) => void) | null;
    /**
     * This event is triggered whenever the end user clicks the 'Export Image' button in the 'Export Image' popup after annotating the screenshot (optional).
     *
     * **Note**: This feature relies on server-side image rendering, so you will need to enable in your .NET Core or Java Reveal server component.
     * ```javascript
     * revealView.onImageExported = function (img) {
     *   console.log(img);
     * };
     * ```
     */
    onImageExported: ((image: Element) => void) | null;
    /**
     * This event is triggered whenever the end user is trying to open the editor for a visualization.
     * Using the args parameter you could check if this is a brand new visualization or the user is trying to edit an existing one.
     * You could also cancel the process of entering the editor by setting args.cancel to true.
     *```javascript
     *   revealView.onVisualizationEditorOpening = function (args) {
     *     if(args.isNewVisualization == false){
     *       //the user is trying to edit an existing visualization
     *       args.cancel = true; //prevent it
     *     }
     * };
     * ```
     */
    onVisualizationEditorOpening: ((args: VisualizationEditorOpeningArgs) => void) | null;
    /**
    * Event triggered when the visualization editor is opened.
    * Using the args parameter you could check if this is a brand new visualization or the user is editing an existing one.
    * ```javascript
    * revealView.onVisualizationEditorOpened = function (args) {
    *     if(args.isNewVisualization == false) { //the user is editing an existing visualization
    *     }
    * };
    * ```
    */
    onVisualizationEditorOpened: ((args: VisualizationEditorOpenedEventArgs) => void) | null;
    /**
   * This event is triggered when the end user clicks on cancel("x") button upon editing/creating a visualization.
   * Using the args parameter you could check if this is a brand new visualization or the user is editing an existing one.
   * You could also cancel the process of exiting edit mode by setting args.cancel to true.
   * ``` javascript
   * revealView.onVisualizationEditorClosing = function (args) {
   *     if(args.isNewVisualization == false){ //the user is editing
   *          args.resetVisualization = true; //puts the widget to the state when it was when the user started editing it
   *     }
   * };
   * ```
   */
    onVisualizationEditorClosing: ((args: VisualizationEditorClosingArgs) => void) | null;
    /**
     * Event triggered when the visualization editor is closed.
     * Using the args parameter you could check if this is a brand new visualization or the user edited an existing one.
     * The isCancelled flag can be used to determine whether the changes were applied or discarded. The isCancelled is true when the later is true.
     * ```javascript
     * revealView.onVisualizationEditorClosed = function (args) {
     *     if(args.isNewVisualization == false) {
     *     }
     * };
     * ```
     */
    onVisualizationEditorClosed: ((args: VisualizationEditorClosedEventArgs) => void) | null;
    onDashboardSelectorRequested: ((args: DashboardSelectorRequestedEventArgs) => void) | null;
    /**
     * Will be called when a linked dashboard is needed either if the user tries to follow a dashboard link
     * or tries to create a dashboard link while editing.
     *
     * **Note**: This callback is expected to return a Promise of an {@link RVDashboard}.
     * ```javascript
     * revealView.onLinkedDashboardProviderAsync = function (dashboardId, linkTitle) {
     *     return $.ig.RVDashboard.loadDashboardAsync(dashboardId);
     * };
     * ```
    */
    onLinkedDashboardProviderAsync: ((dashboardId: string, linkTitle: string | null) => Promise<RVDashboard>) | null;
    /** This method calls {@link RevealUtility.loadDashboardFromContainer} that loads a dashboard from the Blob object with the contents of an .rdash file. */
    revealViewForDashboardBlob: (b: Blob, selector: string, successCallback: (revealView: RevealView) => void, errorCallback: any) => void;
    /** This method is used to indicate the size of the container has changed and RevealView must re-layout its contents. */
    updateSize(): void;
    /**
     * Used to maximize a visualization once the Reveal View was initialized and rendered. It might be used to sync the currently displayed visualization with
     * a feature in the containing app, like displaying 'Sales by Country' along a Sales report.
     * @param {RVVisualization} visualization the visualization to be maximized, an object obtained from the dashboard with methods like
     * visualizations()[index] or getVisualizationByTitle(title).
     *
     * You could find the visualization you want to maximize using getById or getByTitle methods like:
     *
     * ```javascript
     * let viz = dashboard.visualizations.getByTitle("MyVizTitle")
     * let viz = dashboard.visualizations.getById("TargetVizId")
     * ```
     *
     * @returns {boolean} true if the given visualization was found in the dashboard and maximized properly, false otherwise.
     * @see {@link RVDashboard.visualizations}
     */
    maximizeVisualization(visualization: RVVisualization): boolean;
    /**
     * Used to restore the currently maximized visualization to the original state, so the whole dashboard is visible.
     * @returns {boolean} true if there was a maximized visualization, which was minimized, false otherwise.
     * */
    minimizeVisualization(): boolean;
    /**
     * Sets the date filter in the current dashboard. Please note the dashboard must be defined with a date filter, otherwise this method will be ignored.
     * @param {RVDateDashboardFilter} filter the new date filter to set in the dashboard model.
     * @see {@link RVDashboard.dateFilter}
     */
    setDateFilter(filter: RVDateDashboardFilter): void;
    /**
     * Method used to programmatically refresh the dashboard data, equivalent to execute the 'Refresh' action in the dashboard menu.
     */
    refreshDashboardData(): void;
    /**
    * Makes sure the current theme specified in {@link RevealSdkSettings.theme} is applied.
    * This involves re-loading of the currently displayed dashboard, so any state like pending edits, maximized visualization, filters selection changes will be reset and lost.
    */
    refreshTheme(): void;
    /**
     * This event is when the maximized visualization is changed.
     * @callback RevealView~onSave
     * @param {RevealView} revealView The RevealView object that triggered the event.
     * @param {DashboardSaveEventArgs} args An instance of DashboardSaveEventArgs that can be used to get information about the dashboard being saved and to get the binary contents of it.
     */
    maximizedWidgetChanged(): void;
    /**
     * Creates a screenshot of the revealView.
     *
     * **Note**: This feature relies on server-side image rendering so you will need to enable in your .NET Core or Java Reveal server component.
     * @param {gotImageCallback} gotImageCallback - A callback that will be invoked when the image is ready. The image will be passed as a param to the callback.
     * ```javascript
     * revealView.toImage(function (img) {
     *     img.removeAttribute("style");
     *     body.innerHTML = "";
     *     body.appendChild(img);
     * });
     * ```
     */
    toImage(gotImageCallback: (el: Element | null) => void): void;
    /** Serializes the current dashboard to a byte array */
    serialize(callback: (blob: Blob) => void, errorCallback: (error: any) => void): void;
    /** Serializes the current dashboard in an '.rdash' format to a byte array, the title of the dashboard is changed to match the specified name. */
    serializeWithNewName(name: string, callback: (blob: Blob) => void, errorCallback: (error: any) => void): void;
    /**
     * Overrides built in Reveal Theme settings. This method will not affect RevealView instances already rendered.
     * @deprecated This method is deprecated. Use {@link RevealSdkSettings.theme} property to get/set current theme.
     * @param {RevealTheme} theme object containing theme settings to override {@link RevealSdkSettings.theme}
     */
    static updateRevealTheme(theme: RevealTheme): void;
    /** @internal */
    static _convertColors(colors: string[]): string[];
    /**
     * Returns the currently applied theme.
     * @deprecated This method is deprecated. Use {@link RevealSdkSettings.theme} property to get/set current theme.
     */
    static getCurrentTheme: () => RevealTheme;
    /**
     * Set the chart settings
     */
    setVisualizationChartSettings(visualization: RVVisualization, chartSettings: RVChartSettings): void;
    /**
     * Set the background color for the given visualization, color is specified in hex format, like "#ffffff".
     */
    setVisualizationBackgroundColor(visualization: RVVisualization, color: string): void;
    /**
     * @returns {RVVisualization} the maximized visualization object if any, null if no visualization is maximized
     * */
    get maximizedVisualization(): RVVisualization | null;
    set maximizedVisualization(viz: RVVisualization | null);
    /**
     * Get/set the dashboard that is/should be rendered.
     */
    get dashboard(): RVDashboard | null;
    set dashboard(dashboard: RVDashboard | null);
    private setDashboard;
    /**
     * A flag indicating if the user can switch to edit mode or not.
     * @default true
     */
    get canEdit(): Boolean;
    set canEdit(canEdit: Boolean);
    /**
     * A flag indicating the view should start in edit mode instead of the default view mode.
     * @default false
     */
    get startInEditMode(): Boolean;
    set startInEditMode(startInEditMode: Boolean);
    /**
     * A flag that indicates if new visualizations can be added when the dashboard is edited.
     * @default true
     */
    get canAddVisualization(): Boolean;
    set canAddVisualization(canAddVisualization: Boolean);
    /**
     * A flag that indicates if the maximize visualization would be visible and the user would be able to maximize visualizations.
     * @default true
     */
    get canMaximizeVisualization(): Boolean;
    set canMaximizeVisualization(v: Boolean);
    /**
     * A flag indicating if new (calculated) fields can be added to the list of fields.
     * @default true
     */
    get canAddCalculatedFields(): Boolean;
    set canAddCalculatedFields(v: Boolean);
    /**
     * A flag indicating if the f(x) option in numeric values sections (like "Values") should be displayed or not.
     * @default true
     */
    get canAddPostCalculatedFields(): Boolean;
    set canAddPostCalculatedFields(v: Boolean);
    /**
     * A flag that indicates if the end user will be allowed to create dashboard filters.
     * @default true
     */
    get canAddDashboardFilter(): Boolean;
    set canAddDashboardFilter(v: Boolean);
    /**
     * A flag that indicates if the end user will be allowed to create date filter.
     * @default true
     */
    get canAddDateFilter(): Boolean;
    set canAddDateFilter(v: Boolean);
    /**
     * A flag that indicates if the "Copy" option is available in the menu for a visualization.
     * @default true
     */
    get canCopyVisualization(): Boolean;
    set canCopyVisualization(v: Boolean);
    /**
     * A flag that indicates if the "Duplicate" option is available in the menu for a visualization.
     * @default true
     */
    get canDuplicateVisualization(): Boolean;
    set canDuplicateVisualization(v: Boolean);
    /**
     * A flag indicating if the end-user can change the background color for a given visualization in the visualization editor (under Settings tab),
     * if enabled the list of colors specified via {@link RevealTheme.backgroundColors} will be displayed as a suggested palette, but the user can also
     * use an advanced mode to select any color.
     * @default false
     */
    get canChangeVisualizationBackgroundColor(): boolean;
    set canChangeVisualizationBackgroundColor(v: boolean);
    /**
     * A flag that allows the dashboard filters panel to be hidden. This is useful if you want to limit the selected
     * values for the filters to the initial selection specified in the dashboard object.
     * Once the RevealView is created and rendered you can use {@link RVDashboard.filters} or {@link RVDashboard.dateFilter} to change
     * the selection for a given filter, so you can keep the selected values synced with your app.
     * @default true
     */
    get showFilters(): Boolean;
    set showFilters(v: Boolean);
    /**
     * Single visualization mode is used to show a single visualization at a time.
     * You can control the initial visualization to maximize using the {@link maximizedVisualization} property.
     * If no initial visualization is configured to be maximized the first one will be maximized initially.
     * You can use {@link maximizedVisualization} to change the maximized one once the dashboard is visible.
     * @default true */
    get singleVisualizationMode(): Boolean;
    set singleVisualizationMode(v: Boolean);
    /** A flag indicating if the user can 'Save as' the dashboard.
      *  @default true */
    get canSaveAs(): Boolean;
    set canSaveAs(v: Boolean);
    /** A flag that indicates if the Refresh action should be available or not.
     *  @default true */
    get showRefresh(): Boolean;
    set showRefresh(v: Boolean);
    /** A flag that indicates if dashboard header will be rendered.
     *  Please note that if you hide the header bar UI controls to save, save as, export wont be available for the end user.
     *  @default true */
    get showHeader(): Boolean;
    set showHeader(v: Boolean);
    /** A flag indicating if the button to change visualization should be available or not, this button is used to
     * switch to another visualization type (for example from Bar to Column chart) without entering edit mode.
     *  @default true */
    get showChangeVisualization(): Boolean;
    set showChangeVisualization(v: Boolean);
    /** A flag indicating if the menu to apply statistical functions (forecasting, etc.) is available or not.
     *  @default true */
    get showStatisticalFunctions(): Boolean;
    set showStatisticalFunctions(v: Boolean);
    /** A flag indicating if the export image action is available or not.
     * @default true */
    get showExportImage(): Boolean;
    set showExportImage(v: Boolean);
    /** A flag indicating if the export to Excel action is available or not.
     *  @default true */
    get showExportToExcel(): Boolean;
    set showExportToExcel(v: Boolean);
    /** A flag indicating if the export to PowerPoint action is available or not.
     *  @default true */
    get showExportToPowerpoint(): Boolean;
    set showExportToPowerpoint(v: Boolean);
    /** A flag indicating if the export to PDF action is available or not.
     *  @default true */
    get showExportToPDF(): Boolean;
    set showExportToPDF(v: Boolean);
    /** A flag indicating the new visualization dialog should be displayed automatically when this view is presented.
     * This setting requires {@link startInEditMode} set to true.
     *  @default false */
    get startWithNewVisualization(): Boolean;
    set startWithNewVisualization(v: Boolean);
    /**  A flag that indicates if the "Change data source" button should be displayed or not.
     *  @default true */
    get showChangeDataSource(): Boolean;
    set showChangeDataSource(v: Boolean);
    /** A flag that indicates if the edit button for a datasource in the visualization editor should be displayed or not.
     *  @default true */
    get showEditDataSource(): Boolean;
    set showEditDataSource(v: Boolean);
    /** A flag indicating if the button "Add fields from a Machine Learning model" (in the visualization editor) should be available or not.
     *  @default false */
    get showMachineLearningModelsIntegration(): Boolean;
    set showMachineLearningModelsIntegration(v: Boolean);
    /** A flag indicating if the button "Add fields from another data source" (in the visualization editor) should be available or not.
     *  @default true */
    get showDataBlending(): Boolean;
    set showDataBlending(showDataBlending: Boolean);
    /** A flag that indicates if the menu (containing Refresh, Export, etc.) should be displayed or not.
     *  @default true */
    get showMenu(): Boolean;
    set showMenu(v: Boolean);
    /** A flag indicating if tooltips are displayed on hover for chart visualizations.
     *  @default true */
    get hoverTooltipsEnabled(): Boolean;
    set hoverTooltipsEnabled(v: Boolean);
    /** A flag indicating if crosshairs are displayed for charts.
     *  @default false */
    get crosshairsEnabled(): Boolean;
    set crosshairsEnabled(v: Boolean);
    /** A flag indicating if server side saving is enabled.
      *  @default true */
    get serverSideSave(): Boolean;
    set serverSideSave(v: Boolean);
    /** The list of available chart types for the end user to select from. Please note this only affects the list of visualizations to pick from,
     * if a given dashboard is using a visualization not listed here, that visualization will be used anyway.
     * The list is initially populated with all supported visualization types, so you can just remove the ones you would like to get excluded.
     * Please note that {@link RVChartType.Pivot} and {@link RVChartType.Image} are used as the initial chart type
     * for a new visualization (depending on the source selected) regardless if those types are not included in this list.
     */
    get availableChartTypes(): RVChartType[];
    set availableChartTypes(v: RVChartType[]);
    /**
     * The list of providers that will be allowed when clicking "+ Data Source" in the data source selector, if empty (the default) or null
     * data source creation will be disabled.
     */
    get addDataSourceEnabledProviders(): RVProviderType[];
    set addDataSourceEnabledProviders(v: RVProviderType[]);
}

class FiltersArray extends Array<RVDashboardFilter> {
    /**
     * Gets the first filter with the given title.
     *
     * @param {string} title The title of the filter to search for.
     * @returns {$.ig.RVDashboardFilter} The first filter with the given title (case sensitive), null if there's no filter with that title.
     */
    getByTitle(title: string): RVDashboardFilter | null;
    /**
     * Gets the filter with the given ID.
     *
     * @param {string} id The ID of the filter to search for.
     * @returns {$.ig.RVDashboardFilter} The filter with the given ID (case sensitive), null if there's no filter with that ID.
     */
    getById(id: string): RVDashboardFilter | null;
}
//# sourceMappingURL=filtersArray.d.ts.map

/**
 * The class representing a Dashboard model. To get an instance of this class you could use:
 *  - {@link RVDashboard.loadDashboard}
 *  - {@link RVDashboard.loadDashboardAsync}
 *  - {@link RVDashboard.loadDashboardFromContainer}
 */
class RVDashboard {
    /** @hidden */
    _dashboardModel: any;
    /** @hidden */
    _filters: FiltersArray;
    /** @hidden */
    _visualizations: VisualizationsArray;
    /** @hidden */
    _dateFilter: RVDateDashboardFilter | null;
    /** @hidden */
    _delegate: SdkDocumentDelegate;
    /** @hidden */
    _subscribedViews: Set<RevealView>;
    /** @hidden */
    _hasPendingChanges: boolean;
    /** @hidden */
    _dashboardId: string;
    /** @hidden */
    constructor();
    /** Loads the dashboard */
    static loadDashboard(dashboardId: string, onSuccess: (dashboard: RVDashboard) => void, onError: (msg: string) => void): void;
    /** Loads the dashboard asynchronously */
    static loadDashboardAsync(dashboardId: string): Promise<RVDashboard>;
    /** Loads the dashboard from container */
    static loadDashboardFromContainer(blob: Blob, onSuccess: (dashboard: RVDashboard) => void, onError: (msg: string) => void): void;
    /** @hidden */
    static _create(dashboardModel: any, dashboardId: string): RVDashboard;
    private _loadFilters;
    private _getRVFilter;
    private _loadVisualizations;
    /**
     * The list of visualizations in the dashboard.
     */
    get visualizations(): readonly RVVisualization[];
    /**
     * The list of filters in the dashboard. Dashboard filters can be used to apply filters to multiple widgets at the same time.
     * */
    get filters(): FiltersArray;
    /**
     * The date global filter configured in this dashboard, null if no date filter is configured.
     * Setting the date filter is only supported when the dashboard has a date filter defined.
     * You can change the currently selected value of a date filter.
     * En error is thrown if you try to set a filter to a dashboard which does not have one defined or setting it to null if there is date filter in the dashboard.
     * */
    get dateFilter(): RVDateDashboardFilter | null;
    set dateFilter(v: RVDateDashboardFilter | null);
    /** Returns <b>true</b> if the user made changes to the dashboard that were not saved yet. */
    get hasPendingChanges(): boolean;
    private _title;
    /**
     * The name or title of the dashboard.
     * */
    get title(): string;
    /**
    * The id of the dashboard.
    * */
    get dashboardId(): string;
    /**
     * This event is triggered when the the title of the dashboard is changed
     * was added/removed or updated.
     */
    onTitleChanged: ((newTitle: string) => void) | null;
    /**
     * This event is triggered when the list of visualizations has changed because a visualization
     * was added/removed or updated.
     */
    onVisualizationsChanged: ((visualizations: RVVisualization[]) => void) | null;
    /**
     * This event is triggered when the list of filters has changed because a filter
     * was added or removed.
     */
    onFiltersChanged: ((filters: RVDashboardFilter[]) => void) | null;
    /**
     * This event is triggered when the date filter was modified.
     */
    onDateFilterChanged: ((dateFilter: RVDateDashboardFilter | null) => void) | null;
    /**
     * This event is triggered when the hasPendingChanges flag has changed its value.
     */
    onHasPendingChangesChanged: ((hasPendingChanges: boolean) => void) | null;
    /** @hidden */
    _subscribeDashboardView(view: any): void;
    /** @hidden */
    _unsubscribeDashboardView(view: any): void;
    /** @hidden */
    _visualizationsChanged(): void;
    /** @hidden */
    _titleChanged(newTitle: string): void;
    /** @hidden */
    _dateFilterChanged(): void;
    /** @hidden */
    _filtersChanged(): void;
    /** @hidden */
    _hasPendingChangesChanged(): void;
    /** @hidden */
    _widgetAdded(widget: any, index: number): void;
    /** @hidden */
    _titleUpdated(newTitle: string): void;
    /** @hidden */
    _widgetDeleted(index: number): void;
    /** @hidden */
    _widgetMoved(from: number, to: number): void;
    /** @hidden */
    _widgetUpdated(widget: any): void;
    /** @hidden */
    _filterAdded(filter: any, index: number): void;
    /** @hidden */
    _filterUpdated(filter: any, index: number): void;
    /** @hidden */
    _getFilterIndex(filter: any): number;
    /** @hidden */
    _filterDeleted(filter: any, index: number): void;
    /** @hidden */
    _hasPendingChangesModified(hasPendingChanges: boolean): void;
    /** @hidden */
    _loadDashboardModel(newDashboard: any): void;
    /** @hidden */
    _loadDashboardDocument(newDashboard: any): void;
    /** @hidden */
    _subscribeView(revealView: RevealView): void;
    /** @hidden */
    _unsubscribeView(revealView: RevealView): void;
    /** @hidden */
    _updateFilterSelectedValues(filter: RVDashboardFilter, selectedValues: Array<object>): void;
    /** @hidden */
    _notifyViewsThatFilterSelectedValuesChanged(revealView: RevealView | null): void;
    /** @hidden */
    _notifyViewsThatDateFilterChanged(revealView: RevealView | null): void;
    /** @hidden */
    _userFilterChanged(revealView: RevealView, filterModel: any): void;
    /** @hidden */
    _userDateFilterChanged(revealView: RevealView, dateFilter: RVDateDashboardFilter): void;
}

/** The class is used to render the thumbnail of a dashboard in your application.
 *  You need to set the dashboardInfo or the dashboard property in order to render a thumbnail.
 */
class RevealDashboardThumbnailView {
    private _dashboardInfo;
    private _selector;
    private _thumbnailView;
    private _dashboard;
    /**
     * @param selector The selector is a string that references the HTML element to attach the view to, like a div.
     */
    constructor(selector: string);
    /** Gets/sets the dashboard information that is/to be used to render. */
    get dashboardInfo(): any;
    set dashboardInfo(i: any);
    /** Gets/sets the dashboard that is/to be rendered.  */
    get dashboard(): RVDashboard | null;
    set dashboard(i: RVDashboard | null);
    /** Updates the size of a thumbnail */
    updateSize(): void;
    private _presentThumbnailView;
    private _updateThumbnail;
}
//# sourceMappingURL=revealDashboardThumbnailView.d.ts.map

/**
 * Provides context information for a localization request.
 */
class RVLocalizationContext {
    private _dashboardId;
    /**
     * The ID of the dashboard where the localization is being done.
     * It is null if the localization is not being done in the context of a particular dashboard.
     */
    get dashboardId(): string | null;
    set dashboardId(value: string | null);
    constructor(dashboardId?: string | null);
}
/**
 * Provides context information for a formatting request.
 */
class RVFormattingContext {
    private _dashboardId;
    private _requestingInitialFormat;
    /**
     * Returns true iif the field has no formatting assigned. This can be used to avoid providing a new format to a field that has
     * a format that was customized by the user.
     */
    get requestingInitialFormat(): boolean;
    set requestingInitialFormat(value: boolean);
    /**
     * The ID of the dashboard where the formatting is being done.
     * It is null if the formatting is not being done in the context of a particular dashboard.
     */
    get dashboardId(): string | null;
    set dashboardId(value: string | null);
    constructor(dashboardId: string | null, requestingInitialFormat: boolean);
}
/**
 * Types of elements that can be localized. @see {@link RevealSdkSettings.localizedStringsProvider}
 */
enum RVLocalizationElementType {
    DashboardTitle = 0,
    DashboardFilterTitle = 1,
    VisualizationTitle = 2,
    FieldLabel = 3,
    VisualizationFieldLabel = 4
}
/**
 * Types of aggregation.
 */
enum RVDashboardAggregationType {
    /**
     * Aggregation not defined, or not applies for the current context.
     */
    NotSet = 0,
    /**
     * Count of rows, including empty and repeated rows.
     */
    CountRows = 1,
    /**
     * Count of non empty rows.
     */
    CountNonEmpty = 2,
    /**
     * Count of distinct rows.
     */
    CountDistinct = 3,
    /**
     * Minimum value
     */
    Min = 4,
    /**
     * Maximum value
     */
    Max = 5,
    /**
     * Sum of all values
     */
    Sum = 6,
    /**
     * Average of values
     */
    Avg = 7,
    /**
     * Standard deviation of values.
     */
    StDev = 8,
    /**
     * Variance.
     */
    Variance = 9
}
/**
 * Base class for localization elements.
 */
abstract class RVLocalizationElement {
    private _elementType;
    constructor(elementType: RVLocalizationElementType);
    /**
     * Type of the localization element.
     */
    get elementType(): RVLocalizationElementType;
}
/**
 * Base class for localization elements that consist of a simple title.
 */
abstract class RVTitleElement extends RVLocalizationElement {
    private _title;
    constructor(elementType: RVLocalizationElementType);
    /**
     * The current title of the element.
     */
    get title(): string | null;
    set title(value: string | null);
}
/**
 * Dashboard title to be localized.
 */
class RVDashboardTitleElement extends RVTitleElement {
    constructor(title?: string | null);
}
/**
 * Visualization title to be localized.
 */
class RVVisualizationTitleElement extends RVTitleElement {
    constructor(title?: string | null);
}
/**
 * Dashboard filter title to be localized.
 */
class RVDashboardFilterTitleElement extends RVTitleElement {
    constructor(title?: string | null);
}
/**
 * Base class for field label localization elements.
 */
class RVFieldLabelElementBase extends RVLocalizationElement {
    private _name;
    private _label;
    constructor(elementType: RVLocalizationElementType, name?: string | null, label?: string | null);
    /**
     * The name of the field
     */
    get name(): string | null;
    set name(value: string | null);
    /**
     * The current label of the field.
     */
    get label(): string | null;
    set label(value: string | null);
}
/**
 * Field label to be localized. This field is not (yet) part of any visualization, nor is it (yet) used in a summarization definition.
 */
class RVFieldLabelElement extends RVFieldLabelElementBase {
    constructor(name?: string | null, label?: string | null);
}
/**
 * Field label to be localized. The field is being used in a visualization and can have some aggregation applied to it.
 */
class RVVisualizationFieldLabelElement extends RVFieldLabelElementBase {
    private _aggregationType;
    constructor(name?: string | null, label?: string | null, aggregationType?: RVDashboardAggregationType);
    /**
     * The aggregation type applied to the field, if any.
     * Has value "NotSet" when the visualizationField is not a measure.
     */
    get aggregationType(): RVDashboardAggregationType;
    set aggregationType(value: RVDashboardAggregationType);
}
/**
 * The list of dashboard data types.
 */
enum RVDashboardDataType {
    /**
     * Text data
     */
    String = 0,
    /**
     * Numeric data, including integer and floating-point values
     */
    Number = 1,
    /**
     * Date data
     */
    Date = 2,
    /**
     * Date data including time
     */
    DateTime = 3,
    /**
     * Time data
     */
    Time = 4
}
/**
 * Information about the field to be formatted.
 */
class RVFieldFormattingDescriptor {
    private _fieldName;
    private _dataType;
    private _currentSettings;
    private _isAggregated;
    private _dateAggregationType;
    constructor(fieldName: string, dataType: RVDashboardDataType, currentSettings: RVFormattingSpec | null, isAggregated: boolean, dateAggregationType: RVDashboardDateAggregationType);
    /**
     * Name of the field
     */
    get fieldName(): string;
    set fieldName(value: string);
    /**
     * Data type of the field
     */
    get dataType(): RVDashboardDataType;
    set dataType(value: RVDashboardDataType);
    /**
     * The field's current formatting
     */
    get currentSettings(): RVFormattingSpec | null;
    set currentSettings(value: RVFormattingSpec | null);
    /**
     * True iif the field to be formatted is aggregated.
     */
    get isAggregated(): boolean;
    set isAggregated(value: boolean);
    /**
     * Date aggregation type, if applicable.
     */
    get dateAggregationType(): RVDashboardDateAggregationType;
    set dateAggregationType(value: RVDashboardDateAggregationType);
}
/**
 * Base class for formatting specifications.
 */
abstract class RVFormattingSpec {
    private _locale;
    /**
     * Locale used for numerals and date names. Must be in ISO language - ISO country format. E.g.: 'en-us'.
     */
    get locale(): string | null;
    set locale(value: string | null);
}
/**
 * Date field formatting specification.
 */
class RVDateFormattingSpec extends RVFormattingSpec {
    private _dateFormat;
    /**
     * Date format pattern. Examples:
     * ```
     * 'yyyy-MMM-dd' // 2022-Jan-29
     * 'MM/dd/yy'    // 01/13/22
     * 'yyyy-WW'     // 2022-1 (first semester)
     * 'yyyy-QQ'     // 2022-1 (first quarter)
     * 'HH:00'       // 17:00
     * 'HH:mm'       // 01:30
     * ```
     */
    get dateFormat(): string | null;
    set dateFormat(value: string | null);
}
/**
 * Number field formatting specification
 */
class RVNumberFormattingSpec extends RVFormattingSpec {
    private _formatType;
    /**
     * Format type
     */
    get formatType(): RVDashboardNumberFormattingType;
    set formatType(value: RVDashboardNumberFormattingType);
    private _decimalDigits;
    /**
     * Number of decimal digits. Default is 0.
     */
    get decimalDigits(): number;
    set decimalDigits(value: number);
    private _showGroupingSeparator;
    /**
     * Show/Hide grouping separator
     */
    get showGroupingSeparator(): boolean;
    set showGroupingSeparator(value: boolean);
    private _currencySymbol;
    /**
     * Custom currency symbol
     */
    get currencySymbol(): string | null;
    set currencySymbol(value: string | null);
    private _negativeFormat;
    /**
     * Negative values format type
     */
    get negativeFormat(): RVDashboardNegativeFormatType;
    set negativeFormat(value: RVDashboardNegativeFormatType);
    private _applyMkFormat;
    /**
     * Apply M/K format. Default is false. It only applies to some of the visualizations (e.g. charts)
     */
    get applyMkFormat(): boolean;
    set applyMkFormat(value: boolean);
}
/**
 * The list of formatting options for a numeric data.
 */
enum RVDashboardNumberFormattingType {
    /**
     * No formatting
     */
    None = 0,
    /**
     * Number formatting
     */
    Number = 1,
    /**
     * Percentage formatting
     */
    Percent = 2,
    /**
     * Currency formatting
     */
    Currency = 3
}
/**
 * The list of formatting options for a negative numeric data.
 */
enum RVDashboardNegativeFormatType {
    /**
     * Empty formatting
     */
    Empty = 0,
    /**
     * Formatting with a minus sign
     */
    MinusSign = 1,
    /**
     * Formatting with a parenthesis
     */
    Parenthesis = 2
}
/**
 * The list of periods of time supported for aggregation.
 */
enum RVDashboardDateAggregationType {
    /**
     * Year period
     */
    Year = 0,
    /**
     * Quarter period
     */
    Quarter = 1,
    /**
     * Month period
     */
    Month = 2,
    /**
     * Day period
     */
    Day = 3,
    /**
     * Hour period
     */
    Hour = 4,
    /**
     * Minute period
     */
    Minute = 5
}

/** This class is used to specify settings for visualizations like Choropleth or Scatter Map. */
class VisualizationsConfiguration {
    private _mapVisualizations;
    private _scatterMapVisualizations;
    /**
     * The maps configuration used by Choropleth and Scatter Map visualizations.
     */
    get maps(): MapVisualizationsConfiguration;
    /**
     * The configuration used by Scatter Map visualizations
     */
    get scatterMaps(): ScatterMapVisualizationsConfiguration | null;
    set scatterMaps(scatterMapVizConfig: ScatterMapVisualizationsConfiguration | null);
}
class MapVisualizationsConfiguration {
    private _shapeFilesUrl;
    get shapeFilesUrl(): string;
    set shapeFilesUrl(url: string);
}
class ScatterMapVisualizationsConfiguration {
    private _mapImageryType;
    private _mapImageryProviderToken;
    private _mapImageryUrl;
    constructor(mapImageryType: RVMapImageryType, token: string);
    static createOpenStreetMapConfiguration(url: string): ScatterMapVisualizationsConfiguration;
    get mapImageryType(): RVMapImageryType;
    get mapImageryProviderToken(): string | null;
    get mapImageryUrl(): string | null;
}
enum RVMapImageryType {
    Esri = "Esri",
    Bing = "Bing",
    MapBox = "MapBox",
    OpenStreetMap = "OpenStreetMap"
}
//# sourceMappingURL=visualizationsConfiguration.d.ts.map

/** This class is used to specify global settings for the SDK. */
class RevealSdkSettings {
    /** @ignore */
    constructor();
    /** Get/sets the theme to be used by {@link RevealView} when rendering a dashboard.
     * Make sure to set the theme before you have any RevealView rendering a dashboard.
     */
    static get theme(): RevealTheme;
    static set theme(theme: RevealTheme);
    static set enableBetaFeatures(value: boolean);
    static get enableBetaFeatures(): boolean;
    /**
     * Set the base url where reveal sdk server component is running.
     * You'll need to use this in cases where the backend and the front-end are served from different urls.
     * @param base address of the reveal server component.
     */
    static setBaseUrl(base: string): void;
    private static _measuringHostElement;
    /**
     * Specifies a dom element that could host few invisible helper span elements, which are used
     * by the RevealView to measure text sizes.
     * If no dom element is set the RevealView would add these helper spans to the element
     * where a dashboard is rendered. This would work fine as long as you need a single RevealView
     * instance rendered at a given moment.
     * In case you need to have multiple instances rendered simultaneously you will need to set
     * a selector, pointing to an element in dom where these helper span elements will be created.
     * @param {any} selector that references to an element that could host these helper objects.
     */
    static set measuringHostElement(selector: string | null);
    static get measuringHostElement(): string | null;
    /**
     * Specifies a callback function that will be invoked before a request to the Reveal backend and might return
     * additional headers to be included in the request.
     * The specified function is expected to return an object with the headers, like:
     * { 'Session-Id': sessionId }
     * This is useful to send authentication headers to the backend.
     *
     * **JavaScript**:
     * ```javascript
     * RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
     *   var headers = {};
     *   headers["x-header-one"] = "single_value";
     *   headers["x-header-two"] = ["value_1", "value_2"];
     *   return headers;
     * });
     * ```
     *
     * **TypeScript**:
     * ```typescript
     *  RevealSdkSettings.setAdditionalHeadersProvider((url: string) => {
     *  var headers: Record<string, any> = {};
     *  headers["x-header-one"] = "single_value";
     *  headers["x-header-two"] = ["value_1", "value_2"];
     *  return headers;
     *});
     *```
    */
    static setAdditionalHeadersProvider(provider: (url: string) => Record<string, any>): void;
    /**
     * Configures if the AJAX requests sent by Reveal to the backend should include authentication cookies or not.
     * You might need to set this flag to true when your backend uses cookies for authentication and session handling and the frontend
     * is in a different domain (CORS rules applies), for example if you're using Angular or React.
     * @param flag true if the AJAX request sent by Reveal when it sends a request to the backend should have "withCredentials: true" or not.
     */
    static set requestWithCredentialsFlag(flag: boolean);
    static get requestWithCredentialsFlag(): boolean;
    /** The URL where the MapData.json could be retrieved from. ShapesMetadataFileUrl + "MapData.json" should be pointing to valid MapData.json. */
    static get shapeFilesUrl(): string;
    static set shapeFilesUrl(url: string);
    private static _visualizations;
    /** Visualization settings */
    static get visualizations(): VisualizationsConfiguration;
    /** Call and await this before you render a RevealView component to make sure all the needed fonts are loaded in the browser.
     *  You might also want to call and await this if you update the {@link RevealSdkSettings.theme} with another theme that's
     *  using different fonts that might not be loaded.
     *  Not awaiting this might result on some texts(like dashboard title) being cropped on initial load.
    */
    static ensureFontsLoadedAsync(): Promise<void>;
    /**
     * Specifies a callback function that will be invoked when working with a dashboard and might return a replacement text
     * -usually a localized value- to be used instead of the original.
     * @param element the element that needs to be localized, e.g. a Widget title. The current text is a property of this object.
     * @param localizationContext provides context information for the localization request. In particular, the dashboard ID containing the element to be localized.
     * @returns The replacement text. A null return value is the same as returning the current text.
     */
    static localizedStringsProvider: (element: RVLocalizationElement, localizationContext: RVLocalizationContext) => string | null;
    /**
     * Specifies a callback function that will be invoked when working with a dashboard and might return the formatting to be used for the given field.
     * @param desc Information about the field, including name, data type and current formatting settings.
     * @param fmtContext provides Context information for the formatting request. In particular, the dashboard ID (if applicable).
     * @returns The formatting to apply to the given field. If null, the original formatting will be applied.
     */
    static fieldFormattingSettingsProvider: (desc: RVFieldFormattingDescriptor, fmtContext: RVFormattingContext) => RVFormattingSpec | null;
}

/** Utility class used to load dashboards. */
class RevealUtility {
    /** @hidden */
    constructor();
    /**
     * Loads the dashboard with the given ID from the standard endpoint in the server.
     * @param {string} dashboardId The ID of the dashboard to open, this ID will be received in the server: IRevealSdkContext.GetDashboardAsync
     * @param {function} onSuccess A callback that will receive an instance of $.ig.RVDashboard class if the loading was successful.
     * @param {function} onError A callback with the error message if the loading operation failed.
     */
    static loadDashboard(dashboardId: string, onSuccess: (dashboard: RVDashboard) => void, onError: (msg: string) => void): void;
    /** @hidden */
    static createLocalizedDashboard(dashboardJson: any, dashboardId?: string): RVDashboard;
    /** @hidden */
    static createLocalizationProvider(dashboardId: string | null, requestingInitialFormat: boolean): SdkDashboardLocalizationProvider | null;
    /**
     * Loads a dashboard from the Blob object with the contents of a .rdash file.
     * @param {Blob} blob The Blob object containing the binary contents of the dashboard in rdash file format.
     * @param {function} onSuccess A callback that will receive an instance of $.ig.RVDashboard class if the loading was successful.
     * @param {function} onError A callback with the error message if the loading operation failed.
     */
    static loadDashboardFromContainer(blob: Blob, onSuccess: (dashboard: RVDashboard) => void, onError: (msg: string) => void, dashboardId?: string): void;
    /**
     * Generates a new universal identifier.
     * @returns a generated UID
     */
    static generateUID(): string;
    /** @hidden */
    static _isObject(a: any): Boolean;
    /** @hidden */
    static _listContains(list: any[], value: any): Boolean;
    /** @hidden */
    static _forAllElements(list: any[], pos: number, eachBlock: (item: any, completed: () => void) => void, endBlock: () => void): void;
    /** @hidden */
    static _transformToWrappers(revealDsObj: any): any;
    /** @hidden */
    static _convertDataSource(ds: any): any;
    /** @hidden */
    static _convertDataSourceItem(dsItem: any): any;
}
class SdkDashboardLocalizationProvider {
    private _localizationContext;
    private _formattingContext;
    constructor(localizationContext: RVLocalizationContext, formattingContext: RVFormattingContext);
    getLocalizedString(element: any): string | null;
    getFormattingSettings(desc: any): any;
    sdkLocalizationElement(e: any): RVLocalizationElement;
    sdkFormattingDescriptor(desc: any): RVFieldFormattingDescriptor;
    sdkDashboardDataType(internalDataType: any): RVDashboardDataType;
    sdkFormattingSpec(formatting: any): RVFormattingSpec | null;
    sdkDashboardNumberFormattingType(type: any): RVDashboardNumberFormattingType;
    sdkDashboardNegativeFormatType(type: any): RVDashboardNegativeFormatType;
    sdkDateAggregationType(type: any): RVDashboardDateAggregationType;
    internalFormattingDescriptor(from: RVFormattingSpec): any;
    internalDashboardNumberFormattingType(type: RVDashboardNumberFormattingType): any;
    internalDashboardNegativeFormatType(type: RVDashboardNegativeFormatType): any;
}
//# sourceMappingURL=revealUtility.d.ts.map

/** The class used as the argument to the onFiltersChanged event. */
class FilterChangedEventArgs {
    /** @ignore */
    _filter: RVDashboardFilter;
    /** @ignore */
    _selectedValues: Array<Object>;
    constructor(filter: RVDashboardFilter, selectedValues: Array<Object>);
    /** Gets filter instance. */
    get filter(): RVDashboardFilter;
    /** Gets selected values. */
    get selectedValues(): Array<Object>;
}
//# sourceMappingURL=filterChangedEventArgs.d.ts.map

/**
 * The data source object used to represent the local files data source, there are no additional properties in this class
 * as all relevant information is specified in the {@link RVLocalFileDataSourceItem} object.
 */
class RVLocalFileDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** The local file data source item, used to load files from local storage. */
class RVLocalFileDataSourceItem extends RVDataSourceItem {
    constructor();
    private _uri;
    /** The URI referencing the file, like local://Directory/File.csv. */
    get uri(): nullableString;
    set uri(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Class defining the range that should be used when loading data from an Excel sheet.
 */
class RVExcelRange {
    constructor(locX: number, locY: number, lenX: number, lenY: number);
    private _locationX;
    get locationX(): number;
    private _locationY;
    get locationY(): number;
    private _lengthX;
    get lengthX(): number;
    private _lengthY;
    get lengthY(): number;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source object used to represent the Excel data source, there are no additional properties in this class
 * as all relevant information is specified in the RVExcelDataSourceItem object.
 */
class RVExcelDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The base abstract class representing a data source item getting data from a file (a resource).
 * This is the base class for CSV, Excel and JSON data source items.
 * It contains the reference to the resource item providing the file, for example a CSV file from a Web Resource URL
 * will be represented as a {@link RVCsvDataSourceItem} referencing a {@link RVWebResourceDataSourceItem}
 */
abstract class RVResourceBasedDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVDashboardDataSource, resourceItem: RVDataSourceItem);
    private _resourceItem;
    /**
     * The resource item used to get the data for the referenced file, must be an item from one of the resource providers: Sharepoint, Web Resource, REST API, etc.
     */
    get resourceItem(): RVDataSourceItem | null;
    set resourceItem(value: RVDataSourceItem | null);
    /**
     * @hidden
     */
    _getWrapper(): any;
}

type nullableExcelRange = RVExcelRange | null;
/**
 * The data source item used to represent a dataset from an Excel file, it includes information like the
 * name of the sheet to get data from and the range to use when loading data.
 */
class RVExcelDataSourceItem extends RVResourceBasedDataSourceItem {
    constructor(resourceItem: RVDataSourceItem);
    private _sheet;
    /**
     * Name of the sheet in the worksheet to get the data from, if not specified and @see NamedRange is null,
     * then the first sheet in the file will be used.
     */
    get sheet(): nullableString;
    set sheet(value: nullableString);
    private _range;
    /**
     * Definition of the range to load data from in the specified sheet.
     */
    get range(): nullableExcelRange;
    set range(value: nullableExcelRange);
    private _namedRange;
    /**
     * Named range to get data from, it's optional and if no specified the sheet specified in @see Sheet
     * will be used.
     */
    get namedRange(): nullableString;
    set namedRange(value: nullableString);
    private _pivotTable;
    /**
     * Name of the pivot table to get data from.
     */
    get pivotTable(): nullableString;
    set pivotTable(value: nullableString);
    private _firstRowContainsLabels;
    /**
     * Flag indicating if the first row contains labels or data, it defaults to "true".
     * If you set this flag to <c>false</c> the columns will be automatically named as 'COL1', 'COL2', etc.
     */
    get firstRowContainsLabels(): boolean;
    set firstRowContainsLabels(value: boolean);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The base data source class used to represent a connection to one of the supported database systems.
 */
abstract class RVSqlBasedDataSource extends RVDashboardDataSource {
    private _host;
    /** Host name or IP address to connect to. */
    get host(): nullableString;
    set host(value: nullableString);
    private _port;
    get port(): number;
    set port(value: number);
    /** @hidden */
    _getWrapper(): any;
}

abstract class RVSqlPDSDataSource extends RVSqlBasedDataSource {
    private _processDataOnServerDefaultValue;
    /** Sets the default value for "Process Data on Server" option for this data source, the
     * end user can still change the value, unless {@link processDataOnServerReadOnly} is true.
     */
    get processDataOnServerDefaultValue(): boolean;
    set processDataOnServerDefaultValue(value: boolean);
    private _processDataOnServerReadOnly;
    /**
     * When set to true the user will not be allowed to change the value for "Process Data on Server" option
     * and the default value will be used.
     */
    get processDataOnServerReadOnly(): boolean;
    set processDataOnServerReadOnly(value: boolean);
    /** @hidden */
    constructor();
    /** @hidden */
    _getWrapper(): any;
}

/** Microsoft SQL Server data source. */
class RVSqlServerDataSource extends RVSqlPDSDataSource {
    private _database;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    constructor();
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The base item class used to represent a dataset from one of the supported database systems.
 */
abstract class RVSqlBasedDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVDashboardDataSource);
    private _database;
    /**
     * Name of the database to connect to, optional as this value is usually specified in the data source object.
     */
    get database(): nullableString;
    set database(value: nullableString);
    private _table;
    /**
     * Name of the table (or view) to get data from
     */
    get table(): nullableString;
    set table(value: nullableString);
    private _customQuery;
    /**
     * (Optional) Custom SQL query to use when getting data
     */
    get customQuery(): nullableString;
    set customQuery(value: nullableString);
    /** @hidden */
    _getWrapper(): any;
}

abstract class RVSqlPDSDataSourceItem extends RVSqlBasedDataSourceItem {
    constructor(dataSource: RVSqlPDSDataSource);
    private _processDataOnServer;
    /**
     * Configures if the "Process Data on Server" option is turned on for this item (table or view), defaults to "true"
     */
    get processDataOnServer(): boolean;
    set processDataOnServer(value: boolean);
    /** @hidden */
    _getWrapper(): any;
}

/** Microsoft SQL Server data source item */
class RVSqlServerDataSourceItem extends RVSqlPDSDataSourceItem {
    constructor(dataSource: RVSqlServerDataSource);
    private _schema;
    /** Name of the schema the referenced table belongs to */
    get schema(): nullableString;
    set schema(value: nullableString);
    private _procedure;
    /** (Optional) name of the stored procedure to get data from, the procedure is expected to return a result set and might
     * have multiple parameters.
     */
    get procedure(): nullableString;
    set procedure(value: nullableString);
    private _procedureParameters;
    /**Parameters to be passed to the stored procedure, if there is such specified in   {@link RVSqlServerDataSourceItem.procedure} . */
    get procedureParameters(): any;
    set procedureParameters(value: any);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Web resource data source, used to download files from HTTP URL using GET method.
 * See {@link RVRESTDataSource} to use other HTTP methods or to customize parameters, headers and body to sent. */
class RVWebResourceDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the web resource, is expected to be a URL with HTTP or HTTPS scheme. */
    get url(): nullableString;
    set url(value: nullableString);
    private _useAnonymousAuthentication;
    /** Boolean flag indicating if anonymous authentication should be used for this data source or credentials must be requested
     * to the containing application. */
    get useAnonymousAuthentication(): boolean;
    set useAnonymousAuthentication(value: boolean);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Web resource data source item, see {@link RVWebResourceDataSource} for more information. */
class RVWebResourceDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVWebResourceDataSource);
    private _url;
    /** URL to use to download the file. Must match the URL specified in the {@link RVWebResourceDataSource} data source object.  */
    get url(): nullableString;
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source object used to represent the CSV data source, there are no additional properties in this class
 * as all relevant information is specified in the {@link RVCsvDataSourceItem} object.
 */
class RVCsvDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source item used to represent a dataset from a CSV file, it includes
 * optional settings like the separator to use when parsing the data.
 */
class RVCsvDataSourceItem extends RVResourceBasedDataSourceItem {
    constructor(resourceItem: RVDataSourceItem);
    private _dateFormat;
    /**
     * Optional date format to use when parsing/detecting date columns, if not specified Reveal
     * will try to infer the date format to use for each column (if it detects the column
     * is a date, date time or time column).
     */
    get dateFormat(): nullableString;
    set dateFormat(value: nullableString);
    private _encoding;
    /**
     * The encoding to use, if not specified Reveal will try to detect it automatically.
     */
    get encoding(): nullableString;
    set encoding(value: nullableString);
    private _separator;
    /**
     * The separator to use, one of ',', ';', or 'TAB'. If not specified it will be detected automatically.
     */
    get separator(): nullableString;
    set separator(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** MySQL data source */
class RVMySqlDataSource extends RVSqlPDSDataSource {
    private _database;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    constructor();
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** MySQL data source item */
class RVMySqlDataSourceItem extends RVSqlPDSDataSourceItem {
    constructor(dataSource: RVMySqlDataSource);
    /** @hidden */
    getType(): string;
}

/**
 * Amazon Athena data source
 */
class RVAthenaDataSource extends RVDashboardDataSource {
    private _region;
    /**
     * Region for the service. See the list of supported values in https://docs.aws.amazon.com/general/latest/gr/rande.html.
     */
    get region(): nullableString;
    set region(value: nullableString);
    private _dataCatalog;
    /**
     * Athena's data catalog where the database is. If the value is null, "AwsDataCatalog" will be used.
     */
    get dataCatalog(): nullableString;
    set dataCatalog(value: nullableString);
    private _database;
    /**
     * Database that will be used
     */
    get database(): nullableString;
    set database(value: nullableString);
    private _workgroup;
    /**
     * Workgroup used to run queries. It is optional.
     */
    get workgroup(): nullableString;
    set workgroup(value: nullableString);
    private _outputLocation;
    /**
     * s3 path where the results will be stored. It is optional, but if missing and if the chosen workgroup doesn't have a valid s3 path, the queries will fail.
     */
    get outputLocation(): nullableString;
    set outputLocation(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Amazon Athena data source item.
 */
class RVAthenaDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVAthenaDataSource);
    private _table;
    /**
     * Table or view for this datasource item.
     */
    get table(): string | null;
    set table(value: string | null);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Amazon S3 data source */
class RVS3DataSource extends RVDashboardDataSource {
    private _region;
    /**Region for the service. See the list of supported values in https://docs.aws.amazon.com/general/latest/gr/rande.html. */
    get region(): nullableString;
    set region(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Amazon S3 data source item. */
class RVS3DataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVS3DataSource);
    private _path;
    /** S3 path for the file represented by this item. For example: 's3://my-bucket/path/to/file.csv' */
    get path(): nullableString;
    set path(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** QuickBooks data source */
class RVQuickBooksDataSource extends RVDashboardDataSource {
    _realmId: nullableString;
    /** Realm Id, the unique ID identifying a specific QuickBooks company. */
    get realmId(): nullableString;
    set realmId(v: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** QuickBooks data source item */
class RVQuickBooksDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVQuickBooksDataSource);
    _entity: nullableString;
    /** QuickBooks Entity  */
    get entity(): nullableString;
    set entity(v: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source object used to represent the in-memory data source, there are no additional properties in this class
 * as all relevant information is specified in the {@link RVInMemoryDataSourceItem} object
 */
class RVInMemoryDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Data source item to get in-memory data.
 * It is used to create a new in-memory item with the specified dataset id.
 */
class RVInMemoryDataSourceItem extends RVDataSourceItem {
    constructor(datasetId: string);
    private _datasetId;
    /**
     * String identifying this in-memory dataset, it might be used to decide what data to return.
     */
    get datasetId(): string;
    set datasetId(value: string);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** PostgreSQL data source, it adds the database name property to the base properties inherited from the abstract class RVSqlBasedDataSource. */
class RVPostgresDataSource extends RVSqlPDSDataSource {
    private _database;
    private _schema;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    /** Name of the schema to use. */
    get schema(): nullableString;
    set schema(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** PostgreSQL data source item */
class RVPostgresDataSourceItem extends RVSqlPDSDataSourceItem {
    constructor(dataSource: RVPostgresDataSource);
    private _schema;
    /** Name of the schema the referenced table belongs to */
    get schema(): nullableString;
    set schema(value: nullableString);
    private _functionName;
    /** (Optional) name of the function to get data from, the function is expected to return a result set and might have multiple parameters. */
    get functionName(): nullableString;
    set functionName(value: nullableString);
    private _functionParameters;
    /** Parameters to be passed to the function, if there is such specified in {@link RVPostgresDataSourceItem.functionName}. */
    get functionParameters(): any;
    set functionParameters(value: any);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Amazon Redshift data source, it adds the database name property to the base properties inherited from the abstract class RVSqlBasedDataSource. */
class RVRedshiftDataSource extends RVSqlBasedDataSource {
    private _database;
    private _schema;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    /** Name of the schema to use. */
    get schema(): nullableString;
    set schema(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Amazon Redshift data source item */
class RVRedshiftDataSourceItem extends RVSqlBasedDataSourceItem {
    constructor(dataSource: RVRedshiftDataSource);
    private _schema;
    /** Name of the schema the referenced table belongs to */
    get schema(): nullableString;
    set schema(value: nullableString);
    private _functionName;
    /** (Optional) name of the function to get data from, the function is expected to return a result set and might have multiple parameters. */
    get functionName(): nullableString;
    set functionName(value: nullableString);
    private _functionParameters;
    /** Parameters to be passed to the function, if there is such specified in {@link RVPostgresDataSourceItem.functionName}.*/
    get functionParameters(): any;
    set functionParameters(value: any);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Microsoft Reporting Services (MS SSRS) data source */
class RVReportingServicesDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the server */
    get url(): nullableString;
    set url(value: nullableString);
    private _path;
    /** Path in the server, used only when SSRS is running integrated into Sharepoint */
    get path(): nullableString;
    set path(value: nullableString);
    private _serverMode;
    /** Gets the report server mode */
    get serverMode(): nullableString;
    set serverMode(value: nullableString);
    private _serverVersion;
    /** Gets the report server version  */
    get serverVersion(): nullableString;
    set serverVersion(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Render mode for Reporting Services data source item, see {@link RVReportingServicesDataSourceItem.renderMode} property.
 */
enum RVReportingServicesRenderMode {
    /**
     * Report mode, it means the report will be exported to PDF and rendered that way
     */
    Report = 0,
    /**
     * Data mode, it means the report will be exported to CSV and that data will be used as regular input data.
     */
    Data = 1
}

/** Microsoft Reporting Services (MS SSRS) data source item */
class RVReportingServicesDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVReportingServicesDataSource);
    private _path;
    /** Path to the report */
    get path(): nullableString;
    set path(value: nullableString);
    private _dynamic;
    /**  */
    get dynamic(): nullableString;
    set dynamic(value: nullableString);
    private _renderMode;
    /**
     * Render mode, might be data or report. Data means Reveal will request the report to be exported to CSV and will use that data as regular input data.
     * Report means the report will be exported to PDF and rendered that way.
     */
    get renderMode(): RVReportingServicesRenderMode;
    set renderMode(value: RVReportingServicesRenderMode);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Abstract base class for Microsoft Analysis Services (MS SSAS) data sources
 */
abstract class RVAnalysisServicesDataSource extends RVDashboardDataSource {
    private _catalog;
    /**
    * The name of the catalog (database) to use.
    */
    get catalog(): nullableString;
    set catalog(value: nullableString);
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Microsoft Azure Analysis Services data source
 */
class RVAzureAnalysisServicesDataSource extends RVAnalysisServicesDataSource {
    private _serverUrl;
    /**
    * Server URL, including the 'asazure://' prefix (scheme).
    */
    get serverUrl(): nullableString;
    set serverUrl(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Microsoft Analysis Services (MS SSAS) HTTP connection data source
 */
class RVHttpAnalysisServicesDataSource extends RVAnalysisServicesDataSource {
    private _url;
    get url(): nullableString;
    /**
     * URL to the MSMDPUMP endpoint, for example: http://server/olap/msmdpump.dll
     */
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Microsoft Analysis Services (MS SSAS) TCP connection data source
 */
class RVNativeAnalysisServicesDataSource extends RVAnalysisServicesDataSource {
    private _host;
    /**
     * Hostname or IP address of the server
     */
    get host(): nullableString;
    set host(value: nullableString);
    private _port;
    /**
     * TCP port where the server is accepting connections, 2383 is the default port for SSAS.
     */
    get port(): number;
    set port(value: number);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Microsoft Analysis Services (MS SSAS) item, specifies the cube to get data from.
 */
class RVAnalysisServicesDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVAnalysisServicesDataSource);
    private _catalog;
    /**
     * The name of the catalog (database) containing the cube.
     */
    get catalog(): nullableString;
    set catalog(value: nullableString);
    private _cube;
    /**
     * Name of the cube to use
     */
    get cube(): nullableString;
    set cube(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Azure SQL Server data source
 */
class RVAzureSqlDataSource extends RVSqlServerDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Azure SQL Server data source item
 */
class RVAzureSqlDataSourceItem extends RVSqlServerDataSourceItem {
    constructor(dataSource: RVAzureSqlDataSource);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Azure Synapse data source
 */
class RVAzureSynapseDataSource extends RVSqlServerDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Azure Synapse data source item
 */
class RVAzureSynapseDataSourceItem extends RVSqlServerDataSourceItem {
    constructor(dataSource: RVAzureSynapseDataSource);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * BigQuery data source
 */
class RVBigQueryDataSource extends RVDashboardDataSource {
    private _projectId;
    /**
     * BigQuery ProjectId
     */
    get projectId(): nullableString;
    set projectId(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * BigQuery data source item
 */
class RVBigQueryDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVBigQueryDataSource);
    private _projectId;
    /**
     * BigQuery ProjectId
     */
    get projectId(): nullableString;
    set projectId(value: nullableString);
    private _datasetId;
    /**
     * BigQuery dataset
     */
    get datasetId(): nullableString;
    set datasetId(value: nullableString);
    private _table;
    /**
     * Name of the table (or view) to get data from
     */
    get table(): nullableString;
    set table(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** REST API data source, configures the URL to get data from, HTTP method to use and optionally headers and body to send in the request. */
class RVRESTDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the web resource, is expected to be a URL with HTTP or HTTPS scheme.
     * Parameters might be specified using the notation {parameterName}, for example: http://server/customers/{CustomerID} defines a "CustomerID" parameter
     * that must be included in the {@link RVRESTDataSourceItem.parameters} property of {@link RVRESTDataSourceItem}.
     */
    get url(): nullableString;
    set url(value: nullableString);
    private _useAnonymousAuthentication;
    /** Boolean flag indicating if anonymous authentication should be used for this data source or credentials must be requested to the containing application. */
    get useAnonymousAuthentication(): boolean;
    set useAnonymousAuthentication(value: boolean);
    private _method;
    /** HTTP method to use, it defaults to GET */
    get method(): nullableString;
    set method(value: nullableString);
    private _contentType;
    /** Content type of the body, only used when {@link body} is not empty */
    get contentType(): nullableString;
    set contentType(value: nullableString);
    private _body;
    /** Body to send, expected to be used only with POST and PUT methods. */
    get body(): nullableString;
    set body(value: nullableString);
    private _headers;
    /** List of headers to send in the request, each string in this list is expected to be a string in the format name=value. */
    get headers(): Array<any> | null;
    set headers(value: Array<any> | null);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** REST API data source item */
class RVRESTDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVRESTDataSource);
    private _parameters;
    /** Values for the parameters specified in the data source {@link RVRESTDataSource.url} property. */
    get parameters(): any;
    set parameters(value: any);
    private _url;
    /** URL to the REST endpoint. Must match the URL specified in the {@link RVRESTDataSource} data source object.  */
    get url(): nullableString;
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source object used to represent the JSON data source, there are no additional properties in this class
 * as all relevant information is specified in the {@link RVJsonDataSourceItem} object.
 */
class RVJsonDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** The data source item used to represent a dataset from a JSON file, it includes the optional parsing configuration. */
class RVJsonDataSourceItem extends RVResourceBasedDataSourceItem {
    constructor(resourceItem: RVDataSourceItem);
    private _config;
    /** The configuration of the JSON parser. */
    get config(): nullableString;
    set config(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Box data source
 */
class RVBoxDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Box data source item, referencing a file in Box (box.net)
 */
class RVBoxDataSourceItem extends RVDataSourceItem {
    constructor();
    private _identifier;
    /**
     * Identifier of the file referenced by this item
     */
    get identifier(): nullableString;
    set identifier(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Dropbox data source
 */
class RVDropboxDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Dropbox data source item, referencing a file in Dropbox
 */
class RVDropboxDataSourceItem extends RVDataSourceItem {
    constructor();
    private _path;
    /**
     * Path to the file in Dropbox account
     */
    get path(): nullableString;
    set path(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** OneDrive data source */
class RVOneDriveDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
}

/** OneDrive data source item, referencing a file in OneDrive. */
class RVOneDriveDataSourceItem extends RVDataSourceItem {
    constructor();
    private _identifier;
    /** Identifier of the file in OneDrive. */
    get identifier(): nullableString;
    set identifier(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Dynamics CRM data source, specifies the URL to the server.
 */
class RVDynamicsCrmDataSource extends RVDashboardDataSource {
    private _url;
    /**
     * Dynamics CRM base URL
     */
    get url(): nullableString;
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Dynamics CRM data source item
 */
class RVDynamicsCrmDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVDynamicsCrmDataSource);
    private _organization;
    /**
     * Name of the organization to use
     */
    get organization(): nullableString;
    set organization(value: nullableString);
    private _entity;
    /**
     * Name of the entity to use
     */
    get entity(): nullableString;
    set entity(value: nullableString);
    private _customQuery;
    /**
     * Custom query to use when getting data from Dynamics CRM
     */
    get customQuery(): nullableString;
    set customQuery(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** OData data source, configures the URL to get data from. */
class RVODataDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the OData endpoint, is expected to be a URL with HTTP or HTTPS scheme. */
    get url(): nullableString;
    set url(value: nullableString);
    private _useAnonymousAuthentication;
    /** Boolean flag indicating if anonymous authentication should be used for this data source or credentials must be requested to the containing application. */
    get useAnonymousAuthentication(): boolean;
    set useAnonymousAuthentication(value: boolean);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** OData data source item, see  {@link RVODataDataSource} for more information. */
class RVODataDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVODataDataSource);
    private _url;
    /** URL to the OData endpoint. Must match the URL specified in the {@link RVODataDataSource} data source object. */
    get url(): nullableString;
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Google Drive data source
 */
class RVGoogleDriveDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Google Drive data source item, referencing a file in Google Drive
 */
class RVGoogleDriveDataSourceItem extends RVDataSourceItem {
    constructor();
    private _identifier;
    /**
     * Identifier of the file referenced by this item
     */
    get identifier(): nullableString;
    set identifier(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source object used to represent the Google sheet data source, there are no additional properties in this class
 *  as all relevant information is specified in the {@link RVGoogleSheetDataSourceItem} object.
 */
class RVGoogleSheetDataSource extends RVExcelDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * The data source item used to represent a dataset from a Google Sheet file, it includes information like the
 * name of the sheet to get data from and the range to use when loading data.
 */
class RVGoogleSheetDataSourceItem extends RVExcelDataSourceItem {
    constructor(resourceItem: RVDataSourceItem);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Google Analytics data source
 */
class RVGoogleAnalyticsDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

enum RVGoogleAnalyticsResourceType {
    /**
     * Type used to get analytics data.
     */
    Report = 0,
    /**
     * Type used to get the list of profiles in the account, usually used in a dashboard filter.
     */
    Profiles = 1
}

/** Google Analytics data source item. */
class RVGoogleAnalyticsDataSourceItem extends RVDataSourceItem {
    constructor();
    private _resource;
    /** The type of resource, one of "Profiles" (the list of profiles in the account) or "Report" (to get analytics data). */
    get resource(): RVGoogleAnalyticsResourceType;
    set resource(value: RVGoogleAnalyticsResourceType);
    private _identifiers;
    /** Profile identifiers to get data from */
    get identifiers(): nullableString;
    set identifiers(value: nullableString);
    private _startDate;
    /** Start date to use when requesting data. */
    get startDate(): nullableDate;
    set startDate(value: nullableDate);
    private _endDate;
    /** End date to use when requesting data. */
    get endDate(): nullableDate;
    set endDate(value: nullableDate);
    private _metrics;
    /** Names of the metrics to request, comma separated. */
    get metrics(): nullableString;
    set metrics(value: nullableString);
    private _dimensions;
    /** Names of the dimensions to request, comma separated. */
    get dimensions(): nullableString;
    set dimensions(value: nullableString);
    private _segment;
    /** Optional segment name */
    get segment(): nullableString;
    set segment(value: nullableString);
    private _filters;
    /** Optional filters string as specified by Google Analytics, this value is sent as-is in the "filters" parameter. */
    get filters(): nullableString;
    set filters(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * HubSpot data source
 */
class RVHubspotDataSource extends RVDashboardDataSource {
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * HubSpot data source item, referencing a HubSpot entity.
 */
class RVHubspotDataSourceItem extends RVDataSourceItem {
    constructor();
    private _entity;
    /**
     * Entity to retrieve data from
     */
    get entity(): nullableString;
    set entity(value: nullableString);
    private _startDate;
    /**
     * Start date to use when requesting data.
     */
    get startDate(): nullableDate;
    set startDate(value: nullableDate);
    private _endDate;
    /**
     * End date to use when requesting data.
     */
    get endDate(): nullableDate;
    set endDate(value: nullableDate);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Marketo data source, configures the URL to get data from. */
class RVMarketoDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the login endpoint */
    get url(): nullableString;
    set url(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Marketo data source item, see  {@link RVMarketoDataSource} for more information. */
class RVMarketoDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVMarketoDataSource);
    private _url;
    /** URL to the Marketo endpoint. Must match the URL specified in the {@link RVMarketoDataSource} data source object. */
    get url(): nullableString;
    set url(value: nullableString);
    private _entity;
    /** Entity to retrieve data from */
    get entity(): nullableString;
    set entity(value: nullableString);
    private _startDate;
    /** Start date to use when requesting data. */
    get startDate(): nullableDate;
    set startDate(value: nullableDate);
    private _endDate;
    /** End date to use when requesting data. */
    get endDate(): nullableDate;
    set endDate(value: nullableDate);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * SharePoint authentication methods
 */
enum RVSharePointAuthenticationMethod {
    /**
     * Windows (NT) authentication
     */
    Windows = 0,
    /**
     * Forms based authentication
     */
    Form = 1,
    /**
     * Office 365 authentication
     */
    Office365 = 2,
    /**
     * Web based login authentication
     */
    WebLogin = 3
}

/** SharePoint data source, contains the URL to the SharePoint site to use. */
class RVSharePointDataSource extends RVDashboardDataSource {
    private _url;
    /** URL to the SharePoint site (or sub site) to use */
    get url(): nullableString;
    set url(value: nullableString);
    /** The authentication method to use when connecting to SharePoint */
    private _authenticationMethod;
    get authenticationMethod(): RVSharePointAuthenticationMethod;
    set authenticationMethod(value: RVSharePointAuthenticationMethod);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
    /** @hidden */
    _convertAuthenticationMethod(authMethod: RVSharePointAuthenticationMethod): any;
}

/** The base abstract class for data source items from SharePoint. */
abstract class RVBaseSharePointDataSourceItem extends RVDataSourceItem {
    constructor(dataSource: RVSharePointDataSource);
}

/** Data source item to get data from a SharePoint list */
class RVSharePointListDataSourceItem extends RVBaseSharePointDataSourceItem {
    constructor(dataSource: RVSharePointDataSource);
    private _webUrl;
    /** URL to the site containing the list */
    get webUrl(): nullableString;
    set webUrl(value: nullableString);
    private _listUrl;
    /** URL to the list */
    get listUrl(): nullableString;
    set listUrl(value: nullableString);
    private _listName;
    /** The title of the list (not the GUID!) */
    get listName(): nullableString;
    set listName(value: nullableString);
    private _isLibrary;
    /** Is this list a document library? */
    get isLibrary(): boolean;
    set isLibrary(value: boolean);
    private _view;
    /** Name of the view to use */
    get view(): nullableString;
    set view(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Data source item to get data from a single item in a SharePoint list. */
class RVSharePointListItemDataSourceItem extends RVBaseSharePointDataSourceItem {
    constructor(dataSource: RVSharePointDataSource);
    private _webUrl;
    /** URL to the site containing the list */
    get webUrl(): nullableString;
    set webUrl(value: nullableString);
    private _listName;
    /** Name of the list */
    get listName(): nullableString;
    set listName(value: nullableString);
    private _listItemId;
    /** Identification of the single item in the list */
    get listItemId(): nullableString;
    set listItemId(value: nullableString);
    private _listItemUrl;
    /** URL to the single item */
    get listItemUrl(): nullableString;
    set listItemUrl(value: nullableString);
    private _isFolder;
    /** Is this single item a folder? */
    get isFolder(): boolean;
    set isFolder(value: boolean);
    private _assetContentType;
    /** Content-type of the item */
    get assetContentType(): nullableString;
    set assetContentType(value: nullableString);
    private _folderRelativePath;
    /** Path relative to the folder containing the item */
    get folderRelativePath(): nullableString;
    set folderRelativePath(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Data source item to get data from people in SharePoint */
class RVSharePointPeopleDataSourceItem extends RVBaseSharePointDataSourceItem {
    constructor(dataSource: RVSharePointDataSource);
    private _userId;
    /** Optional user id when a single user should be displayed */
    get userId(): nullableString;
    set userId(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Data source item to show information from a site (or sub site) */
class RVSharePointSiteDataSourceItem extends RVBaseSharePointDataSourceItem {
    constructor(dataSource: RVSharePointDataSource);
    private _webUrl;
    /** URL to the site or sub site. */
    get webUrl(): nullableString;
    set webUrl(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * @hidden
 */
abstract class RVOracleDataSource extends RVSqlBasedDataSource {
    private _database;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Oracle data source item */
class RVOracleDataSourceItem extends RVSqlBasedDataSourceItem {
    constructor(dataSource: RVOracleDataSource);
    /** @hidden */
    getType(): string;
}

/** Oracle data source, it adds the SID property to the base properties inherited from the abstract class RVOracleDataSource. */
class RVOracleSIDDataSource extends RVOracleDataSource {
    private _sID;
    get sID(): nullableString;
    set sID(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Oracle data source, it adds the Service name property to the base properties inherited from the abstract class RVOracleDataSource. */
class RVOracleServiceDataSource extends RVOracleDataSource {
    private _service;
    /**Service name to use when connecting to Oracle server. */
    get service(): nullableString;
    set service(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Sybase data source, it adds the database name property to the base properties inherited from the abstract class RVSqlBasedDataSource.  */
class RVSyBaseDataSource extends RVSqlBasedDataSource {
    private _database;
    /** Name of the database to connect to.  */
    get database(): nullableString;
    set database(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/** Sybase data source item */
class RVSyBaseDataSourceItem extends RVSqlBasedDataSourceItem {
    constructor(dataSource: RVSyBaseDataSource);
    private _schema;
    /** Name of the schema the referenced table belongs to. */
    get schema(): nullableString;
    set schema(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}

/**
 * Snowflake data source, it adds the database name property to the base properties inherited from the abstract class RVSqlBasedDataSource.
 */
class RVSnowflakeDataSource extends RVSqlPDSDataSource {
    private _database;
    private _account;
    /** Name of the database to connect to. */
    get database(): nullableString;
    set database(value: nullableString);
    /** Snowflake account, needed only when using WPF or .NET, not needed for Java SDK. */
    get account(): nullableString;
    set account(value: nullableString);
    constructor();
    getType(): string;
    _getWrapper(): any;
}

/**Snowflake data source item. */
class RVSnowflakeDataSourceItem extends RVSqlPDSDataSourceItem {
    constructor(dataSource: RVSnowflakeDataSource);
    private _schema;
    /** Name of the schema the referenced table belongs to */
    get schema(): nullableString;
    set schema(value: nullableString);
    /** @hidden */
    getType(): string;
    /** @hidden */
    _getWrapper(): any;
}}

	