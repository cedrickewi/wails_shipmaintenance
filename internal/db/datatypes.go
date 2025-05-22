package db

type Ship struct {
	ID            int64   `json:"id"`
	Name          string  `json:"name"`
	IMO           string  `json:"imo_number"`
	ShipType      string  `json:"ship_type"`
	GrossTonnage  float64 `json:"gross_tonnage"`
	YearBuilt     int64   `json:"year_built"`
	CurrentStatus string  `json:"current_status"`
	AddedDate     string  `json:"added_date"`
	UpdatedDate   string  `json:"updated_date"`
}

type ChiefMechanic struct {
	ID             int64  `json:"mechanic_id"`
	Name           string `json:"name"`
	Phone          string `json:"phone"`
	Specialization string `json:"specialization"`
	Role           string `json:"role"`
	AddedDate      string `json:"added_date"`
	UpdatedDate    string `json:"updated_date"`
}

type ShipMechanicToShip struct {
	ID         int64 `json:"id"`
	ShipID     int64 `json:"ship_id"`
	MechanicID int64 `json:"mechanic_id"`
}

type ShipIssue struct {
	ID               int64  `json:"issue_id"`
	ShipID           int64  `json:"ship_id"`
	ReporterID       int64  `json:"reporter_id"`
	IssueType        string `json:"issue_type"`
	IssueTitle       string `json:"issue_title"`
	IssueDescription string `json:"description"`
	IssueStatus      string `json:"issue_status"`
	ReportedDate     string `json:"reported_date"`
	StartedDate      string `json:"started_date"`
	SystemAffected   string `json:"system_affected"`
	SeverityLevel    string `json:"severity_level"`
	AssignedTo       int64  `json:"assigned_to"`
	UpdatedDate      string `json:"updated_date"`
}

type LogIssue struct {
	LogID          int64  `json:"log_id"`
	IssueID        int64  `json:"issue_id"`
	ControllerID   int64  `json:"controller_id"`  // ID of the controller who logged the issue
	ActionTaken    string `json:"action_taken"`   // Description of the action taken
	PartsReplaced  string `json:"parts_replaced"` // Description of parts replaced
	ShipID         int64  `json:"ship_id"`
	ReporterID     int64  `json:"reporter_id"`
	MechanicID     int64  `json:"mechanic_id"`
	HoursSpent     int64  `json:"hours_spent"`     // Number of hours spent on the issue
	CompletionDate string `json:"completion_date"` // Date when the issue was completed
}

type LogIssueReport struct {
	LogID            int64  `json:"log_id"`
	IssueID          int64  `json:"issue_id"`
	IssueDescription string `json:"issue_description"`
	ShipID           int64  `json:"ship_id"`
	ShipName         string `json:"ship_name"`
	MechanicID       int64  `json:"mechanic_id"`
	MechanicName     string `json:"mechanic_name"`
	ControllerID     int64  `json:"controller_id"`
	ControllerName   string `json:"controller_name"`
	ActionTaken      string `json:"action_taken"`
	PartsReplaced    string `json:"parts_replaced"`
	HoursSpent       int64  `json:"hours_spent"`
	CompletionDate   string `json:"completion_date"`
}

type InventoryItem struct {
	ItemID            int     `json:"item_id"`
	Name              string  `json:"name"`
	Type              string  `json:"type"`
	Unit              string  `json:"unit"`
	QuantityAvailable float64 `json:"quantity_available"`
	MinStockLevel     float64 `json:"min_stock_level"`
	Location          string  `json:"location"`
	LastRestocked     string  `json:"last_restocked"`
}
