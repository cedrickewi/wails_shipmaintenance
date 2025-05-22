package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3" // 👈 This is required!
)

type DatabaseService struct {
	db *sql.DB
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func NewDatabaseService() *DatabaseService {
	db, err := sql.Open("sqlite3", "./data.db?_foreign_keys=on")
	if err != nil {
		log.Fatal("Failed to connect to SQLite:", err)
	}

	// Optional: Create table on startup
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS ships(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			imo_number TEXT NOT NULL,
			ship_type TEXT NOT NULL,
			gross_tonnage REAL NOT NULL DEFAULT 0,
			year_built INTEGER NOT NULL,
			current_status TEXT NOT NULL,
			added_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
			updated_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
		);

		CREATE TABLE IF NOT EXISTS chief_mechanics (
			mechanic_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			phone TEXT NOT NULL,
			specialization TEXT NOT NULL,
			role TEXT NOT NULL,
			added_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
			updated_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))	
		);

		CREATE TABLE IF NOT EXISTS ship_assignments (
    		id INTEGER PRIMARY KEY AUTOINCREMENT,
    		ship_id INTEGER NOT NULL,
   			mechanic_id INTEGER NOT NULL,
   			FOREIGN KEY (ship_id) REFERENCES ships(id),
   			FOREIGN KEY (mechanic_id) REFERENCES chief_mechanics(mechanic_id),
   			UNIQUE (ship_id, mechanic_id) 
		);  

		CREATE TABLE IF NOT EXISTS ship_issues (
    		issue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    		ship_id INTEGER NOT NULL,
			reporter_id INTEGER NOT NULL, 
			title VARCHAR(200) NOT NULL,
			description TEXT,
			severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')) NOT NULL DEFAULT 'Low',
			issue_type TEXT CHECK (issue_type IN ('Mechanical', 'Electrical', 'Structural', 'Operational')) NOT NULL DEFAULT 'Mechanical',
			status TEXT CHECK (status IN('Reported', 'Under Review', 'Approved', 'In Progress', 'Resolved', 'Closed')) DEFAULT 'Reported',
			system_affected TEXT,  
			started_date TEXT DEFAULT (datetime('now', 'localtime')),
			reported_date TEXT DEFAULT (datetime('now', 'localtime')),
			updated_date TEXT DEFAULT (datetime('now', 'localtime')),
			assigned_to INTEGER,
			FOREIGN KEY (assigned_to) REFERENCES chief_mechanics(mechanic_id),
			FOREIGN KEY (ship_id) REFERENCES ships(id),
			FOREIGN KEY (reporter_id) REFERENCES chief_mechanics(mechanic_id)
		);  

		CREATE TABLE IF NOT EXISTS logs_issues (
    		log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    		issue_id INTEGER,
    		ship_id INTEGER NOT NULL,
    		mechanic_id INTEGER NOT NULL,  -- Who performed the maintenance
    		controller_id INTEGER NOT NULL, -- Who controlled the maintenance
   			action_taken TEXT NOT NULL,
    		parts_replaced TEXT,
    		hours_spent REAL,
    		completion_date TEXT DEFAULT (CURRENT_TIMESTAMP),
    		FOREIGN KEY (ship_id) REFERENCES ships(id),
    		FOREIGN KEY (mechanic_id) REFERENCES chief_mechanics(mechanic_id),
    		FOREIGN KEY (controller_id) REFERENCES chief_mechanics(mechanic_id),
    		FOREIGN KEY (issue_id) REFERENCES ship_issues(issue_id)
		);

		CREATE TABLE IF NOT EXISTS work_orders (
			order_id INTEGER PRIMARY KEY AUTOINCREMENT,
			issue_id INTEGER NOT NULL,
			ship_id INTEGER NOT NULL,
			description TEXT NOT NULL,
			priority TEXT CHECK (priority IN ('Low', 'Medium', 'High', 'Emergency')) NOT NULL DEFAULT 'Low',
			status TEXT CHECK (status IN ('Created', 'Assigned', 'In Progress', 'Completed', 'Cancelled')) NOT NULL DEFAULT 'Created',
			estimated_hours REAL,
			created_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
			due_date TEXT,
			completed_date TEXT,
			FOREIGN KEY (issue_id) REFERENCES ship_issues(issue_id),
			FOREIGN KEY (ship_id) REFERENCES ships(id)
		);

		CREATE TABLE IF NOT EXISTS suppliers (
			supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			contact_person TEXT,
			phone TEXT,
			email TEXT,
			address TEXT,
			added_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
		);

		CREATE TABLE IF NOT EXISTS inventory_items (
			item_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			type TEXT CHECK (type IN ('Tool', 'Spare Part', 'Material', 'Consumable')) NOT NULL,
			unit TEXT NOT NULL,
			quantity_available REAL NOT NULL DEFAULT 0,
			min_stock_level REAL NOT NULL DEFAULT 0,
			location TEXT,
			last_restocked TEXT DEFAULT (datetime('now', 'localtime'))
		);

		CREATE TABLE IF NOT EXISTS work_order_items (
			usage_id INTEGER PRIMARY KEY AUTOINCREMENT,
			order_id INTEGER NOT NULL,
			item_id INTEGER NOT NULL,
			quantity_used REAL NOT NULL,
			usage_date TEXT DEFAULT (datetime('now', 'localtime')),
			notes TEXT,
			FOREIGN KEY (order_id) REFERENCES work_orders(order_id),
			FOREIGN KEY (item_id) REFERENCES inventory_items(item_id)
		);

	`)

	if err != nil {
		log.Fatal("Failed to create table:", err)
	}

	return &DatabaseService{db: db}
}

func (d *DatabaseService) AddShip(ship Ship) error {
	_, err := d.db.Exec("INSERT INTO ships (name, imo_number, ship_type, gross_tonnage, year_built, current_status) VALUES (?, ?, ?, ?,?,?)", ship.Name, ship.IMO, ship.ShipType, ship.GrossTonnage, ship.YearBuilt, ship.CurrentStatus)
	return err
}

func (d *DatabaseService) AddMechanic(mechanic ChiefMechanic) error {
	_, err := d.db.Exec("INSERT INTO chief_mechanics (name, phone, specialization, role) VALUES (?, ?, ?, ?)", mechanic.Name, mechanic.Phone, mechanic.Specialization, mechanic.Role)
	return err
}

func (d *DatabaseService) GetShips() ([]Ship, error) {
	rows, err := d.db.Query("SELECT id, name, imo_number, ship_type, gross_tonnage, year_built, current_status, added_date, updated_date FROM ships")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No rows found, return an empty slice
		}
		return nil, err
	}
	defer rows.Close()

	var ships []Ship
	for rows.Next() {
		var s Ship
		err = rows.Scan(&s.ID, &s.Name, &s.IMO, &s.ShipType, &s.GrossTonnage, &s.YearBuilt, &s.CurrentStatus, &s.AddedDate, &s.UpdatedDate)
		if err != nil {
			return nil, err
		}
		ships = append(ships, s)
	}

	return ships, nil
}

func (d *DatabaseService) GetMechanics() ([]ChiefMechanic, error) {
	rows, err := d.db.Query("SELECT mechanic_id, name, phone, specialization, role, added_date, updated_date FROM chief_mechanics")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No rows found, return an empty slice
		}
		return nil, err
	}
	defer rows.Close()

	var mechanics []ChiefMechanic
	for rows.Next() {
		var m ChiefMechanic
		err = rows.Scan(&m.ID, &m.Name, &m.Phone, &m.Specialization, &m.Role, &m.AddedDate, &m.UpdatedDate)
		if err != nil {
			return nil, err
		}
		mechanics = append(mechanics, m)
	}

	return mechanics, nil
}

func (d *DatabaseService) GetShipAssignments() ([]ShipMechanicToShip, error) {
	rows, err := d.db.Query("SELECT id, ship_id, mechanic_id FROM ship_assignments")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No rows found, return an empty slice
		}
		return nil, err
	}
	defer rows.Close()

	var assignments []ShipMechanicToShip
	for rows.Next() {
		var a ShipMechanicToShip
		err = rows.Scan(&a.ID, &a.ShipID, &a.MechanicID)
		if err != nil {
			return nil, err
		}
		assignments = append(assignments, a)
	}

	return assignments, nil
}

type WorkOrderItem struct {
	ItemID       int     `json:"item_id"`
	OrderID      int     `json:"order_id"`
	QuantityUsed float64 `json:"quantity_used"`
	Notes        string  `json:"notes"`
}



func (d *DatabaseService) GetShipIssues() ([]ShipIssue, error) {
	rows, err := d.db.Query("SELECT issue_id, ship_id, reporter_id, issue_type, title, description, severity, status, system_affected, started_date, reported_date, updated_date FROM ship_issues")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No rows found, return an empty slice
		}
		return nil, err
	}
	defer rows.Close()

	var issues []ShipIssue
	for rows.Next() {
		var i ShipIssue
		err = rows.Scan(&i.ID, &i.ShipID, &i.ReporterID, &i.IssueType, &i.IssueTitle, &i.IssueDescription, &i.SeverityLevel, &i.IssueStatus, &i.SystemAffected, &i.StartedDate, &i.ReportedDate)
		if err != nil {
			return nil, err
		}
		issues = append(issues, i)
	}

	return issues, nil
}

func (d *DatabaseService) GetLogsIssues() ([]LogIssue, error) {
	rows, err := d.db.Query("SELECT log_id, issue_id, ship_id, mechanic_id, controller_id, action_taken, parts_replaced, hours_spent, completion_date FROM logs_issues")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No rows found, return an empty slice
		}
		return nil, err
	}
	defer rows.Close()

	var logs []LogIssue
	for rows.Next() {
		var l LogIssue
		err = rows.Scan(&l.LogID, &l.IssueID, &l.ShipID, &l.MechanicID, &l.ControllerID, &l.ActionTaken, &l.PartsReplaced, &l.HoursSpent, &l.CompletionDate)
		if err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}

	return logs, nil
}

func (d *DatabaseService) AddShipIssue(issue ShipIssue) error {
	_, err := d.db.Exec(`
		INSERT INTO ship_issues 
		(ship_id, reporter_id, issue_type, title, description, severity, status, system_affected, started_date, reported_date, updated_date, assigned_to) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		issue.ShipID, issue.ReporterID, issue.IssueType, issue.IssueTitle, issue.IssueDescription, issue.SeverityLevel, issue.IssueStatus, issue.SystemAffected, issue.StartedDate, issue.ReportedDate, issue.UpdatedDate, issue.AssignedTo)
	return err
}

func (d *DatabaseService) AddLogIssue(logIssue LogIssue) error {
	_, err := d.db.Exec(`
		INSERT INTO logs_issues 
		(issue_id, ship_id, mechanic_id, controller_id, action_taken, parts_replaced, hours_spent, completion_date) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		logIssue.IssueID, logIssue.ShipID, logIssue.MechanicID, logIssue.ControllerID, logIssue.ActionTaken, logIssue.PartsReplaced, logIssue.HoursSpent, logIssue.CompletionDate)
	return err
}

func (d *DatabaseService) AssignMechanicToShip(shipID, mechanicID int) error {
	_, err := d.db.Exec(`
		INSERT INTO ship_assignments (ship_id, mechanic_id) 
		VALUES (?, ?)`, shipID, mechanicID)
	return err
}

func (d *DatabaseService) GetShipLogIssueReports(shipID int) ([]LogIssueReport, error) {
	query := `
	SELECT 
		li.log_id,
		li.issue_id,
		si.description AS issue_description,
		s.id AS ship_id,
		s.name AS ship_name,
		li.mechanic_id,
		mech.name AS mechanic_name,
		li.controller_id,
		ctrl.name AS controller_name,
		li.action_taken,
		li.parts_replaced,
		li.hours_spent,
		li.completion_date
	FROM logs_issues li
	LEFT JOIN ships s ON li.ship_id = s.id
	LEFT JOIN chief_mechanics mech ON li.mechanic_id = mech.mechanic_id
	LEFT JOIN chief_mechanics ctrl ON li.controller_id = ctrl.mechanic_id
	LEFT JOIN ship_issues si ON li.issue_id = si.issue_id
	WHERE li.ship_id = ?`

	rows, err := d.db.Query(query, shipID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	defer rows.Close()

	var reports []LogIssueReport
	for rows.Next() {
		var r LogIssueReport
		err = rows.Scan(
			&r.LogID,
			&r.IssueID,
			&r.IssueDescription,
			&r.ShipID,
			&r.ShipName,
			&r.MechanicID,
			&r.MechanicName,
			&r.ControllerID,
			&r.ControllerName,
			&r.ActionTaken,
			&r.PartsReplaced,
			&r.HoursSpent,
			&r.CompletionDate,
		)
		if err != nil {
			return nil, err
		}
		reports = append(reports, r)
	}

	return reports, nil
}

func (d *DatabaseService) GetAllShipsLogReports() ([]LogIssueReport, error) {
	query := `
	SELECT 
		li.log_id,
		li.issue_id,
		si.description AS issue_description,
		s.id AS ship_id,
		s.name AS ship_name,
		li.mechanic_id,
		mech.name AS mechanic_name,
		li.controller_id,
		ctrl.name AS controller_name,
		li.action_taken,
		li.parts_replaced,
		li.hours_spent,
		li.completion_date
	FROM logs_issues li
	LEFT JOIN ships s ON li.ship_id = s.id
	LEFT JOIN chief_mechanics mech ON li.mechanic_id = mech.mechanic_id
	LEFT JOIN chief_mechanics ctrl ON li.controller_id = ctrl.mechanic_id
	LEFT JOIN ship_issues si ON li.issue_id = si.issue_id`

	rows, err := d.db.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	defer rows.Close()

	var reports []LogIssueReport
	for rows.Next() {
		var r LogIssueReport
		err = rows.Scan(
			&r.LogID,
			&r.IssueID,
			&r.IssueDescription,
			&r.ShipID,
			&r.ShipName,
			&r.MechanicID,
			&r.MechanicName,
			&r.ControllerID,
			&r.ControllerName,
			&r.ActionTaken,
			&r.PartsReplaced,
			&r.HoursSpent,
			&r.CompletionDate,
		)
		if err != nil {
			return nil, err
		}
		reports = append(reports, r)
	}

	return reports, nil
}

func (d *DatabaseService) AddWorkOrderItems(orderID int, items []WorkOrderItem) error {
	tx, err := d.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare(`
		INSERT INTO work_order_items 
		(order_id, item_id, quantity_used, notes) 
		VALUES (?, ?, ?, ?)`)
	if err != nil {
		tx.Rollback()
		return err
	}
	defer stmt.Close()

	for _, item := range items {
		_, err = stmt.Exec(orderID, item.ItemID, item.QuantityUsed, item.Notes)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit()
}

func (d *DatabaseService) AddInventoryItem(item InventoryItem) error {
	_, err := d.db.Exec(`
		INSERT INTO inventory_items 
		(name, type, unit, quantity_available, min_stock_level, location) 
		VALUES (?, ?, ?, ?, ?, ?)`,
		item.Name, item.Type, item.Unit, item.QuantityAvailable, item.MinStockLevel, item.Location)
	return err
}


func (d *DatabaseService) UpdateInventoryItem(item InventoryItem) error {
	// First get the current quantity
	var currentQty float64
	err := d.db.QueryRow("SELECT quantity_available FROM inventory_items WHERE item_id = ?", item.ItemID).Scan(&currentQty)
	if err != nil {
		return err
	}

	// Update with the sum of current and new quantity
	_, err = d.db.Exec(`
		UPDATE inventory_items 
		SET name = ?, 
			type = ?, 
			unit = ?, 
			quantity_available = ?, 
			min_stock_level = ?, 
			location = ?,
			last_restocked = datetime('now', 'localtime')
		WHERE item_id = ?`,
		item.Name, item.Type, item.Unit, currentQty + item.QuantityAvailable, 
		item.MinStockLevel, item.Location, item.ItemID)
	return err
}